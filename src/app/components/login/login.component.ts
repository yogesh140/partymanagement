import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  constructor(private toastr: ToastrService) {}

  loginform!: FormGroup;

  ngOnInit(): void {
    this.loginform = this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required],
    });
  }

  
  login() {
    this.authService.loginServices(this.loginform?.value).subscribe({
      next: (res) => {
        this.toastrService.success('login successful!', 'Success');
        localStorage.setItem('token', res.token);
        this.authService.isLoggedIn$.next(true);
        this.router.navigate(['party-list']);
        this.loginform.reset();
      },
      error: (err) => {
        this.toastrService.error(err.error.msg);
      },
    });
  }
}
