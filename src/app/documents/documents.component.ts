import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent implements OnInit {
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
        [Validators.required],
        Validators.pattern(
          /(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)/
        ),
      ],
      documentName: ['', Validators.required],
      dateOfExpiry: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)/
          ),
        ],
      ],
    });
  }
  requiredForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.vehicleForm();
  }

  onClickSubmit(data: {
    registrationNumber: string;
    date: string;
    documentName: string;
    dateOfExpiry: string;
  }) {
    if (this.requiredForm.valid) {
      const { registrationNumber, date, documentName, dateOfExpiry } = data;
      const newData = this.vehicleArr.map((vehicle) => {
        if (vehicle.registrationNumber === registrationNumber) {
          vehicle.documents.push({ date, documentName, dateOfExpiry });
          return vehicle;
        } else {
          return vehicle;
        }
      });
      localStorage.setItem('data', JSON.stringify(newData));
      this.warn = '';
      this.success = 'Documents successfully saved';
    } else {
      this.warn = 'Incomplete or incorrect data';
      this.success = '';
    }
  }
}
