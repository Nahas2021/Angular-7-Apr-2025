import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routes from './app/routes'; // Ensure you have a routes.ts file
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes),  provideHttpClient()        // ✅ Provides HttpClient for the whole app
     ] // Provide routing configuration
}).catch(err => console.error(err));
