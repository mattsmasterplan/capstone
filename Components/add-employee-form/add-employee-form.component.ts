import { Component } from "@angular/core";
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
    email: [null, Validators.required],
    phone: [null, Validators.required]
  });

  positions: string[] = [
    "Associate - permission level 4",
    "Shift Leader - permission level 3",
    "Store Manager - permission level 2",
    "District Manager - permission level 1"
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  onSubmit() {
    //alert(this.addEmployeeForm.get("firstName").value);

    let formObj = this.addEmployeeForm.getRawValue();
    let serializedForm = JSON.stringify(formObj);

    // Send Http request

    // POST PATH FOR PROD
    // this.http
    //   .post(
    //     '/capstone-testing/api/addNewEmployee.php',
    //     serializedForm
    //   )
    //   .subscribe(responseData => {
    //     console.log(responseData);
    //   });

    // POST PATH FOR DEV
    this.http
      .post("http://localhost/api/addNewEmployee.php", serializedForm)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }
}
