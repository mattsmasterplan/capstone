import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule
} from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-create-event-dialog",
  templateUrl: "./create-event-dialog.component.html",
  styleUrls: ["./create-event-dialog.component.css"]
})
export class CreateEventDialogComponent implements OnInit {
  createRequestForm = this.fb.group({
    requestStartTime: [null, Validators.required],
    requestEndTime: [null, Validators.required],
    description: [null]
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  save() {
    this.dialogRef.close(this.createRequestForm.value);
  }

  close() {
    this.dialogRef.close();
  }
}
