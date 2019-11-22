import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../../core/services/data.service';
import { URL_VENTAS } from '../../shared/configs/urls.config';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
  providers: [DatePipe, CurrencyPipe]
})
export class ReportesComponent implements OnInit, AfterViewInit {
  @ViewChild('barChart')
  private chartContainer: ElementRef;
  data = [];
  margin = { top: 20, right: 20, bottom: 30, left: 50 };

  constructor(
    private dataService: DataService,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadingService.toggleLoading();
    this.dataService.getAsync(URL_VENTAS.GET_ALL, []).subscribe(
      ventas => {
        ventas.forEach(
          v => {
            const {creado, pedido} = v;
            const item = this.data.find(t => this._fecha(t.fecha) === this._fecha(creado));

            if (!item) {
              this.data.push({
                id: this.data.length,
                fecha: creado,
                valor: pedido.total
              });
            } else {
              this.data[item.id].valor += pedido.total;
            }
          }
        );
        this.data = this.data.slice().sort((a, b) => b.creado - a.creado);
        this.createGraphic();
        this.loadingService.toggleLoading();
      }
    );
  }

  ngAfterViewInit() {
    this.createGraphic();
  }

  createGraphic() {
    d3.select('svg').remove();

    const element = this.chartContainer.nativeElement;
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
      .domain(data.map(d => this._fecha(d.fecha)));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, d3.max(data, d => d.valor)]);

    const g = svg.append('g')
      .attr('transform', `translate(${this.margin.left}, ${ this.margin.top})`);

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Frequency');

    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('fill', '#3f51b5')
      .on('mouseover', function () { d3.select(this).attr('fill', '#d66666'); })
      .on('mouseout', function () { d3.select(this).attr('fill', '#3f51b5'); })
      .attr('x', d => x(this._fecha(d.fecha)))
      .attr('y', d => y(d.valor))
      .attr('width', x.bandwidth())
      .attr('height', d => contentHeight - y(d.valor));
  }

  _fecha(date) {
    return this.datePipe.transform(date, 'd/M/yyyy');
  }
}
