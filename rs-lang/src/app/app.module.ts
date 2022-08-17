import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

@NgModule({
  declarations: [
    AppComponent,
    AudioChallengeComponent,
    WordCardComponent,
    SprintComponent,
    TextbookComponent,
    StatisticsComponent,
    GameResultsComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
