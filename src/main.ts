import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routes from './app/routes'; // Ensure you have a routes.ts file

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)] // Provide routing configuration
}).catch(err => console.error(err));
