import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient ) {}

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

  private tranformarUsuarios(resultados: any[]): Usuario[] {    
    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.role, user.google, user.uid)
    );
  }
  private tranformarHospitales(resultados: any[]): Hospital[] {    
    return resultados;
  }

  private tranformarMedicos(resultados: any[]): Medico[] {    
    return resultados;
  }
  

  busquedaGlobal(termino: string) {
    const url = `${base_url}/todo/${termino}`;
    return this.http.get<any[]>(url,this.headers)
  }

  buscar(
    tipo: 'usuarios'|'medicos'|'hospitales',
    termino: string
  ) {
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url,this.headers).pipe(
      map((resp:any) => {
        switch (tipo) {
          case "usuarios":
            return this.tranformarUsuarios(resp.resultado);
          case "hospitales":
            return this.tranformarHospitales(resp.resultado);
          case "medicos":
            return this.tranformarMedicos(resp.resultado);
          default:
            return [];
        }
      })
    );
  }
}
