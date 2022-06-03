import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  user:any;
  panelOpenState = false;

  
  constructor(private token: TokenService ) { }

  ngOnInit(): void {
     this.user = this.token.getUser();
    //  console.log(this.user)
  }
 
}