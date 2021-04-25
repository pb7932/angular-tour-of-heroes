import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Crisis } from '../crisis';
import { CrisisService } from '../services/crisis-service.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {
  crisis: Crisis;

  constructor(private crisisService: CrisisService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCrisis();
  }

  getCrisis(): void {
    let crisisId = Number(this.route.snapshot.paramMap.get('id'));
    this.crisisService.getCrisis(crisisId)
        .subscribe(crisis => this.crisis = crisis);
  }
}
