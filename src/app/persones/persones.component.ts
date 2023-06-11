import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data-service.service';
import { ResponseMessage } from '../interfaces/response-message';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-persones',
  templateUrl: './persones.component.html',
  styleUrls: ['./persones.component.css']
})
export class PersonesComponent implements OnInit{

  // icones
  faPlus = faPlus;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  protected llistaPersones: any[] = [];
  protected buscaPersona: string = '';
  protected numPerPagina!: number;
  protected numPerPaginaCtrl!: number;
  protected defaultNumPerPagina: number = 15;
  protected numPagina!: number;
  protected maxPagines!: number;
  protected navPagines: any[] = [];

  constructor(private dataService: DataService){
  
  }

  ngOnInit(): void {
    this.numPagina = 1;
    this.numPerPagina = this.defaultNumPerPagina;
    this.maxPaginesCalc();
    this.loadTaula();
  }

  public maxPaginesCalc(){
    this.dataService.numeroPagines(this.numPerPagina, this.buscaPersona).subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.maxPagines = resposta.data;
        
        if (this.maxPagines <= 5) {
          this.navPagines = [];
          for (let index = 0; index < this.maxPagines; index++) {
            this.navPagines.push(index + 1);
          }
        } else if(this.numPagina < 4) {
          this.navPagines = [
            1, 2, 3, 4, 5
          ];
        } else if(this.numPagina <= this.maxPagines - 2){
          this.navPagines = [
            this.numPagina - 2,
            this.numPagina - 1,
            this.numPagina, 
            this.numPagina + 1,
            this.numPagina + 2
          ];
        }
      }
    });
  }

  public loadTaula(){
    if (this.buscaPersona) {
      this.buscarPersona();
    } else { 
      this.dataService.readPersones(this.numPagina, this.numPerPagina).subscribe(response => {
        let resposta = response as ResponseMessage;
        if (resposta.success) {
          this.llistaPersones = resposta.data;
        }
      });
    }    
  }

  public buscarPersona(){
    this.maxPaginesCalc();
    this.dataService.buscarPersones(this.buscaPersona, this.numPagina, this.numPerPagina).subscribe(response => {      
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.llistaPersones = resposta.data;
      }
    });    
  }

  public filesPerPagina(){
    if (this.numPerPaginaCtrl > 0) {
      this.numPerPagina = this.numPerPaginaCtrl;
    } else {
      this.numPerPagina = 15;
    }
    this.maxPaginesCalc();
    this.loadTaula();
  }

  public canviarPagina(pagina: number){
    this.numPagina = pagina;
    if (pagina > 3 && pagina <= this.maxPagines - 2) {
      this.navPagines = [
        pagina - 2,
        pagina - 1,
        pagina, 
        pagina + 1,
        pagina + 2
      ]
    } else if (pagina > 3 && pagina <= this.maxPagines - 1) {
      this.navPagines = [
        pagina - 3,
        pagina - 2,
        pagina - 1, 
        pagina,
        pagina + 1
      ]
    }
    this.loadTaula();
  }

  public paginaAnterior(){
    this.numPagina = this.numPagina - 1;
    if (this.numPagina >= 3 && this.numPagina <= this.maxPagines - 2) {
      this.navPagines = [
        this.numPagina - 2,
        this.numPagina - 1,
        this.numPagina, 
        this.numPagina + 1,
        this.numPagina + 2
      ];
    }
    this.loadTaula();
  }

  public paginaSeguent(){
    this.numPagina = this.numPagina + 1;
    if (this.numPagina > 3 && this.numPagina <= this.maxPagines - 2) {
      this.navPagines = [
        this.numPagina - 2,
        this.numPagina - 1,
        this.numPagina, 
        this.numPagina + 1,
        this.numPagina + 2
      ];
    }
    this.loadTaula();    
  }

  public primeraPagina(){
    this.numPagina = 1;
    this.navPagines = [
      1,2,3,4,5
    ];
    this.loadTaula();
  }

  public ultimaPagina(){
    this.numPagina = this.maxPagines;
    if (this.navPagines.length > 5) {
      this.navPagines = [
        this.maxPagines - 4,
        this.maxPagines - 3,
        this.maxPagines - 2,
        this.maxPagines - 1,
        this.maxPagines,
      ];
    }
    this.loadTaula();
  }

}
