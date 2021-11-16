import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo!: 'usuarios'|'medicos'|'hospitales';
  public id: string = '';
  public img: string='';

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(
    tipo: 'usuarios'|'medicos'|'hospitales',
    id: string,
    img: string='no-img'
  ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    // localhost:3000/api/uploads/medicos/ac73616f-3022-4f72-a828-d1ceb737ad78.jpg
    if (img?.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/uploads/${tipo}/${img}`;
    }
    // this.img = img;
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() { }
}
