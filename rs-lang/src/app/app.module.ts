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

@NgModule({
  declarations: [
    AppComponent,
    AudioChallengeComponent,
    WordCardComponent,
    SprintComponent,
    TextbookComponent,
    StatisticsComponent,
    GameResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
