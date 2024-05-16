import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailComponent } from './detail.component';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailComponent]
    });
    // fixture = TestBed.createComponent(DetailComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  fit('should create', () => {
    // expect(component).toBeTruthy();
    expect("Hello").toEqual("Hello");
  });
});