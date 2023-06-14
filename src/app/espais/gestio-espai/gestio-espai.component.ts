import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { ResponseMessage } from 'src/app/interfaces/response-message';
import { Espai } from 'src/app/model/espai.model';
import { DataService } from 'src/services/data-service.service';

@Component({
  selector: 'app-gestio-espai',
  templateUrl: './gestio-espai.component.html',
  styleUrls: ['./gestio-espai.component.css']
})
export class GestioEspaiComponent implements OnInit {

  protected form!: FormGroup;
  protected espai! : Espai | undefined;
  protected disabledForm : boolean = true;
  protected disabled!: any;
  protected errorMessage: any;
  protected successMessage: any;
  protected eliminarShow: boolean = false;
  faLock = faLock;

  constructor(private dataService:DataService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router){

  }

  ngOnInit(): void {
    this.form = this.createForm();
    this.dataService.getEspai(this.route.snapshot.params['id']).subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.espai = new Espai(resposta.data.nom, resposta.data.id);
      }
    })
  }

  public get nom(){
    return this.form.get('nom');
  }

  public createForm(){
    return this.formBuilder.group( {
        nom: [null,[]]
      }
    );
  }

  public enableForm(){
    this.disabledForm = !this.disabledForm;
    if (this.disabledForm) {
      this.faLock = faLock;
    } else {
      this.faLock = faLockOpen;
    }
    
  }

  public editarEspai(){
    if (!this.disabledForm) {
      let newEspai = this.espai;
      let values = this.form.value;
      newEspai!.setNom = values['nom'] ?? this.espai?.getNom;

      this.dataService.updateEspai(newEspai).subscribe({ next : response => {
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

  public eliminarEspai(){
    let del = prompt("Estàs segur de que vols eliminar aquest espai? Si n'estàs segur, escriu en majúscules: ESBORRAR");

    if(del === "ESBORRAR"){
      this.dataService.deleteEspai(this.espai).subscribe({ next : response => {
        let resposta = response as ResponseMessage;
        if (resposta.success) {
          alert(resposta.message);
          this.router.navigate(['/espais']);
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
