import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Crisis } from '../crisis';
import { CRISES } from '../mock-crises';

@Injectable({
  providedIn: 'root'
})
export class CrisisService {

  constructor() { }

  getCrises(): Observable<Crisis[]> {
    const crises = of(CRISES);
    return crises;
  }

  getCrisis(id: number): Observable<Crisis> {
    const crisis = CRISES.find(c => c.id == id) as Crisis;
    return of(crisis);
  }
}
