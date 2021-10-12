import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  constructor() {
    

    this.retornaObservable().pipe(
      retry()
    ).subscribe(
      valor => console.log('subs: ', valor),
      err => console.warn('error: ', err),
      () => console.log('obs terminado')
    );
  }


  retornaObservable(): Observable<number> {
    const obs$ = new Observable<number>(observer => {
      let i = 0;
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
      },1000);
    });

    return obs$;
  }

  ngOnInit(): void {
  }

}
