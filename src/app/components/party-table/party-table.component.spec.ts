import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyTableComponent } from './party-table.component';

describe('PartyTableComponent', () => {
  let component: PartyTableComponent;
  let fixture: ComponentFixture<PartyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartyTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
