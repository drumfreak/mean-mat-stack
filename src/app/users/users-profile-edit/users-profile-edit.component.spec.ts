import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersProfileEditComponent } from './users-profile-edit.component';

describe('UsersProfileEditComponent', () => {
  let component: UsersProfileEditComponent;
  let fixture: ComponentFixture<UsersProfileEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersProfileEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
