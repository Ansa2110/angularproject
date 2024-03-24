import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './store/login.effects';
import { provideStore } from '@ngrx/store';
import { loginReducer } from './store/login.reducer';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { registerReducer } from './store/register.reducer';
import { suggestedEventReducer } from './store/suggestedevent.reducer';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideEffects(AuthEffects), provideStore({login: loginReducer, register: registerReducer, addSuggestedEvent: suggestedEventReducer}), provideHttpClient(withFetch())]
};
