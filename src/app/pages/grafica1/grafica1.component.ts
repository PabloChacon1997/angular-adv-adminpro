import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {
    
  public title = "Ventas";
  public labels1: string[] = ['Pan', 'Refresco', 'Pan'];
  public labels2: string[] = ['Ajo', 'Pirultea', 'Mazapan'];
  public labels3: string[] = ['Harina', 'Pescado', 'Carne'];
  public labels4: string[] = ['Res', 'Marisco', 'Agua'];
  
  public data1 = [
    [35, 40, 10],
  ];
  public data2 = [
    [5, 30, 60],
  ];
  public data3 = [
    [3, 10, 40],
  ];
  public data4 = [
    [65, 42, 18],
  ];
  
}
