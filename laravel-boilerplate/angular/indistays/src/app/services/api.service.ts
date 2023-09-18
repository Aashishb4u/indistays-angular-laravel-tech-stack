import { Injectable } from '@angular/core';
import {BehaviorSubject, from} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {StorageService} from "./storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {appConstants} from "../../assets/constants/app-constants";
import {tap} from "rxjs";
import {of, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL: string = appConstants.baseURLAdminAPIs;
  baseAuthUrl: string = appConstants.baseAuthUrl;
  currentAccessToken: any = null;
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  onLoadToken = new BehaviorSubject<any>('');
  constructor(private router: Router, private http: HttpClient, public storageService: StorageService, public snackBar: MatSnackBar) {
    this.loadToken();
  }

  loadToken() {
    const token = this.storageService.getStorageValue(appConstants.ACCESS_TOKEN_KEY);
    if (token) {
      this.currentAccessToken = token;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  getNewAccessToken() {
    const refreshToken = from(this.storageService.getStoredValue(appConstants.REFRESH_TOKEN_KEY));
    return refreshToken.pipe(
      switchMap(token => {
        if (token) {
          const resBody = {
            refreshToken: token
          };
          return this.http.get(`${this.baseAuthUrl}refresh-tokens`);
        } else {
          // No stored refresh token
          return of(null);
        }
      })
    );
  }

  // Store a new access token
  storeAccessToken(accessToken: any) {
    this.currentAccessToken = accessToken;
    return from(this.storageService.storeValue(appConstants.ACCESS_TOKEN_KEY, accessToken));
  }

  get userDetails() {
    const userData = this.storageService.getEncryptedStorageValue(appConstants.USER_INFO);
    return userData;
  }

  get userRole() {
    const userData = this.storageService.getEncryptedStorageValue(appConstants.USER_INFO);
    return userData && userData.role ? userData.role.name : '';
  }

  get userId() {
    const userData = this.storageService.getEncryptedStorageValue(appConstants.USER_INFO);
    return userData && userData.id ? userData.id : '';
  }

  get userName() {
    const userData = this.storageService.getEncryptedStorageValue(appConstants.USER_INFO);
    return userData && userData.name ? userData.name : '';
  }

  get userEmail() {
    const userData = this.storageService.getEncryptedStorageValue(appConstants.USER_INFO);
    return userData && userData.email ? userData.email : '';
  }

  login(data: any) {
    return this.http.post(`${this.baseAuthUrl}login`, data, {}).pipe(
      tap((response: any) => {
        if (response.tokens && response.user) {
          this.storageService.storeEncryptedValue(appConstants.USER_INFO, response!.user);
          this.storageService.storeValue(appConstants.ACCESS_TOKEN_KEY, response.tokens.access.token);
          this.storageService.storeValue(appConstants.REFRESH_TOKEN_KEY, response.tokens.refresh.token);
          this.loadToken();
          this.isAuthenticated.next(true);
        }
      })
    );
  }

  logout() {
    return this.http.post(`${this.baseAuthUrl}logout`, {}, {}).pipe(
      tap((response: any) => {
        this.isAuthenticated.next(false);
        this.storageService.removeStoredItem(appConstants.REFRESH_TOKEN_KEY);
        this.storageService.removeStoredItem(appConstants.ACCESS_TOKEN_KEY);
        this.storageService.removeStoredItem(appConstants.USER_INFO);
      })
    );
  }

  changePassword(data) {
    return this.http.post(`${this.baseAuthUrl}reset-password`, data, {});
  }

  // Users Apis -

  getRoles() {
    return this.http.get(`${this.baseURL}roles`, {});
  }

  getUsers(params) {
    return this.http.get(`${this.baseURL}users`, {params});
  }

  getUserById(data) {
    return this.http.post(`${this.baseURL}users/all`, data, {});
  }

  addUser(data) {
    return this.http.post(`${this.baseURL}users`, data, {});
  }

  updateUserById(data, id) {
    return this.http.put(`${this.baseURL}users/${id}`, data, {});
  }

  deleteUser(id) {
    return this.http.delete(`${this.baseURL}users/${id}`, {});
  }

  addDestination(data) {
    return this.http.post(`${this.baseURL}destinations`, data, {});
  }

  updateDestinationById(data, id) {
    return this.http.post(`${this.baseURL}destinations/edit/${id}`, data, {});
  }

  getDestinationById(data) {
    return this.http.post(`${this.baseURL}destinations/all`, data, {});
  }

  getDestinations(params = {}) {
    return this.http.get(`${this.baseURL}destinations`, {params});
  }

  getAllDestinations(params = {}) {
    return this.http.post(`${this.baseURL}destinations/all`, {params});
  }

  deleteDestination(id) {
    return this.http.delete(`${this.baseURL}destinations/${id}`, {});
  }

  addCamping(data) {
    return this.http.post(`${this.baseURL}campings`, data, {});
  }

  updateCampingById(data, id) {
    return this.http.post(`${this.baseURL}campings/edit/${id}`, data, {});
  }

  getCampingById(data) {
    return this.http.post(`${this.baseURL}campings/all`, data, {});
  }

  getCampings(params) {
    return this.http.get(`${this.baseURL}campings`, {params});
  }

  deleteCamping(id) {
    return this.http.delete(`${this.baseURL}campings/${id}`, {});
  }

  addAccommodation(data) {
    return this.http.post(`${this.baseURL}accommodations`, data, {});
  }

  getAccommodations(params) {
    return this.http.get(`${this.baseURL}accommodations/all`, {params});
  }

  getAllAmenities(params = {}) {
    return this.http.post(`${this.baseURL}amenities/all`, {params});
  }

  commonError(err: any) {
    const errCode = err.status;
    if (err && err.error && err.error.message) {
      this.showToast(err.error.message);
    } else if (err && err.message) {
      this.showToast(err.message);
    }

    switch (errCode) {
      case 401: {
        this.logout().subscribe((res) => {
          this.showToast('Logged out due to authentication mismatch');
          this.router.navigate(['/login']);
        });
        break;
      }

      case 400: {
        this.showToast('Bad Request');
        break;
      }

      case 403: {
        console.log('here');
        // this.logout().subscribe((res) => {
        //     this.showToast('Logged out due to authentication mismatch');
        //     this.router.navigate(['/login']);
        // });
        break;
      }

      case 0: {
        let errorMessage = err.error.message;
        errorMessage = 'No Internet Connection';
        break;
      }
    }
  }

  showToast(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

}
