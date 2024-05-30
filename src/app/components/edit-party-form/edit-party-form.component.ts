import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PartyService } from '../../services/party.service';
import { PartyStore } from '../store/party.store';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-party-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-party-form.component.html',
  styleUrl: './edit-party-form.component.scss',
})
export default class EditPartyFormComponent implements OnInit {
  toastrService = inject(ToastrService);

  partyformUpdate!: FormGroup;
  partyService = inject(PartyService);
  fb = inject(FormBuilder);
  partyStore = inject(PartyStore);
  route = inject(ActivatedRoute);
  parmaSubscription?: Subscription;
  router = inject(Router);

  partyListId: any;
  partyData: any;

  constructor() {}

  ngOnInit(): void {
    this.parmaSubscription = this.route.paramMap.subscribe({
      next: (param) => {
        this.partyListId = param.get('id');
        if (this.partyListId) {
          this.partyService.getpartyDataById(this.partyListId).subscribe(
            (res) => {
              this.partyData = res;

              if (res) {
                this.partyformUpdate.patchValue({
                  name: res.name,
                  company_name: res.company_name,
                  mobile_no: res.mobile_no,
                  telephone_no: res.telephone_no,
                  whatsapp_no: res.whatsapp_no,
                  email: res.email,
                  remark: res.remark,
                  login_access: res.login_access,
                  date_of_birth: res.date_of_birth,
                  anniversary_date: res.anniversary_date,
                  gstin: res.gstin,
                  pan_no: res.pan_no,
                  apply_tds: res.apply_tds,
                  credit_limit: res.credit_limit,
                });
              }
            },
            (error) => {
              console.error('error', error);
            }
          );
        }
      },
    });

    this.partyformUpdate = this.fb.group({
      name: [,],
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
      gstin: [],
      pan_no: [],
      apply_tds: [, Validators.required],
      credit_limit: [, Validators.required],
    });
  }

  onSubmit() {
    if (this.partyformUpdate.valid) {
      this.partyStore.updatePartyList(
        this.partyListId,
        this.partyformUpdate.value

      );
      this.toastrService.success('Update successfully!', 'Success');
      this.router.navigate(['party-list']);
      this.partyformUpdate.reset();
    } else {
      console.error('Form is invalid');
    }
  }
}
