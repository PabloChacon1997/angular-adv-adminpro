import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';


import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public cargando: boolean = true;
  private imgSubs!: Subscription;

  constructor( private medicoService:MedicoService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService ) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.cargarMedicos());
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe( medicos => {
      this.cargando = false;
      this.medicos = medicos;
    } );
  }
  abrirImagen(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id || '', medico.img);
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.cargarMedicos();
    }

    this.busquedasService.buscar('medicos', termino).subscribe(resultado => {
      this.medicos = resultado;
    })

  }

  borarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Eliminar medico?',
      text: `Esta apunto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar medico'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.eliminarMedico(medico._id)
          .subscribe(
            res => {
              this.cargarMedicos();
              Swal.fire('Medico eliminado', `${medico.nombre} fue elimnado correctamente`, 'success')
            }
          );
      }
    })
  }
}
