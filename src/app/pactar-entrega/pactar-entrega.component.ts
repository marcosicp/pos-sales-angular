import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, NgZone,
  Inject,
  ViewEncapsulation
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarMonthViewDay,
  DAYS_OF_WEEK
} from 'angular-calendar';
import { DialogEditarEntregaComponent } from '../dialogs/dialog-editar-entrega/dialog-editar-entrega.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { CalendarEventActionsComponent } from 'angular-calendar/modules/common/calendar-event-actions.component';
import { DialogConfirmarComponent } from '../dialogs/dialog-confirmar/dialog-confirmar.component';
import { Venta } from '../shared/models/venta.model';

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

  locale: string = 'es-AR';

  CalendarView = CalendarView;

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
        debugger;
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
        debugger;
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private zone:NgZone, private route: ActivatedRoute, public dialog: MatDialog, private router: Router) {
    this.route.queryParams.subscribe(params => {
      debugger;
        if(params){
          this.venta = JSON.parse(params.pedido);
          const dialogRef = this.dialog.open(DialogConfirmarComponent, {
            width: '300px',
            data: {title: "Seleccione un dia para su entrega.", confirmText: "Recuerde que debe hacer doble click sobre el dia que considere conveniente."} 
          });
        }
    })
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

  doubleClick(day: CalendarMonthViewDay) {
    if (day) {
      let event : CalendarEvent = { title: "Test", start: day.date,
      end: day.date,
      color: colors.red,
      draggable: true,
      resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }

      this.handleEvent("", event);
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  refreshView(): void {
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    if (!this.venta) {
      this.venta= new Venta();
    }

    debugger;
    const dialogRef = this.dialog.open(DialogEditarEntregaComponent, {
          width: '300px',
          data: { event: event, action: action, venta: this.venta }
        });

    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if(result){
        let evento : CalendarEvent = { title: 'ENTREGA --> Direccion: ' + result.evento.venta.direccion,
              start: startOfDay(new Date(result.evento.event.start)),
              end: endOfDay(new Date(result.evento.event.start)),
              color: colors.red,
              draggable: true,
              resizable: {
                  beforeStart: true,
                  afterEnd: true
                }
              }
        
        this.addEvent(evento);
      }

      this.refreshView();
    });      
    
    this.venta= new Venta();

  }

  addEvent(data: CalendarEvent): void {
    this.events = [
      ...this.events,
      data
    ];
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

