import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio'; // Import MatRadioModule

import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MembersComponent } from './members/members.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';  // Import du module des icônes
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { MemberformComponent } from './memberform/memberform.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateComponent } from './template/template.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolsComponent } from './tools/tools.component';
import { ArticlesComponent } from './articles/articles.component';
import { EventsComponent } from './events/events.component';
import { FirebaseModule } from 'Firebase.module';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import { ModalComponent } from './modal/modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { ConfirmComponent } from './confirm/confirm.component';
import { NgChartsModule } from 'ng2-charts';
import { ToolModalComponent } from './tool-modal/tool-modal.component';
import { PubModalComponent } from './pub-modal/pub-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MembersComponent,
    MemberformComponent,
    TemplateComponent,
    DashboardComponent,
    ToolsComponent,
    ArticlesComponent,
    EventsComponent,
    LoginComponent,
    ModalComponent,
    ConfirmComponent,
    ToolModalComponent,
    PubModalComponent,

  ],
  imports: [ 
    MatRadioModule,
    MatIconModule,
    NgChartsModule ,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatCardModule,
    FirebaseModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
  HttpClientModule,
    MatIconModule,  
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
