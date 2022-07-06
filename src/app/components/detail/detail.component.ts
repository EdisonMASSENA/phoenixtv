import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { GetFilmService } from 'src/app/services/get-film.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: [
    trigger('fade', [
      state('init', style({ 'backdrop-filter': 'blur(20px)' })),
      state('final', style({ 'backdrop-filter': 'none' })),
      transition('init => final', animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('player', [
      state('open', style({ 'display': 'block', 'height': '100%', 'left': 0,'opacity': 1,'position': 'fixed','top': 0,'width': '100%', 'z-index': 9999 })),
      state('close', style({ 'display': 'none' })),
      transition('open <=> close', animate('0ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DetailComponent implements OnInit {

  open: any;
  video: any;
  fade = 'init';
  player = 'close';
  genre = [];
  directors = [];
  actors = [];
  imdb: any;
  tvruntime: any
  runtime: any
  api: any;

  
  routeParams = this.route.snapshot.paramMap;
  videoId = this.routeParams.get('videoId');
  type = this.routeParams.get('type');

  constructor(private route: ActivatedRoute, private filmService: GetFilmService, private sanitizer: DomSanitizer) { }

  ngAfterViewInit() {
    this.fade = "final"

  }

  ngOnInit(): void {

    this.getDetail();

  }



  getDetail() {

    if (this.type == 'movie') {
      this.filmService.detailmovie(this.videoId).subscribe({
        next: (data) => {

          this.video = data;

          for (let i = 0; i < this.video.genres.length; i++) {
            this.genre = this.genre.concat(this.video.genres[i].name);
          }

          this.runtime = Math.floor(this.video.runtime / 60) + ' h ' + this.video.runtime % 60 + ' min';

          this.getCastMovie();
          this.getVideoMovie();

          // this.imdbDetail(this.video.imdb_id);

          // console.log(this.video);

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

          this.tvruntime = Math.floor(this.video.episode_run_time / 60) + ' h ' + this.video.episode_run_time % 60 + ' min';

          this.getCastTv();
          this.getVideoTv();

          // this.imdbDetail(this.video.imdb_id);

          // console.log(this.video);
        },
        error: (e) => console.error(e)
      });
    }

  }

  getCastMovie() {

    this.filmService.castMovie(this.videoId).subscribe({
      next: (data) => {

        for (let i = 0; i < 3; i++) {
          this.actors = this.actors.concat(data.cast[i].name);
        }

        // console.log(data);

        let alldirectors = data.crew.filter((item: any) => item.known_for_department === 'Directing');

        this.directors = alldirectors[0].name;

      },
      error: (e) => console.error(e)
    });

  }

  getVideoMovie(){

    this.filmService.videoMovie(this.videoId).subscribe({
      next: (data) => {
        
        const dataAr = Object.entries(data);

        let url = dataAr[1][1].filter((item: any) => item.name === 'Official Trailer');
        
        this.video.url = "https://www.youtube.com/embed/"+ url[0].key;

        console.log(this.video.url);

      },
      error: (e) => console.error(e)
    });

  }


  getCastTv() {

    this.filmService.castTv(this.videoId).subscribe({
      next: (data) => {

        for (let i = 0; i < 3; i++) {
          this.actors = this.actors.concat(data.cast[i].name);
        }
        console.log(data);
      },
      error: (e) => console.error(e)
    });

  }

  getVideoTv(){

    this.filmService.videoTv(this.videoId).subscribe({
      next: (data) => {
        
        const dataAr = Object.entries(data);

        let url = dataAr[1][1].filter((item: any) => item.name === 'Official Teaser');

        if (url == undefined) {
          url = dataAr[1][1].filter((item: any) => item.name === 'Official Trailer');
        } else {
          url = dataAr[1][1];
        }
        
        this.video.url = "https://www.youtube.com/embed/"+ url[0].key;

        console.log(data);

      },
      error: (e) => console.error(e)
    });

  }

  url() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.video.url);
  }


  onPlayerReady(api: any) {
    this.api = api;

    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
  }

  playVideo() {
    this.api.play();
  }

  // imdbDetail(imdbId:any){

  //   this.filmService.imdbDetail(imdbId).subscribe({
  //     next: (data) => {

  //       this.imdb = data;

  //       console.log(this.imdb);

  //     },
  //     error: (e) => console.error(e)
  //   });

  // }



}
