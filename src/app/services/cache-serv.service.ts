import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, Observable, catchError, map } from 'rxjs';

// **Not finished or working yet**
// This implementation uses Sharereplay caching

@Injectable({
  providedIn: 'root',
})
export class CacheServService {
  constructor(private http: HttpClient) {}

  projects$: any;
  gitProjects: any;
  // gitBaseUrl = '';
  gitBaseUrl: string = 'https://api.github.com/users/halfmandu/repos';

  getGitProjects(): void {
    // this.projects$ = this.http.get<any[]>(this.gitBaseUrl).pipe(
    //   map((projects: any) =>
    //     projects.filter((project: any) =>
    //       this.gitProjects.includes(project.name)
    //     )
    //   ),
    console.log("cacheServe...");
    this.projects$ = this.http.get<any[]>(this.gitBaseUrl).pipe(
      map((projects: any) => {
        console.log(projects);
        return projects;
      }),
      // publishReplay(1),
      // refCount(),
      shareReplay({ bufferSize: 1, refCount: true })
      // catchError((error) => captureException(error))
    ) as Observable<any[]>;
  }
}
