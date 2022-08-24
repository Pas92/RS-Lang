import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/requests/auth.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  constructor(private authService: AuthService) { }

  isPasswordHide: boolean = true

  regFormGroup: FormGroup = new FormGroup({
    'name': new FormControl('', [Validators.required, Validators.minLength(3)]),
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
        this.authService.signIn({
          email: this.regFormGroup.get('email')?.value,
          password: this.regFormGroup.get('password')?.value
        }).subscribe()
      }
    })
  }
}
