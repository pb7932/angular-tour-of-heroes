import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { CrisisService } from '../services/crisis-service.service';
import { Crisis } from '../crisis';

@Injectable({
  providedIn: 'root'
})
export class CrisisDetailResolverService implements Resolve<Crisis> {

  constructor(private crisisService: CrisisService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Crisis> | Observable<never> {
    const id = Number(route.paramMap.get('id'));

    return this.crisisService.getCrisis(id).pipe(
      take(1),
      mergeMap(crisis => {
        if ( crisis ) {
          return of ( crisis );
        } else {
          this.router.navigate(['/crisis-center']);
          return EMPTY;
        }
      })
    );
  }
}
