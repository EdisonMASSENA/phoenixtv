import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  user:any;

  constructor(private token: TokenService) { }

  ngOnInit(): void {
     this.user = this.token.getUser();
     console.log(this.user)
  }

}
