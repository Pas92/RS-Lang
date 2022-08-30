import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }   from '@angular/common/http';

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

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AudioCallengGameComponent } from './components/audio-calleng-game/audio-calleng-game.component';
import { MatCardModule } from '@angular/material/card';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';

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
    AudioCallengGameComponent,
    DonutChartComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
