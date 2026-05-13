import { Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';


export const routes: Routes = [
     { path: '', component: RegistrationComponent },
     { path: 'users', component: UserListComponent }
];
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}
