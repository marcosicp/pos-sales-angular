import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
// LA LOGICA DE LA PAGINA ES MOSTRAR UNA PANTALLA QUE BLOQUEE AL USUARIO A TRAVES DE UNA PROPIEDAD EN EL "LOADING SERVICE"

@Component({
  selector: 'loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent {
  loading = false;

  constructor(
    public loadingService: LoadingService
  ) { }

}
