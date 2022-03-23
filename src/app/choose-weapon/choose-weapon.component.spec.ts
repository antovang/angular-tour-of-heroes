import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseWeaponComponent } from './choose-weapon.component';

describe('ChooseWeaponComponent', () => {
  let component: ChooseWeaponComponent;
  let fixture: ComponentFixture<ChooseWeaponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseWeaponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
