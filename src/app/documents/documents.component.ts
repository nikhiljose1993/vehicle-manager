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

  vehicleArr: any[] = JSON.parse(localStorage.getItem('data') as string);
  regNoArr: any[] = this.vehicleArr.map((vehicle) => {
    return vehicle.registrationNumber;
  });
  vehicleForm() {
    this.requiredForm = this.fb.group({
      registrationNumber: ['', Validators.required],
      date: ['', [Validators.required]],
      documentName: ['', Validators.required],
      dateOfExpiry: ['', [Validators.required]],
    });
  }
  requiredForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.vehicleForm();
  }

  ngOnInit(): void {}
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
