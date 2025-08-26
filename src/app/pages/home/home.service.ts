import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TGame } from '../../../../../game-dev-shared/src/game';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private http = inject(HttpClient);

  public getGames(): Observable<TGame[]> {
    return this.http.get<TGame[]>('/api/getGames');
  }
}
