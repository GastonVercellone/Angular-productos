import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: any[] = [];



  constructor(private http:HttpClient) { 
    
    this.cargarDatos();
    this.cargarEquipo();
    
  }

  cargarDatos(){
    this.http.get('assets/data/data-paginas.json')
              .subscribe((resp:InfoPagina) => {

                this.cargada = true;
                this.info = resp;
    });
  }


   cargarEquipo(){
    
    this.http.get('https://angular-html-c9560.firebaseio.com/equipo.json')
              .subscribe((resp:any) => {

                this.equipo = resp;
    });
  }
}
