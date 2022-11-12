import { Observable, Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';
import { LoginDto } from '../models/loginDto';
import { LoginResponseModel } from '../models/loginResponseModel';
import { ResponseModel } from '../models/responseModel';
import { environment } from 'src/environments/environment';
import { TokenUserModel } from '../models/tokenUserModel';
import { AppStoreState } from '../store/app.state';
import { Store } from '@ngrx/store';
import {
  deleteTokenUserModel,
  setTokenUserModel,
} from '../store/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private controllerUrl = `${environment.apiUrl}/auth`;
  // private, protected, public(default)
  onLogin = new Subject<string>();
  tokenUserModel$: Observable<TokenUserModel | null>;
  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService,
    private jwtHelperService: JwtHelperService,
    private store: Store<AppStoreState>
  ) {
    this.tokenUserModel$ = this.store.select(
      (state) => state.auth.tokenUserModel
    );
  }

  login(loginDto: LoginDto): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(
      `${this.controllerUrl}/login`,
      loginDto
    );
  }
  saveToken(loginResponseModel: LoginResponseModel) {
    this.localStorage.set('token', loginResponseModel.access_token);
    const tokenUserModel = this.tokenUserModel;
    if (tokenUserModel) this.setTokenUserModelStoreState(tokenUserModel);
  }

  logout() {
    this.localStorage.remove('token');
    this.deleteTokenUserModelStoreState();
  }

  get isAuthenticated(): boolean {
    // varsa süresi geçmişse yine false
    let token = this.localStorage.get('token');
    if (!token) return false;
    if (this.jwtHelperService.isTokenExpired()) return false;
    return true;
  }

  get jwtToken(): string | null {
    return this.localStorage.get('token');
  }
  get tokenUserModel(): TokenUserModel | null {
    const token = this.jwtToken;
    if (!token) return null;
    if (this.jwtHelperService.isTokenExpired()) return null;
    return this.jwtHelperService.decodeToken(token) as TokenUserModel;
  }

  emitOnLoginEvent(eventValue: string) {
    this.onLogin.next(eventValue);
    // this.onLogin.error(new Error("Bir hata oluştu"));
    // this.onLogin.complete();
  }
  setTokenUserModelStoreState(tokenUserModel: TokenUserModel) {
    this.store.dispatch(setTokenUserModel({ tokenUserModel }));
  }
  deleteTokenUserModelStoreState() {
    this.store.dispatch(deleteTokenUserModel());
  }
}
