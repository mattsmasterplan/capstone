import { Component, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-add-employee-form",
  templateUrl: "./add-employee-form.component.html",
  styleUrls: ["./add-employee-form.component.css"]
})
export class AddEmployeeFormComponent {
  addEmployeeForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    userName: [null, Validators.required],
    password: [null, Validators.required],
    position: [null, Validators.required],
    monStartAvail: [null],
    monEndAvail: [null],
    tuesStartAvail: [null],
    tuesEndAvail: [null],
    wedStartAvail: [null],
    wedEndAvail: [null],
    thursStartAvail: [null],
    thursEndAvail: [null],
    friStartAvail: [null],
    friEndAvail: [null],
    satStartAvail: [null],
    satEndAvail: [null],
    sunStartAvail: [null],
    sunEndAvail: [null],
    email: [null, Validators.required],
    phone: [null, Validators.required]
  });

  positions: string[] = [
    "Insider",
    "Driver",
    "Shift Leader",
    "Store Manager",
    "District Manager"
  ];

  @ViewChild("addEmpForm", { static: false }) formValues: {
    resetForm: () => void;
  };

  constructor(private fb: FormBuilder, private http: HttpClient) {}


  // PROD
   private addEmployeeUrl = "/capstone-testing/api/addNewEmployee.php";
  // Dev
  //private addEmployeeUrl = "http://localhost/api/addNewEmployee.php";


  // Submitting add new employee form
  onSubmit() {

    // Serialize form values for http request
    let serializedForm = JSON.stringify(this.addEmployeeForm.getRawValue());

    // Send Http request
    this.http
      .post(`${this.addEmployeeUrl}`, serializedForm)
      .subscribe(
        responseData => {
         // console.log(responseData);
          // Clear form after submit
          this.formValues.resetForm();
        },
        err => {
          console.log(err);
        }
      );
  }

  public onCancel() {
    this.formValues.resetForm();
  }
}
