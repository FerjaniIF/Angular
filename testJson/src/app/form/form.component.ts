import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import { EtudService } from '../etud.service';
import {Etudiant} from '../etudiant';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  EtudArray = new Array<Etudiant>();
  formVal !: FormGroup; 
  etudM : Etudiant = new Etudiant();
  etudData !: any;

  constructor(private formbuild : FormBuilder, private etud:EtudService){}

  ngOnInit() : void{
    this.formVal = this.formbuild.group({
      id:[''],
      nom:[''],
      classe:['']
    });
    this.getAllEtud();
  }

  getAllEtud(){
  this.etud.getEtud()
  .subscribe(res =>{
    this.etudData = res;
  })    
  }

  postEtuds() {
    this.etudM.id = this.formVal.value.id;
    this.etudM.nom = this.formVal.value.nom;
    this.etudM.classe = this.formVal.value.classe; 
  
    this.etud.postEtud(this.etudM)
      .subscribe(res => {
        console.log(res);
        alert("Etudiant added");
        this.getAllEtud();
      })
  }
  

  onEdit(row:any){
    this.formVal.controls['id'].setValue(row.id);
    this.formVal.controls['nom'].setValue(row.nom);
    this.formVal.controls['classe'].setValue(row.classe);
  }

  updEtuds(){
    this.etudM.id = this.formVal.value.id;
    this.etudM.nom = this.formVal.value.nom;
    this.etudM.classe = this.formVal.value.class;

    this.etud.updEtud(this.etudM,this.etudM.id)
    .subscribe(res=>{
      alert("updated succesfully")
    })
    this.getAllEtud();
  }

  delEtud(row:any){
    this.etud.delEtud(row.id)
    .subscribe(res =>{
      alert("deleted successfully")
      this.getAllEtud();
    })
    
  }

}
