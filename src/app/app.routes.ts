import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { ShopComponent } from './Pages/shop/shop.component';
import { LocationsComponent } from './Pages/locations/locations.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { AboutItComponent } from './Pages/about-it/about-it.component';
import { AuthenticationComponent } from './Pages/authentication/authentication.component';
import { GestionComponent } from './Pages/gestion/gestion.component';
import { GestionUComponent } from './Pages/gestion-u/gestion-u.component';
import { DetalleLibroComponent } from './Pages/detalle-libro/detalle-libro.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect to home component
    { path: 'home', component: HomeComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'locations', component: LocationsComponent },
    { path: 'aboutIt', component: AboutItComponent },
    { path: 'login', component: AuthenticationComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'gestion', component: GestionComponent },
    { path: 'gestion-u', component: GestionUComponent },
    { path: 'detalle-libro/:titulo', component: DetalleLibroComponent }
];


