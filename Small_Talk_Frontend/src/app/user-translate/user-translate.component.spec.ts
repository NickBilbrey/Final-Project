import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTranslateComponent } from './user-translate.component';

describe('UserTranslateComponent', () => {
  let component: UserTranslateComponent;
  let fixture: ComponentFixture<UserTranslateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTranslateComponent]
    });
    fixture = TestBed.createComponent(UserTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
