import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  tabIndex: number = 0;

  routerSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.checkQueryParams();
  }

  checkQueryParams(): void {
    this.routerSubscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.tabIndex = params['auth'] === 'true' ? 1 : 0;
      }
    );
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
