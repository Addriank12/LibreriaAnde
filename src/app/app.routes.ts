import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { ShopComponent } from './Pages/shop/shop.component';
import { LocationsComponent } from './Pages/locations/locations.component';
import { AboutItComponent } from './Pages/about-it/about-it.component';
import { LoginComponent } from './Pages/login/login.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect to home component
    { path: 'home', component: HomeComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'locations', component: LocationsComponent },
    { path: 'aboutIt', component: AboutItComponent },
    { path: 'login', component: LoginComponent }
];


