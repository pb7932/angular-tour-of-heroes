import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Crisis } from '../crisis';
import { CrisisService } from '../services/crisis-service.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {
  crisis$: Observable<Crisis>;

  constructor(private crisisService: CrisisService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCrisis();
  }

  getCrisis(): void {
    this.crisis$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.crisisService.getCrisis(Number(params.get('id'))))
    );
  }
}
