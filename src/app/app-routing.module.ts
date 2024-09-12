import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./guards/auth.guard";
import { MainComponent } from "./main/main.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "main", component: MainComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },

  // Adiciona uma rota coringa para capturar todas as rotas não existentes
  { path: "**", redirectTo: "/main" },
  /*{
    path: "login",
    loadComponent: () =>
      import("./login/login.component").then((m) => m.LoginComponent),
  },
  { path: "main", component: MainComponent },
  { path: "cadastrar", component: CadastrarComponent },
  {
    path: "logada",
    loadChildren: () =>
      import("./logada/logada-routing.module").then(
        (m) => m.RestritoRoutingModule
      ),
  },
  // Adiciona uma rota coringa para capturar todas as rotas não existentes
  { path: "**", redirectTo: "/main" },*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
