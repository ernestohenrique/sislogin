import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
  styleUrls: ["login.component.css"],
})
export class LoginComponent {
  email = "";
  password = "";
  errorMessage: string = ""; // Armazena erros de validação

  constructor(
    private authService: AuthService,
    //private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  /*ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        console.log("Usuário autenticado encontrado:", user);
        this.router.navigate(["/dashboard"]); // Redireciona para dashboard
      }
    });
  }*/

  // Função de login
  login(form: NgForm) {
    if (!form.valid) {
      this.errorMessage = "Por favor, preencha o formulário corretamente.";
      return;
    }

    if (!this.validateEmail(this.email)) {
      this.errorMessage = "Por favor, insira um e-mail válido.";
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = "A senha deve ter no mínimo 6 caracteres.";
      return;
    }

    this.authService
      .login(this.email, this.password)
      .then(() => {
        this.router.navigate(["/dashboard"]); // Redireciona após login bem-sucedido
      })
      .catch((error: any) => {
        this.errorMessage = this.authService.handleAuthError(error);
      });
  }

  // Função de login com Google
  /*loginWithGoogle() {
    this.authService.loginWithGoogle().catch((error) => {
      this.errorMessage = "Erro ao fazer login com Google: " + error.message;
      console.log("Erro ao fazer login com Google:", error.message);
    });
  }*/
  /*
  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }*/

  loginWithGoogle() {
    this.authService.loginWithGoogle().then(() => {
      this.router.navigate(["/dashboard"]); // Redireciona após login
      // Redirecione para a página desejada ou execute outras ações após login bem-sucedido
    });
  }

  // Método para validar e-mail
  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
}
