import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // Import HomeComponent here
  template: `
    <nav>
      <a routerLink="/">Home</a> |
      <a routerLink="/about">About</a> |
      <a [routerLink]="['/contact', 'JohnDoe']">Contact (JohnDoe)</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
