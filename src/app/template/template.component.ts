import { Component } from '@angular/core';
import { AuthService } from 'src/services/AuthService';
import { Router } from '@angular/router';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent {
  constructor(private AS:AuthService,private router:Router){}
  logout():void{
    this.AS.doLogout().then(()=>{
      this.router.navigate([''])

    })
  }

}

