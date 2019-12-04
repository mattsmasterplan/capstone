import { CreateEventDialogComponent } from "./create-event-dialog/create-event-dialog.component";
import { Component, Input, OnInit, Inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CredentialsService } from "src/services/credentials.service";
import { ShowEventDialogComponent } from "./show-event-dialog/show-event-dialog.component";
import { DOCUMENT } from "@angular/common";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import { HttpClient } from "@angular/common/http";
import { formatDate, JsonPipe } from "@angular/common";
import { AngularWaitBarrier } from "blocking-proxy/built/lib/angular_wait_barrier";
import { isNumber } from "util";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"]
})
export class CalendarComponent implements OnInit {
  @Input() eventData: any;

  calendarPlugins = [interactionPlugin, dayGridPlugin];

  private fullName: string;
  private allUsers = [];
  private getManagerUrl =
    "https://mattsmasterplan.com/capstone-testing/api/getManagerName.php";

  // DEV
  //private getRequestsUrl = "http://localhost/api/getAllRequests.php";
  //private addRequestUrl = "http://localhost/api/addNewRequest.php";
  // PROD
  private getRequestsUrl = "/capstone-testing/api/getAllRequests.php";
  private addRequestUrl = "/capstone-testing/api/addNewRequest.php";
  // PROD
  private getAllUsersUrl =
    "https://mattsmasterplan.com/capstone-testing/api/getAllUsers.php";

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public dialog: MatDialog,
    private http: HttpClient,
    private credentials: CredentialsService
  ) {
    // Event data declaration needs to be in constructor
    this.eventData = [];
  }

  ngOnInit() {
    // Get logged in user credentials
    this.credentials.getCredentials().subscribe(data => {
      // console.log(data);

      // Grab full name for request creation title
      this.fullName = data.first_name + " " + data.last_name;

      //Redirect them back to login page if not able to authenticate
      if (data.error) {
        this.document.location.href =
          "https://mattsmasterplan.com/capstone-login.php";
      }
    });

    // Get list of all users
    this.http.post(`${this.getAllUsersUrl}`, {}).subscribe(
      (responseData: any) => {
        this.allUsers = responseData;

        console.log(this.allUsers);

        // Load requests from database
        this.http.get(`${this.getRequestsUrl}`).subscribe(responseData => {
          // Loop through requests loaded from database
          for (var i = 0; i < Object.keys(responseData).length; i++) {
            // Set background color based off request status
            responseData[i].backgroundColor = this.setBackgroundColor(
              responseData[i].status
            );
            // If request has managed_by value, then get managers name for display
            if (responseData[i].managed_by != null) {
              // responseData[i].manager = this.getManagerName(
              //   responseData[i].managed_by
              // );

              var manager = this.getManagerName(responseData[i].managed_by);

              responseData[i].manager = manager;
            }
          }
          // Concatenate the retrieved events to the calendar data array
          this.eventData = this.eventData.concat(responseData);
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  setBackgroundColor(status: string) {
    switch (status) {
      case "pending":
        // Fullcalendar's default blue color
        return "#3788d8";
      case "denied":
        return "red";
      case "approved":
        return "green";
    }
  }

  getManagerName(manager_id: number): string {
    var name: string;

    // Search all users array for user with id matching the input id
    this.allUsers.forEach(user => {
      if (user.id == manager_id) {
        name = user.first_name + " " + user.last_name;
      }
    });
    // Return the name matching id
    return name;
  }

  // When selecting a date on the calendar
  dateClick(info: { dateStr: String }) {
    // Display dialog component
    const createEventDialog = this.dialog.open(CreateEventDialogComponent, {
      height: "400px",
      width: "400px"
    });
    // Subscribe to get data from dialog component when user submits
    createEventDialog.afterClosed().subscribe(result => {
      // Result will be undefined if user closes dialog and does not submit a new event
      if (result !== undefined) {
        // Send event to database
        this.http
          .post(`${this.addRequestUrl}`, {
            user_id: "001",
            title: this.fullName + ". ",
            description: result.description,
            start: info.dateStr + "T" + result.requestStartTime + ":00",
            end: info.dateStr + "T" + result.requestEndTime + ":00"
          })
          .subscribe(
            (responseData: any) => {
              // Add event to view
              this.eventData = this.eventData.concat({
                request_id: responseData.new_id,
                title: this.fullName + ". ",
                description: result.description,
                start: info.dateStr + "T" + result.requestStartTime + ":00",
                end: info.dateStr + "T" + result.requestEndTime + ":00",
                status: "pending",
                backgroundColor: this.setBackgroundColor("pending")
              });
            },
            err => {
              console.log(err);
            }
          );
      }
    });
  }

  // When clicking an event on the calendar
  eventClick(info: { event: any }) {
    var eventObj = info.event;
    console.log(eventObj);
    // Display dialog with information from the clicked event
    const showEventDialog = this.dialog.open(ShowEventDialogComponent, {
      data: {
        request_id: eventObj._def.extendedProps.request_id,
        title: eventObj.title,
        description: eventObj._def.extendedProps.description,
        start: eventObj.start,
        end: eventObj.end,
        status: eventObj._def.extendedProps.status,
        manager: eventObj._def.extendedProps.manager
      },
      height: "400px",
      width: "600px"
    });

    // Subscribe to get data from dialog component when user submits
    showEventDialog.afterClosed().subscribe(result => {
      // Result will be undefined if the dialog close button is clicked
      if (result !== undefined) {
        // If approve or deny buttons were clicked
        if (result.action == "updated") {
          // Delete old event from view
          this.eventData = this.eventData.filter(
            item => item.request_id != result.request_id
          );
          // Add updated event event to view with new status
          this.eventData = this.eventData.concat({
            request_id: result.request_id,
            title: result.title,
            description: result.description,
            start: result.start,
            end: result.end,
            managed_by: result.managed_by,
            status: result.status,
            backgroundColor: this.setBackgroundColor(result.status),
            manager: this.getManagerName(result.managed_by)
          });

          // If delete request was clicked
        } else if (result.action == "deleted") {
          this.eventData = this.eventData.filter(
            item => item.request_id != result.id
          );
        }
      }
    });
  }
}
