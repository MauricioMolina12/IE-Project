import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalClearHistoryComponent } from './modal-clear-history.component';

describe('ModalClearHistoryComponent', () => {
  let component: ModalClearHistoryComponent;
  let fixture: ComponentFixture<ModalClearHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalClearHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalClearHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
