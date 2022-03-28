import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private token: TokenService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.token.signOut();
    this.router.navigate(['']);
    // let msg = 'Déconnexion';
    // this.snackbar(msg);
  };

}
