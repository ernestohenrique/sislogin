import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import firebase from "firebase/compat/app";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  // Método de login com e-mail e senha
  login(email: string, password: string) {
    /*return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        throw this.handleAuthError(error); // Retorna a mensagem de erro apropriada
      });*/
    return this.afAuth.signInWithEmailAndPassword(email, password);
    /*.then((result) => {
        console.log("Usuário logado com e-mail e senha:", result.user);
        this.router.navigate(["/dashboard"]); // Redireciona para a dashboard após login
      })
      .catch((error) => {
        this.handleAuthError(error); // Usa o método de tratamento de erros
      });*/
  }

  // Método para login com Google
  loginWithGoogle() {
    return this.afAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        console.log("Usuário logado com Google:", result.user);
        this.router.navigate(["/dashboard"]); // Redireciona para a dashboard após login
      })
      .catch((error) => {
        this.handleAuthError(error); // Usa o método de tratamento de erros
      });
  }

  // Método de logout
  logout() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(["/login"]); // Redireciona para a tela de login após logout
    });
  }

  // Verifica se o usuário está autenticado
  isAuthenticated() {
    return this.afAuth.authState; // Retorna o estado atual da autenticação
  }

  // Tratamento de erros de autenticação
  public handleAuthError(error: any): string {
    let errorMessage = "Erro ao tentar autenticar.";
    switch (error.code) {
      case "auth/invalid-credential":
        errorMessage =
          "As credenciais de autenticação são inválidas ou expiraram.";
        break;
      case "auth/user-not-found":
        errorMessage = "Usuário não encontrado. Verifique suas credenciais.";
        break;
      case "auth/wrong-password":
        errorMessage = "Senha incorreta. Tente novamente.";
        break;
      case "auth/too-many-requests":
        errorMessage =
          "Muitas tentativas de login. Tente novamente mais tarde.";
        break;
      default:
        errorMessage = "Erro de autenticação: " + error.message;
        break;
    }
    return errorMessage;
  }
}
