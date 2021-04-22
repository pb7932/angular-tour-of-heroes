import { Component, OnInit } from '@angular/core';

import { Crisis } from '../crisis';
import { CRISES } from '../mock-crises';

@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {
  crises: Crisis[];

  constructor() { }

  ngOnInit(): void {
    this.getCrises();
  }

  getCrises():void {
    this.crises = CRISES;
  }

}
