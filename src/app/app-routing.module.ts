import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberformComponent } from './memberform/memberform.component';
import { MembersComponent } from './members/members.component';
import { ToolsComponent } from './tools/tools.component';
import { EventsComponent } from './events/events.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticlesComponent } from './articles/articles.component';
import { LoginComponent } from './login/login.component';
//tables nhoto fih les paths
const routes: Routes = [
  {
    path:'create',
    pathMatch:'full', //yaffichi el path eli yel9a fih create kemla bel harf
    component:MemberformComponent
  }, 
  
  {
    path:':id/edit',
    pathMatch:'full', //yaffichi el path eli yel9a fih create kemla bel harf
    component:MemberformComponent


  }, 

  {
    path:'events',
    pathMatch:'full', //yaffichi el path eli yel9a fih create kemla bel harf
    component:EventsComponent

  },
  {
    path:'tools',
    pathMatch:'full', //yaffichi el path eli yel9a fih create kemla bel harf
    component:ToolsComponent


  }, 
  {
    path:'dashboard',
    pathMatch:'full', //yaffichi el path eli yel9a fih create kemla bel harf
    component:DashboardComponent


  },
  {
    path:'articles',
    pathMatch:'full', //yaffichi el path eli yel9a fih create kemla bel harf
    component:ArticlesComponent


  },
  {
    path:'member',
    pathMatch:'full', //yaffichi el path eli yel9a fih create kemla bel harf
    component:MembersComponent


  },
  {
    path:'',
    pathMatch:'full', 
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
