import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NgSelectModule } from '@ng-select/ng-select';
@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
})
export class VehiclesComponent implements OnInit {
  retrievedData: any[] = JSON.parse(localStorage.getItem('data') as string);
  ngOnInit(): void {
    this.retrievedData = JSON.parse(localStorage.getItem('data') as string);
  }

  vehicleTypes: Array<string> = [
    'Motorcycle',
    'Scooter',
    'Car',
    'Heavy Vehicle',
  ];

  vehicleForm() {
    this.requiredForm = this.fb.group({
      vehicleName: ['', Validators.required],
      registrationNumber: ['', Validators.required],
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
    console.log('vobj', vehicleObj);

    if (localStorage.getItem('data') === null) {
      localStorage.setItem('data', JSON.stringify([vehicleObj]));
      this.retrievedData = JSON.parse(localStorage.getItem('data') as string);
    } else {
      const newData: Array<object> = JSON.parse(
        localStorage.getItem('data') as string
      );
      console.log('submit', newData);
      newData.push(vehicleObj);
      console.log('new', newData);
      localStorage.setItem('data', JSON.stringify(newData));
      this.retrievedData = JSON.parse(localStorage.getItem('data') as string);
    }
  }
}
