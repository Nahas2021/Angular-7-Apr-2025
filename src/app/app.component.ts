import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from './shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // Import HomeComponent here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public api: ApiService,private router: Router) {} // 👈 Make it public so you can access it in the template

  logout1() {
    this.api.logoutUser();
    this.router.navigate(['/login']);
  }

}
