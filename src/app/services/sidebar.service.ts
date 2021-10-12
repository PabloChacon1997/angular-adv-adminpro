import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        {
          titulo: 'Main',
          path: ''
        },
        {
          titulo: 'ProgressBar',
          path: 'progress'
        },
        {
          titulo: 'Grafica',
          path: 'grafica1'
        },
        {
          titulo: 'Promesas',
          path: 'promesas'
        },
        {
          titulo: 'RXJS',
          path: 'rxjs'
        },
      ],
    }
  ];

  constructor() { }
}
