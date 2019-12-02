import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, NgZone, Inject, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, CalendarMonthViewDay, DAYS_OF_WEEK } from 'angular-calendar';
import { CalendarEventActionsComponent } from 'angular-calendar/modules/common/calendar-event-actions.component';
// ENTIDADES
import { Venta } from '../shared/models/venta.model';
// SERVICIOS
import { LoadingService } from '../shared/services/loading.service';
import { DataService } from '../core/services/data.service';
// CONFIGURACIONES
import { URL_VENTAS } from '../shared/configs/urls.config';
// DIALOGOS
import { DialogConfirmarCambioFechaComponent } from '../dialogs/dialog-confirmar-cambio-fecha/dialog-confirmar-cambio-fecha.component';
import { DialogAdvertenciaComponent } from '../dialogs/dialog-advertencia/dialog-advertencia.component';
import { DialogEditarEntregaComponent } from '../dialogs/dialog-editar-entrega/dialog-editar-entrega.component';
import { DialogOperacionOkComponent } from '../dialogs/dialog-operacion-ok/dialog-operacion-ok.component';
import { DialogSinConexionComponent } from '../dialogs/dialog-sin-conexion/dialog-sin-conexion.component';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-pactar-entrega',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './pactar-entrega.component.html',
  styleUrls: ['./pactar-entrega.component.scss']
})

export class PactarEntregaComponent {
  @ViewChild('modalContent', { read: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  locale = 'es-AR';
  allVentas: Venta[];
  CalendarView = CalendarView;
  opcionSeleccionada = false;
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  vista = 'mes';
  venta: Venta;
  allVenta: Venta[];
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  activeDayIsOpen = true;
  oldDates: {oldStart: Date, oldEnd: Date};
  idventa: any;

  constructor(
    private modal: NgbModal,
    private zone: NgZone,
    private dataService: DataService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private loadingService: LoadingService,
    private router: Router
  ) {
    this.loadingService.toggleLoading();

    this.route.queryParams.subscribe(params => {
        if (params.idventa) {
          this.idventa = JSON.parse(params.idventa);
          //this.venta.pedido = JSON.parse(params.pedido);
          const dialogRef = this.dialog.open(DialogAdvertenciaComponent, {
            width: '450px',
            data: { title: 'Seleccione un dia para su entrega.',
            confirmText: 'Recuerde que debe hacer doble click sobre el dia que considere conveniente.' }
          });
        } else {
          this.venta = new Venta();
        }
    });

    this.dataService.getAsync(URL_VENTAS.GET_ALL_ENTREGAS, this.allVentas).subscribe(
      data => {
        if (data) {
          this.allVentas = data;

          data.forEach(element => {
            if (element.agenda != null) {
              element.agenda.id = element.id;
              element = this.setEventLabelAndColor(element);

              this.events.push(element.agenda);
            }
         });

         this.loadingService.toggleLoading();
         this.refreshView();
        } else {
          const dialogRef = this.dialog.open(
            DialogSinConexionComponent,
            { width: '900px',  disableClose: true}
          );

          this.loadingService.toggleLoading();
          dialogRef.afterClosed().subscribe(() => this.router.navigate(['welcome']));
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  doubleClick(day: CalendarMonthViewDay) {
    if (this.idventa) {
      this.venta = this.allVentas.find(x => x.id == this.idventa);
      if (day) {
        const evento: CalendarEvent = {
          title: 'ENTREGA --> Direccion: ' + (( this.venta.direccion == null) ? '' :  this.venta.direccion),
          start: startOfDay(new Date(day.date)),
          end: endOfDay(new Date(day.date)),
          color: colors.red,
          draggable: true,
          resizable: {
              beforeStart: true,
              afterEnd: true
            }
        };

        evento.id = this.idventa;
        this.addEvent(evento);
        this.handleEvent('', evento);
        this.idventa = null;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        const eventoNuevo = {
          ...event,
          start: newStart,
          end: newEnd
        };

        this.notificarCambio(eventoNuevo);
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
  }

  notificarCambio(event: CalendarEvent) {
    // debugger;
    this.updateEvent(event);

    // const dialogRef = this.dialog.open(DialogConfirmarCambioFechaComponent, {
    //   width: '500px', disableClose: true,
    //   data: { event: event }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     return this.opcionSeleccionada = true;
    //   }
    //   return this.opcionSeleccionada = false;
    // });
  }

  refreshView(): void {
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.venta = this.allVentas.find(x => x.id === event.id);
    this.venta.agenda = event;

    const dialogRef = this.dialog.open(DialogEditarEntregaComponent, {
          width: '600px', disableClose: true,
          data: { action: action, venta: this.venta }
        });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.events.forEach(evento => {
            if (evento.id === result.venta.id) {
              evento.title = 'ENTREGA --> Direccion: ' + result.venta.direccion;
              result.venta.agenda.title = 'ENTREGA --> Direccion: ' + result.venta.direccion;
            }
          });

        this.updateEvent(this.venta.agenda);
      } else {
        this.refreshView();
      }
    });
  }

  addEvent(data1: CalendarEvent): void {
    this.events = [
      ...this.events,
      data1
    ];

    this.refreshView();
    this.venta = new Venta();

  }

  updateEvent(event: CalendarEvent): void {
    this.loadingService.toggleLoading();

    this.venta = this.allVentas.find(x => x.id === event.id);
    this.venta.agenda = event;

    this.dataService.postAsync(URL_VENTAS.UPDATE_VENTAS, this.venta).subscribe(
      _data => {
        this.loadingService.toggleLoading();

        const dialogRef = this.dialog.open(
          DialogOperacionOkComponent,
          { width: '600px', disableClose: true }
        );

        dialogRef.afterClosed().subscribe(
          () => {
            this.loadingService.toggleLoading();

            this.events = [];
            this.allVentas.forEach(
              element => {
              if (element.agenda != null) {
                element = element.id === _data.id ? _data : element;
                element.agenda.id = element.id;
                element = this.setEventLabelAndColor(element);

                this.events.push(element.agenda);
              }
            });

            this.loadingService.toggleLoading();
            this.refreshView();
            this.venta = new Venta();
          }
        );
      },
      error => {
        const dialogRef = this.dialog.open(DialogSinConexionComponent, { width: '600px' ,  disableClose: true });
        dialogRef.afterClosed().subscribe(result => {
        });
      }
    );



    this.refreshView();
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    switch (view) {
      case 'day': {
        this.vista = 'día';
        break;
      }
      case 'week': {
        this.vista = 'semana';
        break;
      }
      default: {
        this.vista = 'mes';
        break;
      }
    }
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  setEventLabelAndColor(element: any) {
    element.agenda.start = startOfDay(new Date(element.agenda.start));

    if (element.agenda.start < this.setDateToday()) {
      element.agenda.title = element.agenda.title.replace('ENTREGA', 'ENTREGADO');
      element.agenda.color.primary = '#a3a3a3';
    } else {
      element.agenda.title = element.agenda.title.replace('ENTREGADO', 'ENTREGA');
      element.agenda.color.primary = '#ad2121';
    }

    return element;
  }

  private setDateToday(): Date {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }
}

