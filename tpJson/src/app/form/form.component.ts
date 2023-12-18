import { Component } from '@angular/core';
import { FormGroup, FormBuilder  } from '@angular/forms';
import { EmpService } from '../emp.service';
import { Employee } from '../employee';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  EmpArray = new Array <Employee>();
  formValue !: FormGroup;
  empM : Employee = new Employee();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !:boolean;

  constructor(private formBuilder: FormBuilder, private emp: EmpService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      id: [''],
      name: [''], 
      status: [''],
      email: ['']
    });
    this.getAllEmployees();
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeesDetails(){
    this.empM.name = this.formValue.value.name;
    this.empM.status = this.formValue.value.status;
    this.empM.email = this.formValue.value.email;

    this.emp.postEmployees(this.empM)
    .subscribe(res => {
      console.log(res);
      alert("Empoyee Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployees();
    },
    err=>{
      alert("Something went wrong");
    }
    )
  }
  
  getAllEmployees(){
    this.emp.getEmployee()
    .subscribe(res =>{
      this.employeeData = res;
    })
  }

  deleteEmployee(row : any){
    this.emp.deleteEmployee(row.id)
    .subscribe(res =>{
      alert("Employee Deleted");
      this.getAllEmployees();
    })
  }

  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.empM.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['status'].setValue(row.status);
    this.formValue.controls['email'].setValue(row.email);
  }

  updateEmployeesDetails(){
    this.empM.name = this.formValue.value.name;
    this.empM.status = this.formValue.value.status;
    this.empM.email = this.formValue.value.email;

    this.emp.updateEmployee(this.empM, this.empM.id)
    .subscribe(res =>{
      alert("Updated Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployees();
    })
  }
}
