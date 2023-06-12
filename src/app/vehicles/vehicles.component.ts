import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
})
export class VehiclesComponent implements OnInit {
  warn!: string;
  success!: string;
  selectedVehicleId!: number;

  retrievedData: any[] = JSON.parse(localStorage.getItem('data') as string);
  ngOnInit(): void {
    this.selectedVehicleId = this.vehicleTypes[0].id;
    this.retrievedData = JSON.parse(localStorage.getItem('data') as string);
  }

  vehicleTypes: any[] = ['Motorcycle', 'Scooter', 'Car', 'Heavy Vehicle'];

  vehicleForm() {
    this.requiredForm = this.fb.group({
      vehicleName: ['', Validators.required],
      registrationNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/
          ),
        ],
      ],
      vehicleType: ['', Validators.required],
    });
  }
  requiredForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.vehicleForm();
  }

  onClickSubmit(data: {
    vehicleName: string;
    registrationNumber: string;
    vehicleType: string;
  }) {
    const { vehicleName, registrationNumber, vehicleType } = data;
    const vehicleObj = {
      vehicleName,
      registrationNumber,
      vehicleType,
      documents: [],
      expenses: [],
    };
    if (this.requiredForm.valid) {
      if (localStorage.getItem('data') === null) {
        localStorage.setItem('data', JSON.stringify([vehicleObj]));
        this.retrievedData = JSON.parse(localStorage.getItem('data') as string);
      } else {
        const newData: Array<object> = JSON.parse(
          localStorage.getItem('data') as string
        );
        newData.push(vehicleObj);
        localStorage.setItem('data', JSON.stringify(newData));
        this.retrievedData = JSON.parse(localStorage.getItem('data') as string);
        this.requiredForm.reset();
        this.warn = '';
        this.success = 'Vehicle added successfully';
      }
    } else {
      this.warn = 'Incomplete or incorrect data';
      this.success = '';
    }
  }
}
