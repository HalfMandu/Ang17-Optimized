import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';  
// import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title1 = 'ang-optimized';
  
  constructor() {}
    
    // ngOnInit(): void {
    //   if (1 > 3){
    //     console.log("true");
    //   }else{
    //     console.log("false");
    //   }
    // }

    title = 'scss-app'; 
    showModal: boolean = false; 
    openModal() { 
        this.showModal = true; 
    } 
  
    closeModal() { 
        this.showModal = false; 
    } 

}
