import { Component, OnInit } from '@angular/core';
import { ResponseMessage } from 'src/app/interfaces/response-message';
import { DataService } from 'src/services/data-service.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-usuaris',
  templateUrl: './usuaris.component.html',
  styleUrls: ['./usuaris.component.css']
})
export class UsuarisComponent implements OnInit{

  protected users : string[] = [];
  protected admins : string[] = [];
  protected newUser! : string;
  protected newAdmin! : string;
  protected adminError!: string;
  protected userError!: string;
  protected deleteError!: string;
  faTrash = faTrash;

  constructor(private dataService: DataService){

  }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.users = resposta.data.users;
        this.admins = resposta.data.admins;        
      }
    });
  }

  public enviarAdmin(){
    if (this.newAdmin.match("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")) {
      if (this.newAdmin.split('@')[1] === 'sapalomera.cat') {
        this.dataService.addAdmin(this.newAdmin).subscribe(response => {
          this.newAdmin = '';
          this.ngOnInit();
        });
      } else {
        this.adminError = "No és un correu del Sa Palomera.";
      }
    } else {
      this.adminError = "No és un correu electrònic.";
    }
  }

  public enviarUser(){
    if (this.newUser.match("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")) {
      if (this.newUser.split('@')[1] === 'sapalomera.cat') {
        this.dataService.addUser(this.newUser).subscribe(response => {
          this.newUser = '';
          this.ngOnInit();
        });
      } else {
        this.userError = "No és un correu del Sa Palomera.";
      }
    } else {
      this.userError = "No és un correu electrònic.";
    }
  }

  public eliminarUsuari(user: string){
    this.dataService.deleteUser(user).subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.ngOnInit();      
      } else {
        this.deleteError = resposta.message;
      }
    });
  }
}
