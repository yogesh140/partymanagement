import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PartyService } from '../../services/party.service';
import { PartyStore } from '../store/party.store';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-party-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './party-form.component.html',
  styleUrl: './party-form.component.scss',
})
export default class PartyFormComponent {
  toastrService = inject(ToastrService);

  partyform!: FormGroup;
  partyService = inject(PartyService);
  fb = inject(FormBuilder);
  partyStore = inject(PartyStore);
  router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.partyform = this.fb.group({
      name: [],
      company_name: [, Validators.required],
      mobile_no: [
        ,
        [Validators.required, Validators.pattern(/^[0-9]{10,12}$/)],
      ],
      telephone_no: [],
      whatsapp_no: [],
      email: [, [Validators.required, Validators.email]],
      remark: [],
      login_access: [, Validators.required],
      date_of_birth: [],
      anniversary_date: [],
      gstin: [,],
      pan_no: [],
      apply_tds: [, Validators.required],
      credit_limit: [, Validators.required],
    });
  }

  onSubmit() {
    if (this.partyform.valid) {
      

      this.partyStore.addNewParty(this.partyform.value);
      this.toastrService.success('Add Party successfully!', 'Success');
      this.router.navigate(['party-list']);
      this.partyform.reset();
    } else {
      console.error('Form is invalid');
    }
  }
}
