import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  messageClass;
  message;
  processing = false;
  emailValid;
  emailMessage;
  usernameValid;
  usernameMessage;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.createForm();
  }
  
  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])],
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        this.validateUsername
      ])],
      password:['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        this.validatePassword
      
      ])],
      confirm:['', Validators.required],
    }, {validator: this.matchingPassword('password','confirm')})
  }
  
  validateEmail(controls) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateEmail': true}
    }
  }

  validateUsername(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if(regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateUsername':true}
    }
  }

  matchingPassword(password,confirm) {
    return (group: FormGroup) => {
      if(group.controls[password].value === group.controls[confirm].value) {
        return null;
      } else {
        return {'matchingPassword':true}
      }
    }
  }

  validatePassword(controls) {
    const regExp = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{4,20}$/)
    if(regExp.test(controls.value)) {
      return null;
    } else {
      return {'validatePassword' : true}
    }
  }
// Submit Form function
  onRegisterSubmit() {
    //this.processing = true;
    const user = {
      email: this.form.get('email').value,
      username: this.form.get('username').value,
      password: this.form.get('password').value
    }

    this.authService.registerUser(user).subscribe(data => {
    
      if(!data.succes) {
        this.messageClass= 'alert alert-danger';
        this.message = data.message;
        //this.processing = false;
      } else {
        this.messageClass= 'alert alert-success';
        this.message = data.message;
        setTimeout(()=> {
          this.router.navigate(['/login'])
        },2000)
      }
    });
  }

  checkEmail(){
    const email = this.form.get('email').value;
    this.authService.checkEmail(email).subscribe(data => {
      if(!data.succes) {
        this.emailValid = false;
        this.emailMessage = data.message;
      } else {
        this.emailValid = true;
        this.emailMessage = data.message;
      }
    }); 
  }

  checkUsername(){
    const username = this.form.get('username').value;
    this.authService.checkUsername(username).subscribe(data => {
      if(!data.succes) {
        this.usernameValid = false;
        this.usernameMessage = data.message;
      } else {
        this.usernameValid = true;
        this.usernameMessage = data.message;
      }
    }); 
  }

  ngOnInit() {
  }

}
