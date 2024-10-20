import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/models/Member';
@Injectable({  //decorateur pour injecter(utuliser) le service dans les composants ou autres services (equivalent a l'annotation en java)
  providedIn: 'root'  
})
export class MemberService {  //classe orienté objet en utulisant typescript
  constructor(private http:HttpClient) { } //instance du httpclient pour geener les requetes
  //fonctions qui représentent les crud sur les members
 
  getAllMembers():Observable<Member[]>{  //type de retour du fct howa el observable eli mch yji f westou tableau des membres

  //envoyer une requette http en mode GET
  return this.http.get<Member[]>('http://localhost:3000/members')  //le type de retour est un tableau de members
  }
  getMemberByID(id:string):Observable<Member>{ 
  
    //envoyer une requette http en mode GET
    return this.http.get<Member>(`http://localhost:3000/members/${id}`)  
    }
  //add member
// Ajouter un membre
add(m: Member): Observable<void> { 
  return this.http.post<void>('http://localhost:3000/members', m);
}
UpdateMember(m:Member,idcourant:String): Observable<void> { 
  return this.http.put<void>(`http://localhost:3000/members/${idcourant}`,m);
}

deleteMember(id:String): Observable<void> { 
  return this.http.delete<void>(`http://localhost:3000/members/${id}`);  //lcote mte3 altgr7 moch el cote el 3adia bch tkharajlk el id mel endpoint
}


}






