import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/interfaces/phx';
import { GetFilmService } from 'src/app/services/get-film.service';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.scss']
})
export class SerieComponent implements OnInit {

  popular: Film[] = [];
  trending: Film[] = [];
  i = 1;

  sliderConfig = {
    slidesToShow: 9,
    slidesToScroll: 2,
    arrows: true,
    autoplay: false
  };

  constructor(private filmService: GetFilmService) { }

  ngOnInit(): void {

    this.tvPopulaire();

  
  }


  tvPopulaire(){
    this.filmService.tvTrend().subscribe({
      next: (data) => {
        this.popular = data.results;
        console.log(this.popular);
      },
      error: (e) => console.error(e)
    });
  }

  // filmGenre(){
  //   this.filmService.getGenreFilm(genre).subscribe({
  //     next: (data) => {
  //       this.popular = data.results;
  //       console.log(this.popular);
  //     },
  //     error: (e) => console.error(e)
  //   });
  // }


}
