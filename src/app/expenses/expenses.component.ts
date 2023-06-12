import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent {
  warn!: string;
  success!: string;
  selectedVehicleId!: number;

  vehicleArr: any[] = JSON.parse(localStorage.getItem('data') as string);
  regNoArr: any[] = this.vehicleArr.map((vehicle) => {
    return vehicle.registrationNumber;
  });

  ngOnInit(): void {
    this.selectedVehicleId = this.regNoArr[0].id;
  }

  vehicleForm() {
    this.requiredForm = this.fb.group({
      registrationNumber: ['', Validators.required],
      date: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)/
          ),
        ],
      ],
      expenseName: ['', Validators.required],
      expense: ['', Validators.required],
    });
  }
  requiredForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.vehicleForm();
  }

  onClickSubmit(data: {
    registrationNumber: string;
    date: string;
    expenseName: string;
    expense: string;
  }) {
    if (this.requiredForm.valid) {
      const { registrationNumber, date, expenseName, expense } = data;
      const newData = this.vehicleArr.map((vehicle) => {
        if (vehicle.registrationNumber === registrationNumber) {
          vehicle.expenses.push({ date, expenseName, expense });
          return vehicle;
        } else {
          return vehicle;
        }
      });
      localStorage.setItem('data', JSON.stringify(newData));
      this.requiredForm.reset();
      this.warn = '';
      this.success = 'Expense successfully saved';
    } else {
      this.warn = 'Incomplete or incorrect data';
      this.success = '';
    }
  }
}
