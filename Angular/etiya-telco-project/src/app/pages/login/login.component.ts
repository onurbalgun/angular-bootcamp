import { faEye, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LocalstorageService } from './../../services/localstorage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Subscription } from 'rxjs';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  loginForm!: FormGroup;
  isLoading: boolean = false;
  isUserValid: boolean = true;
  validUserName: string = '';
  subscription!: Subscription;
  passwordIcon: IconDefinition = faEye;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router,
    private loadingService: LoadingService,
    private toastr: ToastrService,
    private customersService: CustomersService
  ) {}

  ngOnInit(): void {
    //* LOGIN FORMUNU OLUSTURMA FONKSIYONUNU CAGIR VE LOADING GOZLEMLE.
    this.createLoginForm();
    this.subscribeToLoading();
    this.customersService.deleteCustomerToRegisterModelStoreState();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    //* LOGIN FORMDAN GELEN VERILERI SERVISE YOLLA.
    //* RESPONSE OLUMLU ISE LOCALSTOREGE DA TOKEN OLUSTUR VE TOKEN KEYI EKLE.
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.isUserValid = true;
        this.localstorageService.setItem('token', res['access_token']);
        this.authService.decodeToken(res['access_token']);
        this.validUserName = this.loginForm.get('userName')?.value;
        this.clearFormFields();
      },
      error: () => {
        this.isUserValid = false;
      },
    });
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', Validators.required],
    });
  }

  subscribeToLoading() {
    //* LOADING SERVICE GOZLEMLE EGER LOADING TAMAMLANMIS VE USER VALID ISE
    //* HOMEPAGE'E YONLENDIR.
    //* LOADING TAMAMLANMIS AMA USER INVALID ISE TOASTR ILE HATA GOSTER.
    this.subscription = this.loadingService.isLoadingSubject.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
        if (!this.isLoading && this.isUserValid) {
          this.toastr.success(`Welcome ${this.validUserName}`);
          this.router.navigateByUrl('homepage');
        } else if (!this.isLoading && !this.isUserValid) {
          this.toastr.error('Login failed.');
        }
      }
    );
  }

  clearFormFields() {
    this.loginForm.reset();
  }

  onEye() {
    if (this.passwordInput.nativeElement.type === 'password') {
      this.passwordInput.nativeElement.type = 'text';
    } else {
      this.passwordInput.nativeElement.type = 'password';
    }
  }
}
