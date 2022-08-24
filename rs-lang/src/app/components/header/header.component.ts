import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/requests/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) {}

  signOut(): void {
    this.authService.singOut()
  }

  isSignIn: boolean = false
  userName: string = ''

  ngOnInit(): void {
    this.authService.isSignIn$.subscribe((value: boolean) => {
      this.isSignIn = value
    })
    this.authService.userName$.subscribe((value: string) => {
      this.userName = value
    })
    this.userName = localStorage.getItem('userName') || ''
  }
}
