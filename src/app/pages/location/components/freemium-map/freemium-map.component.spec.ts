import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { FreemiumMapComponent } from './freemium-map.component';

describe('FreemiumMapComponent', () => {
  let fixture: ComponentFixture<FreemiumMapComponent>;
  let component: FreemiumMapComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreemiumMapComponent],
      providers: [
        { provide: DomSanitizer, useValue: { bypassSecurityTrustResourceUrl: () => {} } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FreemiumMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
