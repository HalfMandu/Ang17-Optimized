import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Subscription, catchError, throwError, Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from '../details/details.component';
import { Quote } from '../shared/quote';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, DetailsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush, //skip descendant component subtrees with roots, which have not received new inputs
})
export class MainComponent {
  @Input() repos: any; //receives inital values from app component oninit()
  gitHubURL: string = 'https://api.github.com/users/halfmandu/repos'; //array of repo Objects
  quoteUrl: string = 'https://type.fit/api/quotes'; //array of 2-field objects: author, text
  quotes: Observable<Quote[]> = new Observable();
  quotes2: any;
  // appDataSub: Observable<any> = new Observable;
  // quotes3: Observable<Quote[]> = [];
  // quotes: Quote[] = [];
  showModal: boolean = false;
  title = 'scss-app'; //for modal
  repoSubscription: Subscription = new Subscription(); //used for tracking Repo Observable subscription

  constructor(private httpClient: HttpClient) {}

  async ngOnInit() {
    //this.appData = this.dataService.getData();
    //this.quotes2 = await this.getAuthors();    //working with async pipe
    //this.quotes2 = await this.getAuthors2();    
  }

  //Basic API call with HTTPClient
  getRepos() {
    console.log('getRepos() using HttpClient...');
    this.httpClient
      .get(this.gitHubURL)
      .subscribe((res) => (this.repos = Object.values(res)));
  }

  //button triggered -- this version uses Async pipe in the view...automatically subscribes/unsubscribes
  async getQuotes() {
    this.quotes = this.httpClient
      .request<Quote[]>('GET', this.quoteUrl)
      .pipe(map(response => response.slice(0, 4)))
      .pipe(catchError(this.errorHandler));
  }

  //Re-populate the Quotes list with async pipe
  async getQuotes2() {
    // console.log('get Quotes2...');
    // this.quotes = Object.values(
    //   await this.httpClient
    //     .request<Quote>('GET', this.quoteUrl)
    //     .pipe(take(4))
    //     .pipe(catchError(this.errorHandler))
    // );
  }

  //Fetch auhor data from http without async pipe -- old/traditional way
  async getAuthorsWithSubscribe() {
    const response = await this.httpClient
      .request<Quote[]>('GET', this.quoteUrl)
      .pipe(catchError(this.errorHandler));

    this.quotes2 = response;
    // return response.subscribe((data) => (this.quotes = data));
  }

  //Making sure to unsubscribe from Subscriptions at end of Component lifecycle
  ngOnDestroy() {
    console.log('Unsubscribing from subscriptions in main ngOnDestroy()...');
    this.repoSubscription.unsubscribe();
  }

  //Enabling trackBy in forloop for performance
  usingTrackBy(index: any, item: any) {
    return item.id; // If each item has an id, return item.id
  }

  //Reset data to rest cache again
  resetData() {
    this.repos = [];
    // this.quotes = [];
    this.quotes = new Observable();
  }

  //HTTP error Handler
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }
}
