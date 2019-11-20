import { CreateEventDialogComponent } from "./create-event-dialog/create-event-dialog.component";
import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { ShowEventDialogComponent } from "./show-event-dialog/show-event-dialog.component";

import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import { HttpClient } from "@angular/common/http";
import { formatDate, JsonPipe } from "@angular/common";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"]
})
export class CalendarComponent implements OnInit {
  @Input() eventData: any;

  calendarPlugins = [interactionPlugin, dayGridPlugin];

  // DEV
  private deleteRequestUrl = "http://localhost/api/getAllRequests.php";
  private addRequestUrl = "http://localhost/api/addNewRequest.php";
  // PROD
  // private deleteRequestUrl = "/capstone-testing/api/getAllRequests.php";
  //private addRequestUrl = "/capstone-testing/api/addNewRequest.php";
  // or maybe
  // private deleteRequestUrl = "https://www.mattsmasterplan.com/capstone-testing/api/getAllRequests.php";

  constructor(public dialog: MatDialog, private http: HttpClient) {
    // Event data declaration needs to be in constructor
    this.eventData = [];
  }

  ngOnInit() {
    // Load requests from database
    this.http.get(`${this.deleteRequestUrl}`).subscribe(responseData => {
      // Concatenate the retrieved events to the calendar data array
      this.eventData = this.eventData.concat(responseData);
    });
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
            title: "Alex K" + ". ",
            description: result.description,
            start: info.dateStr + "T" + result.requestStartTime + ":00",
            end: info.dateStr + "T" + result.requestEndTime + ":00"
          })
          .subscribe(
            // responseData type is any because no structure for this type is defined
            // and I am grabbing a variable (new_id) from the object.
            (responseData: any) => {
              // Add event to view
              this.eventData = this.eventData.concat({
                // TODO: Use actual user instead of hard coded user
                request_id: responseData.new_id,
                title: "Alex K" + ". ",
                description: result.description,
                start: info.dateStr + "T" + result.requestStartTime + ":00",
                end: info.dateStr + "T" + result.requestEndTime + ":00"
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
    // Display dialog with information from the clicked event
    const showEventDialog = this.dialog.open(ShowEventDialogComponent, {
      data: {
        request_id: eventObj._def.extendedProps.request_id,
        title: eventObj.title,
        description: eventObj._def.extendedProps.description,
        start: eventObj.start,
        end: eventObj.end
      },
      height: "400px",
      width: "600px"
    });

    // Subscribe to get data from dialog component when user submits
    showEventDialog.afterClosed().subscribe(result => {

      // Result will be undefined if the dialog close button is clicked
      // Result will be an id of deleted request if delete request button is pressed in dialog
      if (result !== undefined) {

          // Remove deleted request from view
          this.eventData = this.eventData.filter(
            item => item.request_id != result
          );

      }
    });
  }
}
