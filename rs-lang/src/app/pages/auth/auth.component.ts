import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/requests/auth.service';
import { UserSingIn } from 'src/app/models/requests.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  isPasswordHide: boolean = true

  regFormGroup: FormGroup = new FormGroup({
    'name': new FormControl('', [Validators.required, Validators.minLength(3)]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  signInFormGroup: FormGroup = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(8)])
  })


  ngOnInit(): void {
  }

  registerUser() {
    this.authService.createUser(this.regFormGroup.value).subscribe(res => {
      if(res === 417) {
        this.regFormGroup.get('email')?.setErrors({
          notUnique: true
        })
      }

      if(typeof res === 'object') {
        this.signIn({
          email: this.regFormGroup.get('email')?.value,
          password: this.regFormGroup.get('password')?.value
        })
      }
    })
  }

  signIn(authData: UserSingIn) {
    this.authService.signIn(authData).subscribe(res => {
      if (res === 404) {
        this.signInFormGroup.get('email')?.setErrors({
          notFound: true
        })

        return
      }

      if (res === 403) {
        this.signInFormGroup.get('password')?.setErrors({
          wrongPassword: true
        })

        return
      }
    })
  }

}
