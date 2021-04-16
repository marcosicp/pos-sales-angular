import { DialogOperacionOkComponent } from "./../../dialogs/dialog-operacion-ok/dialog-operacion-ok.component";
import { Configuracion } from "../../shared/models/configuracion.model";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatTableDataSource } from "@angular/material";
import { Router, NavigationExtras } from "@angular/router";
// MODELOS
// SERVICIOS
import { DataService } from "../../core/services/data.service";
// DIALOGOS
import { DialogVerItemsPedidoComponent } from "../../dialogs/dialog-ver-items-venta/dialog-ver-items-venta.component";
import { DialogSinConexionComponent } from "../../dialogs/dialog-sin-conexion/dialog-sin-conexion.component";
// CONFIGURACIONES
import {
  URL_CONFIGURACION,
  URL_VENTAS,
} from "../../shared/configs/urls.config";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-ventas",
  templateUrl: "./configuracion.component.html",
  styleUrls: ["./configuracion.component.scss"],
})
export class ConfiguracionComponent implements OnInit {
  configForm: FormGroup;
  error: string;
  configuracion: Configuracion = new Configuracion();
  isLoading: boolean;

  constructor(
    private router: Router,
    private comerciosService: DataService,
    public dialog: MatDialog
  ) {
    this.isLoading = true;
    this.configForm = new FormGroup({
      efectivo: new FormControl(this.configuracion.efectivo),
      unaCuota: new FormControl(this.configuracion.unaCuota),
      tresCuotas: new FormControl(this.configuracion.tresCuotas),
      transferencia: new FormControl(this.configuracion.transferencia),
      debito: new FormControl(this.configuracion.debito),
      mercadoPago: new FormControl(this.configuracion.mercadoPago),
      cuentaCorriente: new FormControl(this.configuracion.cuentaCorriente),
    });
  }

  ngOnInit() {
    this.comerciosService
      .getOneAsync(URL_CONFIGURACION.GET_ALL, {})
      .subscribe((data) => {
        this.configuracion = data;
        // const dialogRef = this.dialog.open(
        //   DialogSinConexionComponent,
        //   { width: '900px',  disableClose: true}
        // );
        // dialogRef.afterClosed().subscribe(() => this.router.navigate(['welcome']));
        this.isLoading = false;
      });
  }

  guardar(config: any) {
    debugger;
    this.comerciosService
      .postAsync(URL_CONFIGURACION.UPDATE_CONFIGURACION, config)
      .subscribe((data) => {
        if (!data) {
          debugger;
          const dialogRef = this.dialog.open(DialogSinConexionComponent, {
            width: "900px",
            disableClose: true,
          });
          dialogRef
            .afterClosed()
            .subscribe(() => this.router.navigate(["welcome"]));
        } else {
          const dialogRef = this.dialog.open(DialogOperacionOkComponent, {
            width: "900px",
            disableClose: true,
          });
        }
        this.isLoading = false;
      });
  }
}
