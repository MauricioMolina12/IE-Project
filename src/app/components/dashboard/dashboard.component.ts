import { Component, OnInit } from '@angular/core';
import { faAdd, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Transaction {
  value: number;
  type: 'income' | 'expense';
}

interface PeriodData {
  period: number;
  transactions: Transaction[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  numberPeriods!: number;
  showLine: boolean = false;
  periodsData: PeriodData[] = [];
  showModal: boolean = false;
  modalData: Transaction[] = [];
  selectedPeriodIndex: number | null = null;
  transactionCount!: number;
  showModalTrash: boolean = false;
  confirmDelete: boolean = false;
  draggedPeriodIndex!: number;

  // Icons
  faTrash = faTrash;
  faAdd = faAdd;

  constructor() {}

  ngOnInit(): void {
    this.loadFromLocalStorage();
  }

  generateArrows() {
    if (!this.numberPeriods || this.numberPeriods < 1) {
      this.showLine = false;
      return;
    }

    this.showLine = true;
    this.periodsData = Array.from({ length: this.numberPeriods }, (_, i) => ({
      period: i,
      transactions: [],
    }));

    this.saveToLocalStorage();
  }

  onCardClick(index: number) {
    if(this.periodsData[index].transactions.length > 1){
      this.transactionCount = 2;
    }else{
      this.transactionCount = 1;
    }
    this.selectedPeriodIndex = index;
    this.modalData = JSON.parse(
      JSON.stringify(this.periodsData[index].transactions)
    );
    this.transactionCount = this.modalData.length;
    this.showModal = true;
  }

  onTransactionCountChange(event: any) {
    this.transactionCount = +event.target.value;
    this.modalData = Array.from({ length: this.transactionCount }, (_, i) => ({
      value: 0,
      type: i === 0 ? 'income' : 'expense',
    }));
  }

  onConfirm() {
    if (this.selectedPeriodIndex === null) return;

    this.periodsData[this.selectedPeriodIndex].transactions = JSON.parse(
      JSON.stringify(this.modalData)
    );

    this.showModal = false;
    this.saveToLocalStorage();
  }

  onCancel() {
    this.showModal = false;
  }

  saveToLocalStorage() {
    localStorage.setItem('periodsData', JSON.stringify(this.periodsData));
  }

  loadFromLocalStorage() {
    const data = localStorage.getItem('periodsData');
    if (data) {
      this.periodsData = JSON.parse(data);
      this.numberPeriods = this.periodsData.length;
      this.showLine = this.numberPeriods > 0;
    }
  }

  clearPeriods(numberPeriods: number) {
    if (numberPeriods === 0) {
      this.periodsData = [];
      this.showLine = false;
      this.saveToLocalStorage();
    }
  }

  clearHistory() {
    this.showModalTrash = true;
  }

  onConfirmTrash() {
    this.periodsData = [];
    this.numberPeriods = 0;
    this.showLine = false;
    this.saveToLocalStorage();
    this.showModalTrash = false;
    this.confirmDelete = true;
    setTimeout(() => {
      this.confirmDelete = false;
    }, 2000);
  }

  addNewValue() {
    this.showModal = true;
  }

  onCancelTrash() {
    this.showModalTrash = false;
  }

  onDragStart(event: DragEvent, periodIndex: number) {
    event.dataTransfer?.setData('text', JSON.stringify({ periodIndex }));
    this.draggedPeriodIndex = periodIndex;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, newIndex: number) {
    event.preventDefault();

    if (this.draggedPeriodIndex !== null) {
      const temp = this.periodsData[this.draggedPeriodIndex];
      this.periodsData[this.draggedPeriodIndex] = this.periodsData[newIndex];
      this.periodsData[newIndex] = temp;

      this.periodsData.forEach((period, index) => {
        period.period = index + 1;
      });
    }
  }
}
