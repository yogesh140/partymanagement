import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartyFormComponent } from './edit-party-form.component';

describe('EditPartyFormComponent', () => {
  let component: EditPartyFormComponent;
  let fixture: ComponentFixture<EditPartyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPartyFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPartyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
