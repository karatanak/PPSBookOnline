import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  LoginForm: FormGroup;
 
  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.LoginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ]
    });
  }

  get errorControl() {
    return this.LoginForm.controls;
  }

  submitForm = () => {
    if (this.LoginForm.valid) {
      console.log(this.LoginForm.value.email);
      console.log(this.LoginForm.value.password);
      if(this.LoginForm.value.email === "am.yinghunter@gmail.com" && 
      this.LoginForm.value.password === "YingHunter55"){

      }else{

      }

      return false;

    } else {
      
      return console.log('Please provide all the required values!');
    }
  };

  /*onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}*/


}
