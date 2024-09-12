import { Component } from "@angular/core";
//import { CommonModule } from "@angular/common";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
  styleUrls: ["login.component.css"], // Corrigi a propriedade para "styleUrls"
})
export class LoginComponent {
  email = "";
  password = "";
  errorMessage: string = ""; // Armazena erros de validação

  constructor(private authService: AuthService, private router: Router) {}

  // Função de login
  login(form: NgForm) {
    // Verifica se o formulário é válido
    if (!form.valid) {
      this.errorMessage = "Por favor, preencha o formulário corretamente.";
      return;
    }

    // Valida o e-mail
    if (!this.validateEmail(this.email)) {
      this.errorMessage = "Por favor, insira um e-mail válido.";
      return;
    }

    // Verifica o comprimento da senha
    if (this.password.length < 6) {
      this.errorMessage = "A senha deve ter no mínimo 6 caracteres.";
      return;
    }

    // Chama o serviço de autenticação
    this.authService
      .login(this.email, this.password)
      .then(() => {
        this.router.navigate(["/dashboard"]); // Redireciona após login bem-sucedido
      })
      .catch((error: any) => {
        // Exibe o erro de login
        this.errorMessage = this.authService.handleAuthError(error);
      });
  }

  // Função de login com Google
  loginWithGoogle() {
    this.authService.loginWithGoogle().catch((error) => {
      this.errorMessage = "Erro ao fazer login com Google: " + error.message;
      //console.log("Erro ao fazer login com Google:", error.message);
    });
  }

  // Método para validar e-mail
  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
}

/*import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
  styleUrl: "login.component.css",
  //standalone: true,
  //imports: [CommonModule],
})
export class LoginComponent {
  email = "";
  password = "";
  errorMessage: string = ""; // Para armazenar erros de validação

  constructor(private authService: AuthService, private router: Router) {}
  /*login() {
    this.authService
      .login(this.email, this.password)
      .then(() => {
        this.router.navigate(["/dashboard"]);
      })
      .catch((error: any) => {
        console.log("Erro ao fazer login: ", error);
      });
  }*/
/*
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
        this.router.navigate(["/dashboard"]);
      })
      .catch((error: any) => {
        console.log("Erro ao fazer login: ", error);
      });
  }

  // Método para login com Google
  loginWithGoogle() {
    this.authService.loginWithGoogle().catch((error) => {
      console.log("Erro ao fazer login com Google:", error.message);
      // Lidar com erro, como exibir uma mensagem para o usuário
    });
  }

  // Método simples de validação de e-mail
  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
}
*/
