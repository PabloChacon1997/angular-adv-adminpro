import { environment } from '../../environments/environment';

const base_url = environment.base_url

export class Usuario {
  constructor(
    public nombre: string ,
    public email: string,
    public password?: string,
    public img?: string,
    public role?: string,
    public google?: string,
    public uid?: string,
  ) {}


  get imagenUrl() {
    // /uploads/usuarios/ac73616f-3022-4f72-a828-d1ceb737ad78.jpg
    if (this.img?.includes('https')) {
      return this.img;
    }
    if (this.img) {
      return `${base_url}/uploads/usuarios/${this.img}`;
    } else {
      return `${base_url}/uploads/usuarios/no-image`;
    }
  }
}