import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DOCUMENT } from "@angular/common";
import { CredentialsService } from "src/services/credentials.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    private credentials: CredentialsService
  ) {}

  first_name: string;
  last_name: string;
  position: string;
  email: string;
  phone: string;
  username: string;

  ngOnInit() {
    this.credentials.getCredentials().subscribe(data => {
     // console.log(data);

      // grab logged in user information
      this.first_name = data.first_name;
      this.last_name = data.last_name;
      this.position = data.position;
      this.email = data.email;
      this.phone = data.phone;
      this.username = data.username;
    });
  }

  logoutUser() {
    this.http.post("/capstone-testing/api/capstone-logout.php", {}).subscribe(
      (responseData: any) => {
       // console.log(responseData);
        this.document.location.href =
          "https://mattsmasterplan.com/capstone-login.php";
      },
      err => {
        console.log(err);
      }
    );
  }
}
