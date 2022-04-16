import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
@ViewChild("pseudo") pseudoKey!: ElementRef;
public pseudoHome:string=""; 
  constructor() { }

  ngOnInit(): void {
  }
  onKeyPseudo(event: any){
this.pseudoHome=event.target.value;
  }
startQuizz(){
  localStorage.setItem("pseudo",this.pseudoKey.nativeElement.value)
}
}
