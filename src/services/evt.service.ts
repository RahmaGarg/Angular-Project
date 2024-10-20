import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evt } from 'src/models/Evt';
@Injectable({
  providedIn: 'root'
})
export class EvtService {

  constructor(private httpClient:HttpClient, private http:HttpClient) { }
  getAllEvt():Observable<Evt[]>{
    return this.httpClient.get<Evt[]>('http://localhost:3000/evt')
  }
// Ajouter un membre
addEvt(e:Evt): Observable<void> { 
  return this.http.post<void>('http://localhost:3000/evt', e);
}
getEvtById(id:string):Observable<Evt>{ 
  
  //envoyer une requette http en mode GET
  return this.http.get<Evt>(`http://localhost:3000/evt/${id}`)  
  }
  Update(e:Evt,id:String): Observable<void> { 
    return this.http.put<void>(`http://localhost:3000/evt/${id}`,e);
  }
  deleteEvt(id:String): Observable<void> { 
    return this.http.delete<void>(`http://localhost:3000/evt/${id}`);  //lcote mte3 altgr7 moch el cote el 3adia bch tkharajlk el id mel endpoint
  }
}
