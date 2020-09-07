import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoCompleto } from 'src/app/interfaces/productoCompleto.interface';
import { InfoPaginaService } from '../../services/info-pagina.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  id:any;
  producto:ProductoCompleto;

 

  constructor( private router:ActivatedRoute,public productoServicio:ProductosService, public infoService:InfoPaginaService) { }

  ngOnInit() {

    this.router.params.subscribe(resp=>{


      this.id=resp['id']

      this.productoServicio.cargando=true;

      this.productoServicio.obtenerProducto(this.id).subscribe((resp:ProductoCompleto)=>{
        
         this.producto = resp;
         this.productoServicio.cargando = false;
      });
      
      
    }

    
         
    );

    
  }

}
