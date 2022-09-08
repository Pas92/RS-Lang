import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/requests/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) { }

  _isSignIn: boolean = false
  private destroy$: Subject<boolean> = new Subject<boolean>()

  ngOnInit(): void {
    this.authService.isSignIn$.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this._isSignIn = value
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
