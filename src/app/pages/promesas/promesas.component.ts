import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then(usuarios => console.log(usuarios));
    // const promesa = new Promise( (resolve, reject) => {
    //   resolve('Hola Mundo');
    // });

    // promesa.then( resp => {
    //   console.log('Hey Termine: ', resp);
    // });
  }

  getUsuarios() {
    return new Promise( (res)=> {
      
      fetch('https://reqres.in/api/users?page=2')
        .then(resp => resp.json() )
        .then( data => res(data.data) );
    });

  }

}
