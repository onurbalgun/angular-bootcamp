import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CustomerListComponent } from './components/customers/customer-list/customer-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { NotificationInterceptor } from './interceptors/notification.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { CustomerDetailsComponent } from './components/customers/customer-details/customer-details.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { ServicesComponent } from './pages/services/services.component';
import { FilterServicePipe } from './pipes/filter-service.pipe';
import { FilterCustomersPipe } from './pipes/filter-customers.pipe';
import { FilterCorporateCustomersPipe } from './pipes/filter-corporate-customers.pipe';
import { NewCustomerComponent } from './pages/new-customer/new-customer.component';
import { CustomerInfoFormComponent } from './components/new-customer/customer-info-form/customer-info-form.component';
import { CustomerServicesFormComponent } from './components/new-customer/customer-services-form/customer-services-form.component';
import { CustomerOverviewFormComponent } from './components/new-customer/customer-overview-form/customer-overview-form.component';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/app.reducer';
import { AppStoreState } from './store/app.state';
import { CorporateListComponent } from './components/customers/corporate-customers/corporate-list/corporate-list.component';
import { CorporateDetailsComponent } from './components/customers/corporate-customers/corporate-details/corporate-details.component';
import { IndividualListComponent } from './components/customers/individual-customers/individual-list/individual-list.component';
import { IndividualDetailsComponent } from './components/customers/individual-customers/individual-details/individual-details.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CustomerCatalogFormComponent } from './components/new-customer/customer-catalog-form/customer-catalog-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    SidebarComponent,
    HeaderComponent,
    LoadingComponent,
    CustomerListComponent,
    FooterComponent,
    CustomerDetailsComponent,
    CustomersComponent,
    ServicesComponent,
    FilterServicePipe,
    FilterCustomersPipe,
    FilterCorporateCustomersPipe,
    NewCustomerComponent,
    CustomerInfoFormComponent,
    CustomerServicesFormComponent,
    CustomerOverviewFormComponent,
    CorporateListComponent,
    CorporateDetailsComponent,
    IndividualListComponent,
    IndividualDetailsComponent,
    CustomerCatalogFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      progressBar: true,
      preventDuplicates: true,
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
      },
    }),
    StoreModule.forRoot<AppStoreState>(appReducers),
    StoreDevtoolsModule.instrument({
      autoPause: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
