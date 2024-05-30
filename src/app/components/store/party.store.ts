import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { PartyService } from '../../services/party.service';
import { inject } from '@angular/core';

type TodoState = {
  partyData: any | undefined;
  loading: boolean;
};

const initialState: TodoState = {
  partyData: [],
  loading: false,
};

export const PartyStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, partyService = inject(PartyService)) => ({
    async loadPartyListAll() {
      patchState(store, { loading: true });
      const partyData = await (await partyService.getparty()).toPromise();
      patchState(store, { partyData, loading: false });
    },

    async addNewParty(formObj: any) {
      patchState(store, { loading: true });
      const newParty = await partyService.addParty(formObj).toPromise();
      patchState(store, (state) => ({
        partyData: [...state.partyData, newParty],
        loading: false,
      }));
    },

    async updatePartyList(id: any, party: any) {
      patchState(store, { loading: true });
      const updatedParty = await partyService
        .updateParty(id, party)
        .toPromise();
      patchState(store, (state) => ({
        partyData: state.partyData.map((p: { id: any }) =>
          p.id === updatedParty.id ? updatedParty : p
        ),
        loading: false,
      }));
    },

    async deletePartyList(id: number) {
      patchState(store, { loading: true });
      await partyService.deleteParty(id).toPromise();
      patchState(store, (state) => ({
        partyData: state.partyData.filter((p: any) => p.id !== id),
        loading: false,
      }));
    },
  }))
);
