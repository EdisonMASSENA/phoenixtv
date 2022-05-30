import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  sticky = false;

  constructor(private token: TokenService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.token.signOut();
    this.router.navigate(['']);
    // let msg = 'Déconnexion';
    // this.snackbar(msg);
  };

  
  @ViewChild('stickHeader') header!: ElementRef;
  @HostListener('window:scroll')

  handleScroll() {
    const windowScroll = window.pageYOffset;

    if (windowScroll >= 10) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }


}
