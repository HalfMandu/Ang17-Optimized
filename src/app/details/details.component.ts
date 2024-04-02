import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  showModal: boolean = false;
  
  openModal() {
    // console.log("opening modal");
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  
}
