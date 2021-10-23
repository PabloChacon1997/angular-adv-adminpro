import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';


const base_url = environment.base_url;

declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2:any;

  constructor( private http: HttpClient,
    private router: Router,
    private ngZone: NgZone ) {
      this.googleInit();
    }

  googleInit() {

    return new Promise<void>((resolve) => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '945005853662-u0sufis0prgeum1ka13o1rhl1ftj7qgf.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }
  
  logOut() {
    localStorage.removeItem('token');
    
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl("/login");
      })
    });
  }


  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        "x-token": token
      }
    }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      }),
      map( resp => true),
      catchError(err => of(false))
    );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    )
  }

  login( formData: LoginForm ) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    )
  }

  loginGoogle( token: string ) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    )
  }
}
