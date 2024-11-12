import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {EmployeeService} from "./employee.service";
import {Employee} from "./employee.model";
import {map} from "rxjs";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{
  userForm!: FormGroup;
  employees: Employee[] = [];
  isEditMode = false;
  editingEmployeeId: number | null = null;

  constructor(private fb: FormBuilder,
              private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [null, [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
      department: ['', Validators.required]
    });

    this.fetchEmployees();
  }

  fetchEmployees() {

    this.employeeService.getEmployees().subscribe({
      next : (res : any) =>{
        this.employees = res.body;
      }
    })
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.isEditMode) {
        // Update employee in the backend
        const updatedEmployee = { id: this.editingEmployeeId, ...this.userForm.value };

        console.log(updatedEmployee)
        this.employeeService.updateEmployee(updatedEmployee).subscribe({
          next : () =>{
            const index = this.employees.findIndex(emp => emp.id === this.editingEmployeeId);
            this.employees[index] = updatedEmployee;
            alert('Employee updated successfully.');
            this.resetForm();
          }
        })
      } else {
        // Add new employee to the backend
        console.log(this.userForm.value)
        this.employeeService.addEmployee(this.userForm.value)
          .pipe(map((res: HttpResponse<Employee>) => res.body || null ))
          .subscribe({
          next : (newEmployee) => {
            this.employees.push(newEmployee as Employee);
            alert('Employee added successfully.');
            this.userForm.reset();
          }
        })
      }
    }
  }

  onEdit(employee: Employee) {
    this.isEditMode = true;
    this.editingEmployeeId = employee.id;
    this.userForm.patchValue(employee);
  }

  onDelete(employeeId: number, index: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(employeeId).subscribe(
        () => {
          this.employees.splice(index, 1);
          alert('Employee deleted successfully.');
        }
      );
    }
  }

  resetForm() {
    this.userForm.reset();
    this.isEditMode = false;
    this.editingEmployeeId = null;
  }
}
