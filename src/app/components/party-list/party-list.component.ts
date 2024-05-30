import { Component, OnInit, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PartyService } from '../../services/party.service';
import { CommonModule } from '@angular/common';
import { PartyStore } from '../store/party.store';
import { PartyTableComponent } from '../party-table/party-table.component';

@Component({
  selector: 'app-party-list',
  standalone: true,
  templateUrl: './party-list.component.html',
  styleUrl: './party-list.component.scss',
  imports: [CommonModule, PartyTableComponent],
})
export default class PartyListComponent implements OnInit {
  router = inject(Router);
  partyService = inject(PartyService);
  partyStore = inject(PartyStore);

  constructor() {}
  ngOnInit(): void {}

  redirectToForm() {
    this.router.navigate(['party-form']);
  }
}
