import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-main",
  templateUrl: "main.component.html",
  styleUrl: "main.component.css",
})
export class MainComponent {
  constructor(private router: Router) {}
  login() {
    //throw new Error("Method not implemented.");
    this.router.navigate(["/login"]);
  }
}
