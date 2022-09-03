import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS }   from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AudioChallengeComponent } from './pages/audio-challenge/audio-challenge.component';
import { WordCardComponent } from './components/word-card/word-card.component';
import { SprintComponent } from './pages/sprint/sprint.component';
import { TextbookComponent } from './pages/textbook/textbook.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { GameResultsComponent } from './shared/components/game-results/game-results.component';
import { MainComponent } from './pages/main/main.component';
import { AuthComponent } from './pages/auth/auth.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon'
import { MatBadgeModule } from '@angular/material/badge';
import { StartViewComponent } from './pages/sprint/start-view/start-view.component';
import { GameViewComponent } from './pages/sprint/game-view/game-view.component';
import { TimerComponent } from './components/timer/timer.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ResultTableComponent } from './components/result-table/result-table.component';
import { MatTableModule } from '@angular/material/table';
import { AudioCallengGameComponent } from './components/audio-calleng-game/audio-calleng-game.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { JwtInterceptor } from './services/requests/jwt.interceptor';
import { CounterModule } from 'angular-circle-counter';



@NgModule({
  declarations: [
    AppComponent,
    AudioChallengeComponent,
    WordCardComponent,
    SprintComponent,
    TextbookComponent,
    StatisticsComponent,
    GameResultsComponent,
    MainComponent,
    StartViewComponent,
    GameViewComponent,
    TimerComponent,
    ResultTableComponent,
    AudioCallengGameComponent,
    DonutChartComponent,
    AuthComponent,
    HeaderComponent,
    SignInFormComponent,
    RegistrationFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatBadgeModule,
    NgHttpLoaderModule.forRoot(),
    MatTableModule,
    MatCardModule,
    MatSelectModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    CounterModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
