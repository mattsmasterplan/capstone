import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Input,
  forwardRef,
  Renderer,
  Renderer2
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "../../services/user.service";
import { Observable } from "rxjs";

import "rxjs";
import { DataSource } from "@angular/cdk/collections";
import { User } from "../models/user.model";

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

const INLINE_EDIT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ManageUsersComponent),
  multi: true
};

@Component({
  selector: "app-manage-users",
  templateUrl: "./manage-users.component.html",
  styleUrls: ["./manage-users.component.css"],
  providers: [INLINE_EDIT_CONTROL_VALUE_ACCESSOR]
})
export class ManageUsersComponent implements OnInit {
  dataSource = new UserDataSource(this.userService);

  displayedColumns = [
    "id",
    "firstName",
    "lastName",
    "position",
    "email",
    "phone",
    "username",
    "permission",
    "manage"
  ];

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit() {}

  removeUser(User: { id: number }) {
    // Use the deleteUser function of the user service to send HTTP delete request with user's id
    this.userService.deleteUser(User.id).subscribe((res: User[]) => {
      // Update table datasource so the table refreshes and the deleted user is removed from view
      // TODO: find a better way to do this because this is not an ideal solution
      this.dataSource = new UserDataSource(this.userService);
    });
  }
}

// Custom data source class using user service to provide material table with data
export class UserDataSource extends DataSource<any> {
  constructor(private userService: UserService) {
    super();
  }
  connect(): Observable<User[]> {
    return this.userService.getUser();
  }
  disconnect() {}
}
