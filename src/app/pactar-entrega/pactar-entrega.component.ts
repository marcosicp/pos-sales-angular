import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, NgZone, Inject, ViewEncapsulation } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, CalendarMonthViewDay, DAYS_OF_WEEK } from 'angular-calendar';
import { DialogEditarEntregaComponent } from '../dialogs/dialog-editar-entrega/dialog-editar-entrega.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { CalendarEventActionsComponent } from 'angular-calendar/modules/common/calendar-event-actions.component';
import { DialogAdvertenciaComponent } from '../dialogs/dialog-advertencia/dialog-advertencia.component';
import { Venta } from '../shared/models/venta.model';
import { DialogOperacionOkComponent } from '../dialogs/dialog-operacion-ok/dialog-operacion-ok.component';
import { DialogSinConexionComponent } from '../dialogs/dialog-sin-conexion/dialog-sin-conexion.component';
import { DataService } from '../core/services/data.service';
import { URL_VENTAS } from '../shared/configs/urls.config';
import { DialogConfirmarCambioFechaComponent } from '../dialogs/dialog-confirmar-cambio-fecha/dialog-confirmar-cambio-fecha.component';

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
  pedidosConEntregas: Venta[];
  CalendarView = CalendarView;
  opcionSeleccionada = false;
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  venta: Venta;
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

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];
  // = [
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'A 3 day event',
  //     color: colors.red,
  //     actions: this.actions,
  //     allDay: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     },
  //     draggable: true
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'An event with no end date',
  //     color: colors.yellow,
  //     actions: this.actions
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     color: colors.blue,
  //     allDay: true
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: new Date(),
  //     title: 'A draggable and resizable event',
  //     color: colors.yellow,
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     },
  //     draggable: true
  //   }
  // ];

  activeDayIsOpen = true;
  oldDates: {oldStart: Date, oldEnd: Date};

  constructor(private modal: NgbModal, private zone: NgZone, private dataService: DataService, private route: ActivatedRoute, public dialog: MatDialog, private router: Router) {

    this.route.queryParams.subscribe(params => {
        if (params) {
          this.venta = JSON.parse(params.pedido);
          const dialogRef = this.dialog.open(DialogAdvertenciaComponent, {
            width: '450px',
            data: {title: 'Seleccione un dia para su entrega.', confirmText: 'Recuerde que debe hacer doble click sobre el dia que considere conveniente.'}
          });
        }
    });

    this.dataService.getAsync(URL_VENTAS.GET_ALL_ENTREGAS, this.pedidosConEntregas).subscribe(
      data => {
        if (data) {
         data.forEach(element => {

          element.agenda.start = startOfDay(new Date(element.agenda.start));
          if (element.agenda.start < Date.now()) {
            element.agenda.title = element.agenda.title.replace('ENTREGA', 'ENTREGADO');
            element.agenda.color.primary = '#a3a3a3';
          }

          this.events.push(element.agenda);
         });
        }

        this.refreshView();
      },
      error => {
        console.log(error);
      }
    );
  }

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

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

  // doubleClick(day: CalendarMonthViewDay) {
  //   if (day) {
  //     const event: CalendarEvent = { title: 'Test', start: day.date,
  //     end: day.date,
  //     color: colors.red,
  //     draggable: true,
  //     resizable: {
  //         beforeStart: true,
  //         afterEnd: true
  //       }
  //     };

  //     this.handleEvent('', event);
  //   }
  // }

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
    this.updateEvent(event);

    const dialogRef = this.dialog.open(DialogConfirmarCambioFechaComponent, {
      width: '500px', disableClose: true,
      data: { event: event }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        return this.opcionSeleccionada = true;
      }
      return this.opcionSeleccionada = false;
    });
  }

  refreshView(): void {
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    if (!this.venta) {
      this.venta = new Venta();
    }

    const dialogRef = this.dialog.open(DialogEditarEntregaComponent, {
          width: '300px', disableClose: true,
          data: { event: event, action: action, venta: this.venta }
        });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const evento: CalendarEvent = { title: 'ENTREGA --> Direccion: ' + result.evento.venta.direccion,
              start: startOfDay(new Date(result.evento.event.start)),
              end: endOfDay(new Date(result.evento.event.start)),
              color: colors.red,
              draggable: true,
              resizable: {
                  beforeStart: true,
                  afterEnd: true
                }
              };

        this.addEvent(evento);
      }
    });
  }

  addEvent(data1: CalendarEvent): void {
    this.venta.agenda = data1;
    this.dataService.postAsync('ventas/AddEntrega', this.venta).subscribe(
      data2 => {
        const dialogRef = this.dialog.open(DialogOperacionOkComponent, { width: '600px' ,  disableClose: true });
        dialogRef.afterClosed().subscribe(result => {
          this.venta = new Venta();
        });
      },
      error => {
        const dialogRef = this.dialog.open(DialogSinConexionComponent, { width: '600px' ,  disableClose: true });
        dialogRef.afterClosed().subscribe(result => {
        });
      }
    );

    this.events = [
      ...this.events,
      data1
    ];

    this.refreshView();
  }

  updateEvent(data1: CalendarEvent): void {
    this.venta.agenda = data1;
    this.dataService.postAsync('ventas/UpdateEntrega', this.venta).subscribe(
      data2 => {
        const dialogRef = this.dialog.open(DialogOperacionOkComponent, { width: '600px' ,  disableClose: true });
        dialogRef.afterClosed().subscribe(result => {
          this.venta = new Venta();
        });
      },
      error => {
        const dialogRef = this.dialog.open(DialogSinConexionComponent, { width: '600px' ,  disableClose: true });
        dialogRef.afterClosed().subscribe(result => {
        });
      }
    );

    this.events = [
      ...this.events,
      data1
    ];

    this.refreshView();
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}

