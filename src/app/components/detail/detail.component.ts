import { animate, state, style, transition, trigger } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetFilmService } from 'src/app/services/get-film.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: [
    trigger('fade', [
      state('init', style({ 'backdrop-filter': 'blur(20px)'})),
      state('final', style({ 'backdrop-filter': 'none' })),
      transition('init => final', animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DetailComponent implements OnInit {

  video: any;
  state = 'init';
  genre = [];
  directors = [];
  imdb: any;
  epruntime:any
  runtime:any
  
  routeParams = this.route.snapshot.paramMap;
  videoId = this.routeParams.get('videoId');
  type = this.routeParams.get('type');

  constructor(private route: ActivatedRoute, private filmService: GetFilmService, private datepipe: DatePipe) { }

  ngAfterViewInit() {
    this.state = "final"

  }

  ngOnInit(): void {

    this.getDetail();

  }



getDetail(){

  if (this.type == 'movie') {
    this.filmService.detailmovie(this.videoId).subscribe({
      next: (data) => {

        this.video = data;

        this.runtime = Math.floor(this.video.runtime / 60) + 'h ' + this.video.runtime % 60 + 'min';

        this.imdbDetail(this.video.imdb_id);

        console.log(this.video);

      },
      error: (e) => console.error(e)
    });
  } else if (this.type == 'tv') {
    this.filmService.detailtv(this.videoId).subscribe({
      next: (data) => {
        this.video = data;

        for (let i = 0; i < this.video.genres.length; i++) {
          this.genre = this.genre.concat(this.video.genres[i].name);
        }

        for (let i = 0; i < this.video.created_by.length; i++) {
          this.directors = this.directors.concat(this.video.created_by[i].name);
        }

        this.epruntime = Math.floor(this.video.episode_run_time / 60) + 'h ' + this.video.episode_run_time % 60 + 'min';
        

        // this.imdbDetail(this.video.imdb_id);
        
        console.log(this.video);
      },
      error: (e) => console.error(e)
    });
  }

}


  imdbDetail(imdbId:any){
    
    this.filmService.imdbDetail(imdbId).subscribe({
      next: (data) => {

        this.imdb = data;

        console.log(this.imdb);

      },
      error: (e) => console.error(e)
    });

  }





}
