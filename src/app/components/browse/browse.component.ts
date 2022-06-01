import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/interfaces/phx';
import { GetFilmService } from 'src/app/services/get-film.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

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

    this.filmPopulaire();
    this.filmTrend();

  
  }


  filmPopulaire(){
    this.filmService.getPopular().subscribe({
      next: (data) => {
        this.popular = data.results;
        console.log(this.popular);
      },
      error: (e) => console.error(e)
    });

  }


  filmTrend(){
    this.filmService.getTrend().subscribe({
      next: (data) => {
        this.trending = data.results;
        console.log(this.trending);
      },
      error: (e) => console.error(e)
    });

  }
}
