import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Outil } from 'src/models/Outil';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  constructor(private httpClient:HttpClient, private http:HttpClient) { }
  getAllTools():Observable<Outil[]>{
    return this.httpClient.get<Outil[]>('http://localhost:3000/Outil')
  }
// Ajouter un membre
addTool(t:Outil): Observable<void> { 
  return this.http.post<void>('http://localhost:3000/Outil', t);
}
getToolById(id:string):Observable<Outil>{ 
  
  //envoyer une requette http en mode GET
  return this.http.get<Outil>(`http://localhost:3000/Outil/${id}`)  
  }
  Update(t:Outil,id:String): Observable<void> { 
    return this.http.put<void>(`http://localhost:3000/Outil/${id}`,t);
  }
  deleteTool(id:String): Observable<void> { 
    return this.http.delete<void>(`http://localhost:3000/Outil/${id}`);  //lcote mte3 altgr7 moch el cote el 3adia bch tkharajlk el id mel endpoint
  }}
