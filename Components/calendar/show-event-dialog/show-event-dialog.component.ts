import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { HttpParams, HttpClient } from "@angular/common/http";

@Component({
  selector: "app-show-event-dialog",
  templateUrl: "./show-event-dialog.component.html",
  styleUrls: ["./show-event-dialog.component.css"]
})
export class ShowEventDialogComponent {
  // DEV
  private deleteUserUrl = "http://localhost/api/removeRequest.php";

  // PROD
  // private deleteUserUrl = "https://mattsmasterplan.com/capstone-testing/api/removeRequest.php";

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<ShowEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

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
        .delete(`${this.deleteUserUrl}`, { params: params })
        .subscribe(res => {
          // Close dialog and pass back id of deleted request to calendar component which
          // created this dialog component
          this.dialogRef.close(id);
        });
    }
  }
}
