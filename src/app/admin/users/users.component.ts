import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
// SERVICIOS
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../core/services/data.service';
// MODELOS
import { Usuarios } from '../../shared/models/usuarios.model';
// CONFIGURACIONES
import { URL_USER } from '../../shared/configs/urls.config';
import { TABLA_USUARIOS } from '../../shared/configs/table.config';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  addUserActive = false;

  newUserEmail: string;
  newUserPassword: string;

  users: Usuarios[];
  roles = ['usuario', 'Admin'];

  tableTitle = TABLA_USUARIOS.title;
  dataSource = new MatTableDataSource<Usuarios>();
  headerTitles = Object.keys(TABLA_USUARIOS.cells);
  tableHeaders = TABLA_USUARIOS.headers;
  columnCells = TABLA_USUARIOS.cells;
  formatTableCells = TABLA_USUARIOS.format;
  isLoading: boolean;

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {  }

  ngOnInit() {
    this.isLoading = true;
    this.dataService.getAsync(URL_USER.HOME, this.users).subscribe(
      data => {
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  addUserToggle() {
    this.newUserEmail = null;
    this.newUserPassword = null;
    if (this.addUserActive === true) {
      this.addUserActive = false;
    } else {
      this.addUserActive = true;
    }
  }

  userSignup() {
    this.authService.signup(this.newUserEmail, this.newUserPassword);
    this.newUserEmail = null;
    this.newUserPassword = null;
    this.addUserToggle();
  }

  updateUser(id, role) {
    // Check if admin role has been selected
    let admin = false;
    if (role === 'Admin') {
      admin = true;
    }
    this.authService.updateUserRole(id, {admin: admin});
  }

  deleteUser() {

  }
}
