import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messageClass;
  message;
  processing = false;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
   }

  createForm() {
    this.form = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  disableForm() {
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
  }

  enableForm() {
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
  }

  onLoginSubmit() {
    this.processing = true;
    this.disableForm();
    const user = {
      username: this.form.get('username').value,
      password: this.form.get('password').value,
    }
    this.authService.login(user).subscribe(data => {
      if(!data.succes) {
        this.messageClass = 'alert alert-danger',
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message =data.message;
        this.authService.storeUserData(data.token,data.user);
        setTimeout(()=> {
          this.router.navigate(['/dashboard']);
        },2000)
      }
    });
  }
  ngOnInit() {
  }

}
