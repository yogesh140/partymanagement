import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartyService {
  apiUrls: string = 'https://ap.greatfuturetechno.com/';
  http = inject(HttpClient);

  constructor() {}

  getparty() {
    return this.http.get<any>(`${this.apiUrls}party/`);
  }

  addParty(partyobj: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrls}party/`, partyobj);
  }
  // /party/?id=5
  updateParty(id: any, partyobj: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrls}party/?id=${id}`, partyobj);
  }
  ///party/?id=4
  deleteParty(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrls}party/?id=${id}`);
  }
  //https://ap.greatfuturetechno.com/party/?id=23
  getpartyDataById(id: any) {
    return this.http.get<any>(`${this.apiUrls}party/?id=${id}`);
  }
}
