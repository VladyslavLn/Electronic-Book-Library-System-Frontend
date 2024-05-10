import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {HttpClientModule, provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {MdbFormsModule} from "mdb-angular-ui-kit/forms";
import {MdbRippleModule} from "mdb-angular-ui-kit/ripple";
import {MdbAccordionModule} from 'mdb-angular-ui-kit/accordion';
import {MdbCarouselModule} from 'mdb-angular-ui-kit/carousel';
import {MdbCheckboxModule} from 'mdb-angular-ui-kit/checkbox';
import {MdbCollapseModule} from 'mdb-angular-ui-kit/collapse';
import {MdbDropdownModule} from 'mdb-angular-ui-kit/dropdown';
import {MdbModalModule} from 'mdb-angular-ui-kit/modal';
import {MdbPopoverModule} from 'mdb-angular-ui-kit/popover';
import {MdbRadioModule} from 'mdb-angular-ui-kit/radio';
import {MdbRangeModule} from 'mdb-angular-ui-kit/range';
import {MdbScrollspyModule} from 'mdb-angular-ui-kit/scrollspy';
import {MdbTabsModule} from 'mdb-angular-ui-kit/tabs';
import {MdbTooltipModule} from 'mdb-angular-ui-kit/tooltip';
import {MdbValidationModule} from 'mdb-angular-ui-kit/validation';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from './components/home/home.component';
import {authInterceptor} from "./service/auth.interceptor";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {CanActivateRoute} from "./guards/auth.guard";
import { BookComponent } from './components/book/book.component';
import { CreateBookComponent } from './components/create-book/create-book.component';
import {MatButton} from "@angular/material/button";
import {MatDialogTitle} from "@angular/material/dialog";
import { UserListComponent } from './components/user-list/user-list.component';
import {MatIcon} from "@angular/material/icon";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader, MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    BookComponent,
    CreateBookComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MdbFormsModule,
    MdbRippleModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTable,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatCellDef,
    MatPaginator,
    FormsModule,
    MatButton,
    MatDialogTitle,
    MatCardActions,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatIcon,
    MatCardImage
  ],
  providers: [
    CanActivateRoute,
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
