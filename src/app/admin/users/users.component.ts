import { Component, OnInit } from '@angular/core';
// IMPORTAR SERVICIOS
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../core/services/data.service';
// IMPORTAR MODELOS
import { Usuarios } from '../../shared/models/usuarios.model';
// IMPORTAR URL
import { UserUrl } from 'src/app/shared/configs/urls.config';

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
  // usuarios: Usuarios[];
  roles = ['Usuario', 'Admin'];

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {  }

  ngOnInit() {
    if (this.dataService.usuarios.length > 0) {
      this.users = this.dataService.usuarios;
      this.loadUsuarios(this.users);
    } else {
      this.getUsuarios();
    }
  }

  getUsuarios() {
    // this.isLoading = true;
    this.dataService.getAsync(UserUrl.home, this.users).subscribe(
      data => {
        this.loadUsuarios(data);
      },
      error => {
        console.log(error);
        // this.isLoading = false;
      }
    );
  }

  loadUsuarios(data) {
    // this.dataSource = new MatTableDataSource<Usuarios>();
    // this.dataSource.data = this.usuarios;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // this.isLoading = false;
    this.users = data;
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
