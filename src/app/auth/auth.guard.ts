import { Injectable, inject } from "@angular/core";
import { CanActivate, CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";




// export const authGuard: CanActivateFn = (route, state) => {

//     let authService = inject(AuthService);
//     let routerService = inject(Router);

//     // SINO ESTA LOGUEADO LO MANDA A /LOGIN
//     if (!authService.isLoggedIn()) {
//         routerService.navigate(['/login']);

//         return false;
//     }
//     console.warn(route, state);
//     return true;
// };


