import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import * as d3 from 'd3';
// PIPES
import { DatePipe, CurrencyPipe } from '@angular/common';
// SERVICIOS
import { DataService } from '../../core/services/data.service';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
  selector: 'app-reporte-grafico',
  templateUrl: './reporte-grafico.component.html',
  styleUrls: ['./reporte-grafico.component.scss'],
  providers: [DatePipe, CurrencyPipe]
})
export class ReporteGraficoComponent implements AfterViewInit {
  @ViewChild('barChart')
  private chartContainer1: ElementRef;
  @Input() report = null;
  margin = { top: 20, right: 20, bottom: 30, left: 50 };
  data = [];

  constructor(
    private dataService: DataService,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private loadingService: LoadingService
  ) { }

  ngAfterViewInit() {
    this.loadData(this.report);
  }

  loadData(reportData: any) {
    this.loadingService.toggleLoading();

    this.dataService.getAsync(reportData.url, []).subscribe(
      result => {
        this.data = [];

        result.forEach(
          v => {
            switch (reportData.type) {
              case 'ventas': {
                const {creado, pedido} = v;
                const item = this.data.find(t => this._fecha(t.valorX) === this._fecha(creado));

                if (!item) {
                  this.data.push({
                    id: this.data.length,
                    valorX: creado,
                    valorY: pedido.total,
                    _valorX: this._fecha(creado),
                    _valorY: this._moneda(pedido.total),
                  });
                } else {
                  this.data[item.id].valorY += pedido.total;
                  this.data[item.id]._valorY = this._moneda(this.data[item.id].valorY);
                }
                break;
              }
              case 'pedidos': {
                const {creado} = v;
                const item = this.data.find(t => this._fecha(t.valorX) === this._fecha(creado));

                if (!item) {
                  this.data.push({
                    id: this.data.length,
                    valorX: creado,
                    valorY: 0,
                    _valorX: this._fecha(creado)
                  });
                } else {
                  ++this.data[item.id].valorY;
                }
                break;
              }
              case 'stock': {
                const {cantidad, nombre} = v;

                this.data.push({
                  id: this.data.length,
                  valorX: nombre,
                  valorY: cantidad
                });
                break;
              }
            }
          }
        );

        if (reportData.type === 'stock') {
          this.data.sort((a, b) => b.valorY < a.valorY ? 1 : -1);
          this.data = this.data.slice(0, 10);
        } else {
          this.data.sort((a, b) => new Date(b.valorX) > new Date(a.valorX) ? 1 : -1)
        }
        this.createGraphic(reportData);

        this.loadingService.toggleLoading();
      }
    );
  }

  createGraphic(reportData: any) {
    d3.select('svg').remove();

    const element = this.chartContainer1.nativeElement;
    const data = this.data;

    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', 800);

    const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

    const x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.1)
      .domain(data.map(d => d._valorX || d.valorX));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, d3.max(data, d => d.valorY)]);

    const g = svg.append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    const tooltip = d3.select('body')
      .append('div')
      .style('position', 'absolute')
      .style('top', '0')
      .style('border', 'solid')
      .style('border-width', '1px')
      .style('border-radius', '5px')
      .style('padding', '10px')
      .style('font-family', 'Hind Madurai')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .style('background', '#000')
      .style('color', 'white');

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${contentHeight})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end');

    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('fill', '#3f51b5')
      .on('mouseover', function (d) {
        d3.select(this).attr('fill', '#d66666');
        tooltip
          .html(`${reportData.itemX + ': ' + (d._valorX || d.valorX)} <br> ${reportData.itemY + ': ' + (d._valorY || d.valorY)}`)
          .style('visibility', 'visible')
          .style('left', `${d3.select(this).node().getBoundingClientRect().left}px`)
          .style('top', `${d3.select(this).node().getBoundingClientRect().top - 5}px`)
          .style('display', 'inline-block');
        })
      .on('mouseout', function () {
        d3.select(this).attr('fill', '#3f51b5');
        tooltip.style('visibility', 'hidden');
      })
      .attr('x', d => x(d._valorX || d.valorX))
      .attr('y', d => y(d.valorY))
      .attr('width', x.bandwidth())
      .attr('height', d => contentHeight - y(d.valorY));
  }

  _fecha(date) {
    return this.datePipe.transform(date, 'MMMM yyyy');
  }

  _moneda(value) {
    return this.currencyPipe.transform(value, '$');
  }
}
