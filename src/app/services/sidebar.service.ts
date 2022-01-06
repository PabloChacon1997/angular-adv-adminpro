import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [];

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu') || '') || [];
  }

  // menu: any[] = [
  //   {
  //     titulo: 'Dashboard',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Main', path: '' },
  //       { titulo: 'ProgressBar', path: 'progress' },
  //       { titulo: 'Grafica', path: 'grafica1' },
  //       { titulo: 'Promesas', path: 'promesas' },
  //       { titulo: 'RXJS', path: 'rxjs' },
  //     ],
  //   },
  //   {
  //     titulo: 'Mantenimiento',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', path: 'usuarios' },
  //       { titulo: 'Hospitales', path: 'hospitales' },
  //       { titulo: 'Medicos', path: 'medicos' },
  //     ],
  //   },
  // ];

}
