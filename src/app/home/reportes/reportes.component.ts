import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../../core/services/data.service';
import { URL_VENTAS } from '../../shared/configs/urls.config';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
  providers: [DatePipe, CurrencyPipe]
})
export class ReportesComponent implements OnInit {
  data = [10, 20, 30];

  constructor(
    private dataService: DataService,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe
  ) { }

  ngOnInit() {
    this.dataService.getAsync(URL_VENTAS.GET_ALL, []).subscribe(
      ventas => {
        d3.select('.chart')
        .selectAll('div')
        .data(ventas)
          .enter()
          .append('div')
          .style('width', (v: any) => `${v.pedido.total / 5}px`)
          .style('background-color', () => 'steelblue')
          .style('color', () => 'white')
          .style('padding', () => '3px')
          .style('margin', () => '3px')
          .text((v: any) => `${this.datePipe.transform(v.creado, 'short')}  -  Total: ${this.currencyPipe.transform(v.pedido.total, '$')}`);
      }
    );


  }

}
