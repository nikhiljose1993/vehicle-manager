import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent implements OnInit {
  vehicleForm() {
    this.requiredForm = this.fb.group({
      registrationNumber: [''],
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
  onClickSubmit(data: any) {
    const details = JSON.stringify(data);
  }
}
