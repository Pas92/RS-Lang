import { Component, OnInit } from '@angular/core';
import { GameResult } from 'src/app/models/requests.model';

@Component({
  selector: 'app-short-term',
  templateUrl: './short-term.component.html',
  styleUrls: ['./short-term.component.scss']
})
export class ShortTermComponent implements OnInit {
  total: number = 0;

  resultArray: GameResult[] = [
    {word: 'distinct', audio: 'files/01_1208.mp3', wordTranslate: 'отличный', correct: true, score: 0},
 {word: 'elite', audio: 'files/01_1209.mp3', wordTranslate: 'элита', correct: true, score: 10},
 {word: 'chamber', audio: 'files/01_1204.mp3', wordTranslate: 'камера', correct: true, score: 20},
 {word: 'acre', audio: 'files/01_1201.mp3', wordTranslate: 'акр', correct: false, score: 30},
 {word: 'sole', audio: 'files/01_1218.mp3', wordTranslate: 'подошва', correct: true, score: 30},
 {word: 'corridor', audio: 'files/01_1207.mp3', wordTranslate: 'коридор', correct: true, score: 50},
 {word: 'gap', audio: 'files/01_1212.mp3', wordTranslate: 'пробел', correct: true, score: 70},
 {word: 'stairs', audio: 'files/01_1219.mp3', wordTranslate: 'лестница', correct: false, score: 90},
 {word: 'found', audio: 'files/01_1211.mp3', wordTranslate: 'нашел', correct: true, score: 90},
 {word: 'glory', audio: 'files/01_1213.mp3', wordTranslate: 'слава', correct: true, score: 120},
 {word: 'royal', audio: 'files/01_1217.mp3', wordTranslate: 'королевский', correct: true, score: 150},
 {word: 'interior', audio: 'files/01_1214.mp3', wordTranslate: 'интерьер', correct: true, score: 180},
 {word: 'channel', audio: 'files/01_1205.mp3', wordTranslate: 'канал', correct: true, score: 220},
 {word: 'afterlife', audio: 'files/01_1202.mp3', wordTranslate: 'жизнь после смерти', correct: true, score: 260},
 {word: 'lion', audio: 'files/01_1215.mp3', wordTranslate: 'лев', correct: false, score: 300},
 {word: 'archaeology', audio: 'files/01_1203.mp3', wordTranslate: 'археология', correct: true, score: 300},
 {word: 'engineer', audio: 'files/01_1210.mp3', wordTranslate: 'инженер', correct: true, score: 350},
 {word: 'core', audio: 'files/01_1206.mp3', wordTranslate: 'ядро', correct: false, score: 400},
 {word: 'surface', audio: 'files/01_1220.mp3', wordTranslate: 'поверхность', correct: false, score: 400},
 {word: 'role', audio: 'files/01_1216.mp3', wordTranslate: 'роль', correct: true, score: 400},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
