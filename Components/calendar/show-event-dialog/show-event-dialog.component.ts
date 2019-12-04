import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { HttpParams, HttpClient } from "@angular/common/http";
import { CredentialsService } from "src/services/credentials.service";

@Component({
  selector: "app-show-event-dialog",
  templateUrl: "./show-event-dialog.component.html",
  styleUrls: ["./show-event-dialog.component.css"]
})
export class ShowEventDialogComponent implements OnInit {
  // DEV
  //private removeRequestUrl = "http://localhost/api/removeRequest.php";
  //private updateRequestUrl = "http://localhost/api/updateRequest.php";

  // PROD
  private removeRequestUrl =
    "https://mattsmasterplan.com/capstone-testing/api/removeRequest.php";
  private updateRequestUrl =
    "https://mattsmasterplan.com/capstone-testing/api/updateRequest.php";

  permission: number;
  userid: number;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<ShowEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private credentials: CredentialsService
  ) {}

  ngOnInit() {
    // Get logged in user credentials
    this.credentials.getCredentials().subscribe(data => {
      //  console.log(data);

      // grab permission level and id
      this.permission = data.permission;
      this.userid = data.id;
    });
  }

  close() {
    this.dialogRef.close();
  }

  // Delete function called when user clicks delete request button in show event dialog
  deleteRequest(id: number) {
    // Confirm the user wants to delete that request
    if (confirm("Are you sure you want to permanently delete this request?")) {
      // Create parameter for delete request
      const params = new HttpParams().set("id", id.toString());
      // Send delete request to server
      this.http
        .delete(`${this.removeRequestUrl}`, { params: params })
        .subscribe(res => {
          // Close dialog and pass back id of deleted request to calendar component which
          // created this dialog component
          this.dialogRef.close({ action: "deleted", id: id });
        });
    }
  }

  updateRequest(
    request_id: number,
    title: string,
    description: string,
    start: string,
    end: string,
    approvalUserid: number,
    statusUpdate: string
  ) {
    this.http
      .post(`${this.updateRequestUrl}`, {
        request_id: request_id,
        managed_by: approvalUserid,
        statusUpdate: statusUpdate
      })
      .subscribe(
        (responseData: any) => {
          //  console.log(responseData);
        },
        err => {
          console.log(err);
        }
      );

    // this.dialogRef.close("updated:" + requestid);
    this.dialogRef.close({
      action: "updated",
      request_id: request_id,
      title: title,
      description: description,
      start: start,
      end: end,
      managed_by: approvalUserid,
      status: statusUpdate
    });
  }
}
