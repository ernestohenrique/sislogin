import { Injectable } from "@angular/core";
import { GoogleAuthProvider } from "@angular/fire/auth";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  userSubject = new BehaviorSubject<any>(null);

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    // Verifica o usuário na inicialização
    this.getUserSubject();
  }

  // Método de login com e-mail e senha
  login(email: string, password: string): Promise<any> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;
        if (user) {
          const userData = {
            uid: user.uid,
            email: user.email,
            name: user.email || "Usuário sem nome",
          };
          this.setUserSubject(userData);
          return userData;
        } else {
          return null; // Garante que sempre retorna um valor
        }
      })
      .catch((error) => {
        console.error("Erro ao fazer login:", error);
        throw error;
      });
  }

  // Método de login com Google
  loginWithGoogle(): Promise<any> {
    const provider = new GoogleAuthProvider();
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        if (user) {
          const userData = {
            uid: user.uid,
            email: user.email,
            name: user.displayName || "Usuário sem nome",
            photoURL: user.photoURL || null,
          };
          this.setUserSubject(userData);
          return userData;
        } else {
          return null; // Garante que sempre retorna um valor
        }
      })
      .catch((error) => {
        console.error("Erro ao fazer login com Google:", error);
        throw error;
      });
  }

  // Armazena o usuário no BehaviorSubject e sessionStorage
  setUserSubject(user: any) {
    if (user) {
      const userData = {
        uid: user.uid,
        email: user.email,
        name: user.name || "Usuário sem nome",
        photoURL: user.photoURL || null,
      };
      console.log("Saving user to sessionStorage:", userData);
      sessionStorage.setItem("user", JSON.stringify(userData));
      this.userSubject.next(userData);
    } else {
      console.warn("No user provided to setUserSubject");
      sessionStorage.removeItem("user");
      this.userSubject.next(null);
    }
  }

  // Recupera o usuário do sessionStorage e atualiza o BehaviorSubject
  getUserSubject() {
    const user = sessionStorage.getItem("user");
    if (user) {
      console.log("Retrieved user from sessionStorage:", JSON.parse(user));
      this.userSubject.next(JSON.parse(user));
    } else {
      console.warn("No user found in sessionStorage");
    }
  }

  // Método de logout
  logout(): void {
    this.afAuth
      .signOut()
      .then(() => {
        console.log("Usuário deslogado do Firebase");
        this.clearBrowserData();
        setTimeout(() => {
          this.router.navigate([""]);
        }, 1000);
      })
      .catch((error) => {
        console.error("Erro ao deslogar do Firebase:", error);
      });
  }

  // Limpa cookies e armazenamento local
  private clearBrowserData(): void {
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=");
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    });
    localStorage.clear();
    sessionStorage.clear();
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
