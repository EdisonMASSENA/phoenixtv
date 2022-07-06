import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/interfaces/phx';
import { GetFilmService } from 'src/app/services/get-film.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
  animations: [
    trigger('player', [
      state('open', style({ 'display': 'block', 'height': '100%', 'left': 0,'opacity': 1,'position': 'fixed','top': 0,'width': '100%', 'z-index': 9999 })),
      state('close', style({ 'display': 'none' })),
      transition('open <=> close', animate('0ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BrowseComponent implements OnInit {

  open:any;
  popular: Film[] = [];
  trending: Film[] = [];
  i = 0;
  videoUrl: any;
  api: any;
  player = 'close';


  sliderConfig = {
    slidesToShow: 8,
    slidesToScroll: 2,
    arrows: true,
    autoplay: false
  };

  constructor(private filmService: GetFilmService,  private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.tvTrend();
    this.filmTrend();  
  }


  tvTrend(){
    this.filmService.tvTrend().subscribe({
      next: (data) => {
        this.popular = data.results;
        console.log(this.popular);
      },
      error: (e) => console.error(e)
    });

  }


  filmTrend(){
    this.filmService.filmTrend().subscribe({
      next: (data) => {
        this.trending = data.results;

        this.getVideoMovie(this.trending[0].id);

        console.log(this.trending);
      },
      error: (e) => console.error(e)
    });

  }


  getVideoMovie(videoId:any){

    this.filmService.videoMovie(videoId).subscribe({
      next: (data) => {
        
        const dataAr = Object.entries(data);

        let url = dataAr[1][1].filter((item: any) => item.name === 'Official Trailer');
        
        this.videoUrl = "https://www.youtube.com/embed/"+ url[0].key;

        console.log(this.videoUrl);

      },
      error: (e) => console.error(e)
    });

  }

  url() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }


  onPlayerReady(api: any) {
    this.api = api;

    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
  }

  playVideo() {
    this.api.play();
  }
////////////////////////////////

}
