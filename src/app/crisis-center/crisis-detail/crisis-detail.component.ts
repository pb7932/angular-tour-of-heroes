import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Crisis } from '../crisis';
import { CrisisService } from '../services/crisis-service.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {
  crisis: Crisis;
  editName: string;

  constructor(private crisisService: CrisisService,
              private route: ActivatedRoute,
              private router: Router,
              private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getCrisis();
  }

  getCrisis(): void {
    /*
    this.crisis$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.crisisService.getCrisis(Number(params.get('id'))))
    );
    */
    
    /*
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.crisisService.getCrisis(id)
        .subscribe(crisis => this.crisis = crisis);
    */

    this.route.data.subscribe( ( data: { crisis: Crisis } ) => {
      this.editName = data.crisis.name;
      this.crisis = data.crisis;
    });
  }

  cancel() {
    this.gotoCrises();
  }
  
  save() {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }

  gotoCrises() {
    const crisisId = this.crisis ? this.crisis.id : null;
    // Pass along the crisis id if available
    // so that the CrisisListComponent can select that crisis.
    // Add a totally useless `foo` parameter for kicks.
    // Relative navigation back to the crises
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }
}
