import { PhonePipe } from "./../services/phone.pipe";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LayoutModule } from "@angular/cdk/layout";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";

import { FlexLayoutModule } from "@angular/flex-layout";

import {
  MatDialogModule,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DEFAULT_OPTIONS
} from "@angular/material/dialog";

import {
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatRadioModule,
  MatSelectModule,
  MatInputModule,
  MatTableModule
} from "@angular/material";
import { NavbarComponent } from "./navbar/navbar.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { ManageUsersComponent } from "./manage-users/manage-users.component";
import { ProfileComponent } from "./profile/profile.component";
import { AddEmployeeFormComponent } from "./add-employee-form/add-employee-form.component";
import { ShowEmployeesComponent } from "./show-employees/show-employees.component";

import { UserService } from "../services/user.service";
import { FullCalendarModule } from "@fullcalendar/angular";
import { CreateEventDialogComponent } from "./calendar/create-event-dialog/create-event-dialog.component";
import { ShowEventDialogComponent } from "./calendar/show-event-dialog/show-event-dialog.component";

const appRoutes: Routes = [
  { path: "", component: CalendarComponent },
  { path: "manage-users", component: ManageUsersComponent },
  { path: "manage-users/add-user", component: AddEmployeeFormComponent },
  { path: "profile", component: ProfileComponent },
  { path: "calendar", component: CalendarComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeFormComponent,
    ShowEmployeesComponent,
    NavbarComponent,
    ManageUsersComponent,
    ProfileComponent,
    CalendarComponent,
    CreateEventDialogComponent,
    ShowEventDialogComponent,
    PhonePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    LayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    RouterModule.forRoot(appRoutes),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FullCalendarModule,
    MatDialogModule
  ],
  entryComponents: [CreateEventDialogComponent, ShowEventDialogComponent],
  providers: [
    UserService,
    MatDialog,
    PhonePipe,
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
