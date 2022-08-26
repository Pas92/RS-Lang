import { Component, Input, OnInit } from '@angular/core';
import { UserWord } from 'src/app/models/requests.model';

@Component({
  selector: 'app-word-card-user',
  templateUrl: './word-card-user.component.html',
  styleUrls: ['./word-card-user.component.scss']
})
export class WordCardUserComponent implements OnInit {

  constructor() { }

  @Input() userData!: UserWord

  ngOnInit(): void {
  }

}
