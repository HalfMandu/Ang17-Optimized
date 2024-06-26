import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { LoadingIndicatorComponent } from './core/loading-indicator/loading-indicator.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import {
  HttpClient,
} from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule, MainComponent, LoadingIndicatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  authorUrl: string = 'https://type.fit/api/quotes'; //array of 2-field objects: author, text
  gitHubURL: string = 'https://api.github.com/users/halfmandu/repos'; //array of repo Objects
  repos: any;         //array of Repo objects
  repoSubscription: Subscription = new Subscription;    //used for tracking Repo Observable subscription

  constructor(private httpClient: HttpClient) {}

  //When page loads, set auth token and use HttpClient to request/set data
  ngOnInit(): void {
    localStorage.setItem('access_token', "token");    //set token after successful authentication
    this.callApiHandler();    //trigger interceptors and retrieve/set data
  }
  
  //Making sure to unsubscribe() to avoid memory leaks
  ngOnDestroy() {
    console.log("Unsubscribing from subscriptions in app ngOnDestroy()...")
    this.repoSubscription.unsubscribe();
  }
  
  //Basic API call with HTTPClient...used once on pageload in this setup
  //assigning Subscription to local property so that it can be later unsubscribed
  callApiHandler() {
    console.log('Repo apiHandler()...');
    this.repoSubscription = this.httpClient
      .get(this.gitHubURL)
      .subscribe(res => (this.repos = Object.values(res)));
  }
  
}
