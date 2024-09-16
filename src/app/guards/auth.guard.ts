import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { map, take } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /* canActivate() {
    return this.authService.isAuthenticated().pipe(
      map((user) => {
        if (user) {
          return true;
        } else {
          this.router.navigate(["/login"]);
          return false;
        }
      })
    );
  }*/

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated().pipe(
      take(1),
      map((user) => {
        if (user) {
          // Usuário está autenticado, permita o acesso
          return true;
        } else {
          // Usuário não está autenticado, redirecione para a página de login
          this.router.navigate(["/login"]);
          return false;
        }
      })
    );
  }
}
