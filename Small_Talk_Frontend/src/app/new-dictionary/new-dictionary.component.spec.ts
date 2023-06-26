import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDictionaryComponent } from './new-dictionary.component';

describe('NewDictionaryComponent', () => {
  let component: NewDictionaryComponent;
  let fixture: ComponentFixture<NewDictionaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewDictionaryComponent]
    });
    fixture = TestBed.createComponent(NewDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
