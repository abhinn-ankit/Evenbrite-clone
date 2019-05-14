import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAccount } from '../../../models/userAccount';
import { UserAccountService } from '../../../services/userAccount.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.scss' ]
})
export class RegisterComponent implements OnInit {

  RegisterForm: FormGroup;

  constructor(
    private userAccountService: UserAccountService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.RegisterForm = new FormGroup({
      firstName: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[A-Za-z][A-Za-z0-9]*$')
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[A-Za-z][A-Za-z0-9]*$')
      ]),
      emailRegister: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')
      ]),
      passwordRegister: new FormControl(null, Validators.required)
    });
  }

  onRegister() {
    const user: UserAccount = new UserAccount(
      this.RegisterForm.value.emailRegister,
      this.RegisterForm.value.passwordRegister,
      this.RegisterForm.value.firstName,
      this.RegisterForm.value.lastName
    );
    this.userAccountService.signUp(user).subscribe(
      result => this.userAccountService.signIn(result).subscribe(
        data => {
          localStorage.setItem('token', data['token']);
          localStorage.setItem('user', JSON.stringify(data['user']));
          this.userAccountService.user = result;
          this.router.navigateByUrl('/home');
        },
        error => console.error(error)
      ),
      error => console.error(error)
    );
    this.RegisterForm.reset();
  }

}
