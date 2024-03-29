import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
// import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title1 = 'ang-optimized';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    // this.useFetch();
    this.httpClient1();
  }

  //fetch basic demo
  authorUrl: string = 'https://type.fit/api/quotes'; //array of 2-field objects: author, text
  async useFetch() {
    const response = await fetch(this.authorUrl);
    console.log(await response.json());
  }

  // HttpClient - http.request
  async httpClient1() {
    console.log('httpclient...');

    const response = await this.httpClient.request('GET', this.authorUrl);
    return response.subscribe(data => console.log(data));
  }

  title = 'scss-app';
  showModal: boolean = false;
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
