import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from '../details/details.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, DetailsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush, //skip descendant component subtrees with roots, which have not received new inputs
})
export class MainComponent {
  @Input() itemsAll: any; //receives inital values from app component oninit()

  gitHubURL: string = 'https://api.github.com/users/halfmandu/repos'; //array of repo Objects
  authorUrl: string = 'https://type.fit/api/quotes'; //array of 2-field objects: author, text
  appData: any;
  showModal: boolean = false;
  title = 'scss-app'; //for modal
  repoSubscription: Subscription = new Subscription;    //used for tracking Repo Observable subscription

  constructor(private httpClient: HttpClient) {}

  //Making sure to unsubscribe from Subscriptions at end of Component lifecycle
  ngOnDestroy() {
    console.log("Unsubscribing from subscriptions in main ngOnDestroy()...")
    this.repoSubscription.unsubscribe();
  }

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

  //Fetch auhor data from http
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
}
