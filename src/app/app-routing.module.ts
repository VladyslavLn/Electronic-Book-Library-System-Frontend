import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./guards/auth.guard";
import {BookComponent} from "./components/book/book.component";
import {CreateBookComponent} from "./components/create-book/create-book.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {UserComponent} from "./components/user/user.component";

const routeConfig: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Books',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
  },
  {
    "path": 'book/create',
    component: CreateBookComponent,
    title: 'Create Book',
    canActivate: [AuthGuard]
  },
  {
    path: 'book/:id',
    component: BookComponent,
    title: 'Book',
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UserListComponent,
    title: 'Users',
    canActivate: [AuthGuard]
  },
  {
    path: 'user/:id',
    component: UserComponent,
    title: 'User info',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routeConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
