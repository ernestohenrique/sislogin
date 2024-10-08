import { NgModule } from "@angular/core";
import { AppInicialComponent } from "./app-inicial/app-inicial.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./login/login.component";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire/compat";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [AppInicialComponent, LoginComponent, DashboardComponent],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    //provideAuth(() => getAuth()),
    AngularFireAuthModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppInicialComponent],
})
export class AppModuloModule {}
