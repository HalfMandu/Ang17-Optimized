import { Component } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {

  gitHubURL: string = 'https://api.github.com/users/halfmandu/repos'; //array of repo Objects
  itemsAll: any;
  appData: any;
  authorUrl: string = 'https://type.fit/api/quotes'; //array of 2-field objects: author, text
  showModal: boolean = false;
  title = 'scss-app';   //for modal

  constructor(private httpClient: HttpClient) {}

  //Basic API call with HTTPClient
  callApiHandler() {
    console.log('HttpClient apiHandler()...');
    this.httpClient
      .get(this.gitHubURL)
      .subscribe(res => (this.itemsAll = Object.values(res)));
  }

  //Reset data to rest cache again
  resetData() {
    this.itemsAll = [];
    this.appData = [];
  }

   //fetch auhor data from http
   async fetchAuthors() {
    const response = await this.httpClient
      .request('GET', this.authorUrl)
      .pipe(catchError(this.errorHandler));
    return response.subscribe((data) => (this.appData = data));
  }
  
  //HTTP error Handler
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }

  ////////////////////////////////////////////////////////////////////////////////
  // MODAL
  
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
