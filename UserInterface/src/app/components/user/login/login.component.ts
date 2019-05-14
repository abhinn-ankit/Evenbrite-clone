import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAccount } from '../../../models/userAccount';
import { UserAccountService } from '../../../services/userAccount.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup;

  constructor(
    private userAccountService: UserAccountService,
    private router: Router
  ) { }

  ngOnInit() {
    this.LoginForm = new FormGroup({
      password: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')
      ]),
    });
  }

  onSubmit() {
    const user = new UserAccount(this.LoginForm.value.email, this.LoginForm.value.password);
    this.userAccountService.signIn(user)
      .subscribe(
        data => {
          localStorage.setItem('token', data['token']);
          localStorage.setItem('user', JSON.stringify(data['user']));
          this.userAccountService.user = JSON.parse(localStorage.getItem('user'));
          this.router.navigateByUrl('/home');
        },
        error => console.error(error)
      );
    this.LoginForm.reset();
  }

}
