import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserSingIn } from 'src/app/models/requests.model';
import { AuthService } from 'src/app/services/requests/auth.service';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  isPasswordHide: boolean = true

  signInFormGroup: FormGroup = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  signIn(authData: UserSingIn): void {
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

    if(typeof res !== 'number') {
          this.authService.setUserInfo(res)
    }
  })
}

}
