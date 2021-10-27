import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = '';

  constructor( private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileuploadService: FileUploadService ) {
      this.usuario = this.usuarioService.usuario;
    }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      'nombre' :[this.usuario.nombre, Validators.required],
      'email' :[this.usuario.email, [Validators.required, Validators.email] ],
    })
  }

  cambiarImagen(event: any) {
    this.imagenSubir = event.target.files[0];
    if(!this.imagenSubir){
      this.imgTemp = null;
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.imagenSubir);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe(resp => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });

  }
  subirImagen() {
    this.fileuploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid || '')
      .then(img => {
        this.usuario.img = img;
        Swal.fire('Guardado', 'Imagen cambiada', 'success');
      }).catch(err => Swal.fire('Error', 'No se pudo subir la imagen', 'error'));
  }
}
