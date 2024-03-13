import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth/auth.guard';



export const routes: Routes = [
    
    // SE PONE EL GUARD A LA RUTA QUE HAY QUE PROTEGER
    { path: '', component: HomeComponent, canActivate: [authGuard] },

    { path: 'login', component: LoginComponent },
];
