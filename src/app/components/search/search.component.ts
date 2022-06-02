import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetFilmService } from 'src/app/services/get-film.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  titre!: string;
  research!: string;
  searchRes!: any;
  seriechk = false;
  filmchk = false;


  constructor(private filmService: GetFilmService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.research = params['research'];
      this.searchbar();
      this.titre = `Résultats pour "${this.research}"`;
    });

    console.log(this.research);


  }


  searchbar() {

    this.filmService.searchAll(this.research).subscribe({
      next: (data) => {
        this.searchRes = data.results;
        console.log(this.searchRes);
      },
      error: (e) => console.error(e)
    });

  }



  // tri(){
  //   if (this.seriechk) {
  //     this.filterTv()
  //   }else if (this.filmchk) {
  //     this.filterFilm()
  //   } else{
  //     this.searchbar()
  //   }
  // }

  // filterTv(){

  //     this.filmService.searchTv(this.research).subscribe({
  //       next: (data) => {
  //         this.searchRes = data.results;
  //         console.log(this.searchRes);
  //       },
  //       error: (e) => console.error(e)
  //     });

  // }

  // filterFilm(){

  //     this.filmService.searchFilm(this.research).subscribe({
  //       next: (data) => {
  //         this.searchRes = data.results;
  //         console.log(this.searchRes);
  //       },
  //       error: (e) => console.error(e)
  //     });

  // }

}
