import { Component, Input, OnInit, ContentChild, TemplateRef } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
// import { MatProgressSpinnerModule } from '@angular/material';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { ProgressSpinnerMode, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatProgressSpinnerModule } from '@angular/material';  
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: "loading-indicator",
  templateUrl: "./loading-indicator.component.html",
  styleUrls: ["./loading-indicator.component.scss"],
  // imports: [ MatProgressSpinnerModule, AsyncPipe, NgIf, NgTemplateOutlet ],
  imports: [ CommonModule, MatProgressSpinnerModule ],
  standalone: true,
})
export class LoadingIndicatorComponent implements OnInit {

  loading$: Observable<boolean>;

  @Input()
  detectRouteTransitions = false;

  @ContentChild("loading")
  customLoadingIndicator: TemplateRef<any> | null = null;

  constructor(
  private loadingService: LoadingService, 
  private router: Router) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit() {
    if (this.detectRouteTransitions) {
      this.router.events
        .pipe(
          tap((event) => {
            if (event instanceof RouteConfigLoadStart) {
              this.loadingService.loadingOn();
            } else if (event instanceof RouteConfigLoadEnd) {
              this.loadingService.loadingOff();
            }
          })
        )
        .subscribe();
    }
  }
}