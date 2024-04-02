import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { catchError, throwError } from 'rxjs';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title1 = 'ang-optimized';
  appData: any;
  authorUrl: string = 'https://type.fit/api/quotes'; //array of 2-field objects: author, text
  gitHubURL: string = 'https://api.github.com/users/halfmandu/repos'; //array of repo Objects
  itemsAll: any;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {

    localStorage.setItem('access_token', "token");

    this.callApiHandler();
    // this.useFetch();
    // this.httpClient1();
  }
  
  //Basic API call with HTTPClient
  callApiHandler() {
    console.log('apiHandler()...');
    this.httpClient
      .get(this.gitHubURL)
      .subscribe(res => (this.itemsAll = Object.values(res)));
  }

  //Reset data to rest cache again
  resetData() {
    this.itemsAll = [];
    this.appData = [];
  }

  //fetch basic demo -- doesn't trigger HTTP interceptors...
  async useFetch() {
    const response = await fetch(this.authorUrl);
    console.log(await response.json());
  }

  //fetch auhor data from http
  async fetchAuthors() {
    const response = await this.httpClient
      .request('GET', this.authorUrl)
      .pipe(catchError(this.errorHandler));
    return response.subscribe((data) => (this.appData = data));
  }

  // HttpClient - http.request
  async httpClient1() {
    console.log('httpclient...');

    // const response = await this.httpClient.get<any>(this.authorUrl);
    const response = await this.httpClient
      .request('GET', this.authorUrl)
      .pipe(catchError(this.errorHandler));
    // return response.subscribe(data => console.log(data));
    // response.subscribe(data => this.appData = data );

    response.subscribe(
      (data) =>
        (this.appData = {
          ...data,
        })
    );

    console.log('this.appData', this.appData);
    //return;
  }

  //HTTP error Handler
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }

  ////////////////////////////////////////////////////////////////////////////////
  // MODAL
  title = 'scss-app';
  showModal: boolean = false;
  openModal() {
    this.showModal = true;
    // console.log(this.itemsAll);
  }

  closeModal() {
    this.showModal = false;
  }
}
