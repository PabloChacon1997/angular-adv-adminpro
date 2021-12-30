import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';

import { Usuario } from '../../../models/usuario.model';

import Swal from 'sweetalert2';

import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios:number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public uid: string = '';

  public imgSubs: Subscription = new Subscription;

  constructor( private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private modalImagenService:ModalImagenService ) {
      this.uid = this.usuarioService.uid;
    }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(200)
      )
      .subscribe(img => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargando= true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(({total, usuarios}) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if(this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }


  buscar(termino: string) {

    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedasService.buscar('usuarios', termino).subscribe(resultado => {
      this.usuarios = resultado as Usuario[];
    })

  }

  eliminarUsuario(usuario: Usuario) {
    Swal.fire({
      title: '¿Eliminar usuario?',
      text: `Esta apunto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar usuario'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario)
          .subscribe(
            res => {
              this.cargarUsuarios();
              Swal.fire('Usuario eliminado', `${usuario.nombre} fue elimnado correctamente`, 'success')
            }
          );
      }
    })
  }

  cambiarRole(usuario: Usuario) {
    this.usuarioService.guardarUsuario(usuario)
      .subscribe(resp => console.log(resp));
  }

  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios',usuario.uid || '',usuario.img);
  }
}
