import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandabletextComponent } from './expandabletext.component';

describe('ExpandabletextComponent', () => {
  let component: ExpandabletextComponent;
  let fixture: ComponentFixture<ExpandabletextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandabletextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandabletextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
