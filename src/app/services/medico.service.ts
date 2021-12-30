import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor( private http: HttpClient ) { }
  
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        "x-token": this.token
      }
    }
  }


  cargarMedicos() {
    // localhost:3000/api/Medicos
    // { headers: { 'x-token': this.token }, responseType: 'json' } 
    const url = `${base_url}/medicos`;
    return this.http.get(url, this.headers).pipe(
      map((resp: any) => resp.medicos)
    );
  }

  obtenerMedicoById(id: string) {
    const url = `${base_url}/medicos/${id}`;
    return this.http.get(url, this.headers).pipe(
      map((resp: any) => resp.medico)
    );
  }


  crearMedico(medico: { nombre: string, hospital: string }) {
    // localhost:3000/api/Medicos
    const url = `${base_url}/medicos`;
    return this.http.post(url,medico ,this.headers);
  }


  editarMedico(medico: { _id: string, hospital: string }) {
    // localhost:3000/api/Medicos
    const url = `${base_url}/medicos/${medico._id}`;
    return this.http.put(url, medico,this.headers);
  }

  eliminarMedico(_id: string | undefined ) {
    // localhost:3000/api/Medicos
    const url = `${base_url}/medicos/${_id}`;
    return this.http.delete(url, this.headers);
  }


}
