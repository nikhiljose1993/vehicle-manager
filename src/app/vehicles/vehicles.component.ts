import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
})
export class VehiclesComponent implements OnInit {
  vehicleTypes: any[] = ['Motorcycle', 'Scooter', 'Car', 'Heavy Vehicle'];
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

  ngOnInit(): void {}
  onClickSubmit(data: { registrationNumber: string }) {
    const details = JSON.stringify(data);
    localStorage.setItem(data.registrationNumber, details);
    console.log(details);
  }
}
