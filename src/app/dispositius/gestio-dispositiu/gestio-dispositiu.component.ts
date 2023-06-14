import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { ResponseMessage } from 'src/app/interfaces/response-message';
import { Dispositiu } from 'src/app/model/dispositiu.model';
import { DataService } from 'src/services/data-service.service';

@Component({
  selector: 'app-gestio-dispositiu',
  templateUrl: './gestio-dispositiu.component.html',
  styleUrls: ['./gestio-dispositiu.component.css']
})
export class GestioDispositiuComponent implements OnInit {

  protected form!: FormGroup;
  protected dispositiu! : Dispositiu | undefined;
  protected disabledForm : boolean = true;
  protected disabled!: any;
  protected arrTipus: any[] = [];
  protected arrEstat: any[] = [];
  protected selectTipus: string[] = [];
  protected selectEstat: string[] = [];
  protected errorMessage: any;
  protected successMessage: any;
  protected eliminarShow: boolean = false;
  faLock = faLock;

  constructor(private dataService:DataService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router){

  }

  ngOnInit(): void {
    this.form = this.createForm();
    this.dataService.getDispositiu(this.route.snapshot.params['id']).subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.dispositiu = new Dispositiu(resposta.data.nom, resposta.data.tipus, resposta.data.estat, resposta.data.id);
        this.arrEstat = [resposta.data.estat];
        this.arrTipus = [resposta.data.tipus];
        this.tipus?.setValue(this.dispositiu?.getTipus);
        this.estat?.setValue(this.dispositiu?.getEstat);
        this.populateSelectEstat();
        this.populateSelectTipus();
      }
    })
  }

  public get nom(){
    return this.form.get('nom');
  }
  public get tipus(){
    return this.form.get('tipus');
  }
  public get estat(){
    return this.form.get('estat');
  }

  public createForm(){
    return this.formBuilder.group( {
        nom: [null,[]],
        tipus: [null,[]],
        estat: [null,[]]
      }
    );
  }

  public enableForm(){
    this.disabledForm = !this.disabledForm;
    if (this.disabledForm) {
      this.faLock = faLock;
      this.arrEstat = [this.dispositiu?.getEstat];
      this.arrTipus = [this.dispositiu?.getTipus];
      this.tipus?.setValue(this.dispositiu?.getTipus);
      this.estat?.setValue(this.dispositiu?.getEstat);
    } else {
      this.faLock = faLockOpen;
      this.arrEstat = this.selectEstat;
      this.arrTipus = this.selectTipus;
      this.tipus?.setValue(this.dispositiu?.getTipus);
      this.estat?.setValue(this.dispositiu?.getEstat);
    }
  }

  public populateSelectTipus(){
    this.dataService.infoTipusDispositiu().subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.selectTipus = resposta.data.tipus;
      }
    });
  }

  public populateSelectEstat(){
    this.dataService.infoEstatDispositiu().subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.selectEstat = resposta.data.estat;
      }
    });
  }

  public editarDispositiu(){
    if (!this.disabledForm) {
      let newDispositiu = this.dispositiu;
      let values = this.form.value;
      newDispositiu!.setNom = values['nom'] ?? this.dispositiu?.getNom;
      newDispositiu!.setTipus = values['tipus'] ?? this.dispositiu?.getTipus;
      newDispositiu!.setEstat = values['estat'] ?? this.dispositiu?.getEstat;
      newDispositiu!.setId = this.dispositiu!.getId;

      this.dataService.updateDispositiu(newDispositiu).subscribe({ next : response => {
        let resposta = response as ResponseMessage;
        if (resposta.success) {
          this.successMessage = resposta.message;
          this.errorMessage = '';
        } else {
          this.errorMessage = resposta.message;
          this.successMessage = '';
        }
        
      }, error : (err) => {
        this.errorMessage = (err.message);
        this.successMessage = '';
      }});
    }
  }

  public showEliminar(){
    this.eliminarShow = !this.eliminarShow;
  }

  public eliminarDispositiu(){
    let del = prompt("Estàs segur de que vols eliminar aquest dispositiu? Si n'estàs segur, escriu en majúscules: ESBORRAR");

    if(del === "ESBORRAR"){
      this.dataService.deleteDispositiu(this.dispositiu).subscribe({ next : response => {
        let resposta = response as ResponseMessage;
        if (resposta.success) {
          alert(resposta.message);
          this.router.navigate(['/dispositius']);
        } else {
          this.errorMessage = resposta.message;
          this.successMessage = '';
        }
        
      }, error : (err) => {
        this.errorMessage = (err.message);
        this.successMessage = '';
      }});
    }
  }
}
