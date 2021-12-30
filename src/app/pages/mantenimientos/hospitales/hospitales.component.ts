import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';


import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospiatles: Hospital[] = [];
  public hospiatlesTemp: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs!: Subscription;

  constructor( private hospitalService: HospitalService,
    private busquedasService: BusquedasService,
    private modalImagenService:ModalImagenService ) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => {
        this.cargando = false;
        this.hospiatles = hospitales;
        this.hospiatlesTemp = hospitales;
      });
  }

  guardarCambios(hospital: Hospital) {
    console.log(hospital);
    this.hospitalService.editarHospital(hospital._id , hospital.nombre)
      .subscribe(resp=> {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }

  eliminarHospital(hospital: Hospital) {
    this.hospitalService.eliminarHospital(hospital._id)
    .subscribe(resp=> {
      this.cargarHospitales();
      Swal.fire('Borrado', hospital.nombre, 'success');
    });
  }

  async abrirModal() {
    const { value='' } = await Swal.fire<string>({
      title: 'Crear hospital',
      input: 'text',
      inputLabel: 'Ingrese el nombre del nuevo hospital',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    })
    
    if (value?.length>0) {
      console.log(value);
      this.hospitalService.crearHospital(value)
        .subscribe((resp:any)=> {
          this.hospiatles.push(resp.hospital);
        })
    }
  }

  abrirImagen(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id || '', hospital.img);
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.hospiatles = this.hospiatlesTemp;
    }

    this.busquedasService.buscar('hospitales', termino).subscribe(resultado => {
      this.hospiatles = resultado;
    })

  }

}
