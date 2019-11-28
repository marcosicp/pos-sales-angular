import { Component, AfterViewInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
// PIPES
import { DatePipe, CurrencyPipe, PercentPipe } from '@angular/common';
// SERVICIOS
import { DataService } from '../../core/services/data.service';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
  selector: 'app-reporte-grafico',
  templateUrl: './reporte-grafico.component.html',
  styleUrls: ['./reporte-grafico.component.scss'],
  providers: [CurrencyPipe, PercentPipe, DatePipe]
})
export class ReporteGraficoComponent implements AfterViewInit {
  @Input() report = null;

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          callback: value => this._truncate(value)
        }
      }],
      yAxes: [{}]
    },
    legend: {
      labels: {
        fontFamily: 'Hind Madurai',
        fontSize: 18
      }
    },
    tooltips: {
      titleFontFamily: 'Hind Madurai',
      titleFontSize: 16,
      bodyFontFamily: 'Hind Madurai',
      bodyFontSize: 16,
      footerFontFamily: 'Hind Madurai',
      footerFontSize: 16
    },
    plugins: {
      datalabels: {
        color: (context) => {
          return context.dataset.backgroundColor !== '#3f51b5' ? 'black' : 'white';
        },
        formatter: (value, context) => {
          switch (context.dataset.label) {
            case 'Total': {
              return this.currencyPipe.transform(value, '$');
            }
            case '% de Ventas':
            case '% Acumulado': {
              return this.percentPipe.transform(value);
            }
            default: {
              return value;
            }
          }
        },
        align: (context) => {
          switch (context.dataset.label) {
            case '% Acumulado': {
              return 'end';
            }
            default: {
              return 'center';
            }
          }
        },
        font: {
          weight: 'bold',
          family : 'Hind Madurai',
          size: 16
        }
      }
    }
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend: true;
  barChartPlugins = [pluginDataLabels];
  barChartData: ChartDataSets[] = [
    {
      data: [],
      backgroundColor: '#3f51b5',
      borderColor: '#3f51b5',
      hoverBackgroundColor: '#d66666',
      hoverBorderColor: '#d66666',
      label: 'Ventas'
    },
  ];

  constructor(
    private dataService: DataService,
    private currencyPipe: CurrencyPipe,
    private percentPipe: PercentPipe,
    private datePipe: DatePipe,
    private loadingService: LoadingService
  ) { }

  ngAfterViewInit() {
    this.loadData(this.report);
  }

  loadData(reportData: any) {
    this.loadingService.toggleLoading();

    this.dataService.getAsync(reportData.url, []).subscribe(
      result => {
        let data = [];

        result.forEach(
          item => {
            switch (reportData.type) {
              case 'ventas': {
                const {creado, pedido} = item;
                const itemFinded = data.find(i => i._valorX === this._fecha(creado));

                if (!itemFinded) {
                  data.push({
                    id: data.length,
                    valorX: creado,
                    valorY: pedido.total,
                    _valorX: this._fecha(creado),
                    // _valorY: this._numero(pedido.total),
                  });
                } else {
                  data[itemFinded.id].valorY += pedido.total;
                  // data[itemFinded.id]._valorY = this._numero(data[itemFinded.id].valorY);
                }

                break;
              }
              case 'pedidos': {
                const {creado} = item;
                const itemFinded = data.find(i => i._valorX === this._fecha(creado));

                if (!itemFinded) {
                  data.push({
                    id: data.length,
                    valorX: creado,
                    valorY: 0,
                    _valorX: this._fecha(creado)
                  });
                } else {
                  ++data[itemFinded.id].valorY;
                }

                break;
              }
              case 'stock': {
                const {cantidad, codigo, nombre} = item;

                data.push({
                  id: data.length,
                  valorX: `${codigo + ' - ' + nombre}`,
                  valorY: cantidad
                });

                break;
              }
              case 'productos': {
                item.pedido.productosPedidos.forEach(
                  prod => {
                    const {nombre, codigo, cantidad} = prod;
                    const finded = data.find(obj => obj.valorX === nombre);

                    if (!finded) {
                      data.push({
                        id: data.length,
                        valorX: nombre,
                        valorY: cantidad,
                        _valorX: `${codigo} - ${nombre}`
                      });
                    } else {
                      data[finded.id].valorY += cantidad;
                    }
                  }
                );
              }
            }
          }
        );

        data = this._sort(data, reportData.type, reportData.maxItems);

        if (reportData.type === 'productos') {
          const arrayUnidades = data.map(item => item.valorY);
          const totalPerc = data.map(item => (item.valorY / arrayUnidades.reduce((a, b) => a + b)));

          this.barChartData[0].data = totalPerc;
          this.barChartData.push({
            data: totalPerc.map((item, index) => index === 0 ? item : totalPerc.slice(0, index).reduce((a, b) => a + b) + item),
            type: 'line',
            fill: false,
            backgroundColor: '#d66666',
            borderColor: '#d66666',
            borderJoinStyle: 'round',
            label: '% Acumulado'
          });
        } else {
          this.barChartData[0].data = data.map(item => (item._valorY || item.valorY));
        }

        this.barChartLabels = data.map(item => (item._valorX || item.valorX));
        this.barChartData[0].label = this.report.label;

        this.loadingService.toggleLoading();
      }
    );
  }

  _truncate = (word: string, maxLenght: number = 25): string => word.length > maxLenght ? word.substring(0, maxLenght).concat('...') : word;

  _fecha = (date) => this.datePipe.transform(date, 'MMMM yyyy');

  _sort = (array: any[], sortingType: string, maxItems: number = 12): any[] => {
    return array
            .slice(0, maxItems)
            .sort((a, b) => {
              switch (sortingType) {
                case 'stock': {
                  return b.valorY < a.valorY ? 1 : -1;
                }
                case 'productos': {
                  return b.valorY > a.valorY ? 1 : -1;
                }
                default: {
                  return new Date(b.valorX) > new Date(a.valorX) ? 1 : -1;
                }
              }
            });
  }
}
