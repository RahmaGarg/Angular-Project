import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pub } from 'src/models/Pub';

@Injectable({
  providedIn: 'root'
})
export class PubService {

  constructor(private httpClient:HttpClient, private http:HttpClient) { }
  getAllPub():Observable<Pub[]>{
    return this.httpClient.get<Pub[]>('http://localhost:3000/Pub')
  }
// Ajouter un membre
addPub(p:Pub): Observable<void> { 
  return this.http.post<void>('http://localhost:3000/Pub', p);
}
getPubById(id:string):Observable<Pub>{ 
  
  //envoyer une requette http en mode GET
  return this.http.get<Pub>(`http://localhost:3000/Pub/${id}`)  
  }
  Update(t:Pub,id:String): Observable<void> { 
    return this.http.put<void>(`http://localhost:3000/Pub/${id}`,t);
  }
  deletePub(id:String): Observable<void> { 
    return this.http.delete<void>(`http://localhost:3000/Pub/${id}`);  //lcote mte3 altgr7 moch el cote el 3adia bch tkharajlk el id mel endpoint
  }}
