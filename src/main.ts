import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import './environments/env.js';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
