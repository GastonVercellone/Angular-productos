import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando: boolean= true;
  productos: Producto[] = [];
  productosFiltrado:Producto[]=[];

  constructor(private http: HttpClient) {
  
    this.cargarProductos();
    
   }

  private cargarProductos(){

    return new Promise((resolve,reject) =>{
      this.http.get('https://angular-html-c9560.firebaseio.com/productos_idx.json')
      .subscribe((resp:Producto[]) => {
          this.productos = resp;

          
            this.cargando=false;
            resolve();
            
          
      })
    });

      
   }

   obtenerProducto(id:string){

    return this.http.get(`https://angular-html-c9560.firebaseio.com/productos/${id}.json`);


   }

   buscarProducto(termino:string){


   if(this.productos.length===0){
     //cargar productos

     this.cargarProductos().then(()=>{
       //ejecutar despues de tener los productos 
       //aplicar filtros
       this.filtrarProductos(termino);
     });
   }else{
     //aplicar el filtro
     this.filtrarProductos(termino)

   }
  }


   private filtrarProductos(termino:string){

    this.cargando=true;

    this.productosFiltrado=[];

    termino=termino.toLocaleLowerCase();


    this.productos.forEach(prod=>{

    const titulo=prod.titulo.toLocaleLowerCase();
    const categoria=prod.categoria.toLocaleLowerCase();

      if(categoria.indexOf(termino)>=0 || titulo.indexOf(termino)>=0){
        this.productosFiltrado.push(prod);
      }
    });

    this.cargando=false;

  }
}
