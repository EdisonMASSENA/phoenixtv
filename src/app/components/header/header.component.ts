import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GetFilmService } from 'src/app/services/get-film.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  sticky = false;
  research!: string;
  searchRes!: string;

  constructor(private token: TokenService, private router: Router, private filmService: GetFilmService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.token.signOut();
    this.router.navigate(['']);
    // let msg = 'Déconnexion';
    // this.snackbar(msg);
  };

  searchbar(){
    this.filmService.search(this.research).subscribe({
      next: (data) => {
        this.searchRes = data.results;
        console.log(this.searchRes);
      },
      error: (e) => console.error(e)
    });
  }

  
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
