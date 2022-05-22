import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/interfaces/phx';
import { GetFilmService } from 'src/app/services/get-film.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  films: Film[] = [];

  constructor(private filmService: GetFilmService) { }

  ngOnInit(): void {

    this.recupFilm();
  
  }


  recupFilm(){
    this.filmService.getPopulaire().subscribe({
      next: (data) => {
        this.films = data.results;
        this.films.splice(7);
        console.log(this.films);
      },
      error: (e) => console.error(e)
    });

  }


}
