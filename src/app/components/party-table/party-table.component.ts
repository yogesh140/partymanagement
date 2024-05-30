import { Component, OnInit, inject } from '@angular/core';
import { PartyStore } from '../store/party.store';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-party-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './party-table.component.html',
  styleUrl: './party-table.component.scss',
})
export class PartyTableComponent implements OnInit {
  toastrService = inject(ToastrService);
  partyStore = inject(PartyStore);
  parties$ = this.partyStore.loadPartyListAll();
  router = inject(Router);

  ngOnInit(): void {
    this.parties$ = this.partyStore.loadPartyListAll();
  }

  redirectToEditPArtyForm(id: any) {
    this.router.navigate(['party-list', id]);
  }

  deleteParty(id: number) {
    this.partyStore.deletePartyList(id);
    this.toastrService.success('deleted completed successfully!', 'Success');
  }
}
