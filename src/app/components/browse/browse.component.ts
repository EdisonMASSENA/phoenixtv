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
  i = 0;

  sliderConfig = {
    slidesToShow: 8,
    slidesToScroll: 2,
    arrows: true,
    autoplay: false
  };

  constructor(private filmService: GetFilmService) { }

  ngOnInit(): void {

    this.tvTrend();
    this.filmTrend();

  
  }


  tvTrend(){
    this.filmService.tvTrend().subscribe({
      next: (data) => {
        this.popular = data.results;
        // this.popular = this.popular.splice(0,19);
        console.log(this.popular);
      },
      error: (e) => console.error(e)
    });

  }


  filmTrend(){
    this.filmService.filmTrend().subscribe({
      next: (data) => {
        this.trending = data.results;
        // this.trending = this.trending.splice(0,19);
        console.log(this.trending);
      },
      error: (e) => console.error(e)
    });

  }
}
