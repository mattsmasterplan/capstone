import { Component, OnInit, Inject } from "@angular/core";
import { CredentialsService } from "src/services/credentials.service";
import { DOCUMENT } from "@angular/common";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  username: string;
  permission: number;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private credentials: CredentialsService
  ) {}

  ngOnInit() {
    // TODO: there is probably a better place to do this than the navbar component
    // Get logged in user credentials
    this.credentials.getCredentials().subscribe(data => {
     // console.log(data);

      // grab username for display on navbar
      this.username = data.username;
      this.permission = data.permission;

      //Redirect them back to login page if not able to authenticate
      if (data.error) {
        this.document.location.href =
          "https://mattsmasterplan.com/capstone-login.php";
      }
    });
  }
}
