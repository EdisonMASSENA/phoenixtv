import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('search', [
      state('collapsed', style({ width: '20px', visibility: 'hidden'})),
      state('expanded', style({ width: '250px', visibility: 'visible' })),
      transition('collapsed <=> expanded', animate('450ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})

export class HeaderComponent implements OnInit {

  search = false;
  sticky = false;
  research!:string;
  @ViewChild('inpsea') inpsea:any ; 

  constructor(private token: TokenService, private router: Router) { }

  ngOnInit(): void {
    this.handleScroll();
  }

  focus(){
    if (this.search == false) {
      setTimeout(()=>{ 
        this.inpsea.nativeElement.focus();
      },400)
    }
  }

  searchbar(){
    this.router.navigate(["/search"], { queryParams: {research: this.research} });
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

    if (windowScroll >= 10 || this.router.url === '/profil' ) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

}
