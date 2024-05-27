import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

const firebase_config = {
  "projectId":
    "libreria-ande",
    "appId":"1:339371748612:web:66f8138118ebdb4a44f451",
    "storageBucket":"libreria-ande.appspot.com",
    "apiKey":"AIzaSyBxpyC1sd-xf4FaDdG14NOtOGLdn0hwFUU",
    "authDomain":"libreria-ande.firebaseapp.com",
    "messagingSenderId":"339371748612"
  }

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebase_config)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),]
};
