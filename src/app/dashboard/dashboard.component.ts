import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
//declare const gapi: any;

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  user: any;
  userName: any;
  //afAuth: any;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Assina o userSubject para pegar o nome do usuário
    this.authService.userSubject.subscribe((user) => {
      if (user && user.name) {
        this.userName = user.name; // Acessa o nome do usuário
        console.log("User name in dashboard:", this.userName);
      } else {
        console.warn("No user available");
      }
    });

    // Recupera o usuário do sessionStorage no caso de recarregamento da página
    this.authService.getUserSubject();
  }

  logout() {
    this.authService.logout();
  }
}
