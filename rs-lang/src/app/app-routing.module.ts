import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioChallengeComponent } from './pages/audio-challenge/audio-challenge.component';
import { AuthComponent } from './pages/auth/auth.component';
import { MainComponent } from './pages/main/main.component';
import { SprintComponent } from './pages/sprint/sprint.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { TextbookComponent } from './pages/textbook/textbook.component';
import { AuthGuard } from './services/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'textbook',
    component: TextbookComponent
  },
  {
    path: 'sprint',
    component: SprintComponent
  },
  {
    path: 'audio-challenge',
    component: AudioChallengeComponent
  },
  {
    path: 'statistics',
    component: StatisticsComponent
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
