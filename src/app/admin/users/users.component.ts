import { Component, OnInit } from '@angular/core';
// 
import { AuthService } from '../../core/auth.service';
import { ParseUserRolePipe } from './parse-user-role.pipe';
import { DataService } from '../../services/data.service';
import { Usuarios } from '../../models/usuarios';

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

  constructor(private dataService: DataService, private authService: AuthService) {  }

  ngOnInit() {
    if (this.dataService.usuarios.length) {
      this.users = this.dataService.usuarios;
      this.loadUsuarios();
    } else {
      this.getUsuarios();
    }
  }

  getUsuarios() {
    // this.isLoading = true;
    this.dataService.getAsync('usuarios/', this.dataService.usuarios).subscribe(
      data => {
        // this.usuarios = data;
        this.loadUsuarios();
      },
      error => {
        console.log(error);
        // this.isLoading = false;
      }
    );
  }

  loadUsuarios() {
    // this.dataSource = new MatTableDataSource<Usuarios>();
    // this.dataSource.data = this.usuarios;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // this.isLoading = false;
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
