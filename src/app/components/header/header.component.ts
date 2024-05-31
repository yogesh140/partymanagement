import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  authService = inject(AuthService);

  router = inject(Router);
  isLoggedIn: boolean = false;
  toastrService = inject(ToastrService);


  constructor() {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((res) => {
      this.isLoggedIn = this.authService.isLoggedIn();
    });
  }

  Logout() {
    const tokenLocalStorage = localStorage.getItem('token');
    const logoutdata = {
      value: 'Token ' + tokenLocalStorage,
      key: 'Authorization',
    };

    this.authService.logOutServices(logoutdata).subscribe({
      next: (res) => {
        if (res.status) {
          this.toastrService.success(res.status, 'Success');
          localStorage.removeItem('token');
          this.authService.isLoggedIn$.next(false);
          this.router.navigate(['login']);
        }
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }
}
