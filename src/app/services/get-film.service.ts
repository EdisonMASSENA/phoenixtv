import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from '../interfaces/phx';

@Injectable({
  providedIn: 'root'
})

export class GetFilmService {

  private url = "http://localhost/api-phx";

  constructor(private http: HttpClient) { }

  // detail(videoId: any): Observable<any> {
  //   // return this.http.get(`${this.url}/getfilm.php`, videoId);
  //   return this.http.get(`https://imdb-api.com/fr/API/Title/k_9bt9v0l7/${videoId}`);
  // }

  // tvTrend(): Observable<any> {
  //   // return this.http.get(`${this.url}/getFilm.php`);
  //   return this.http.get(`https://imdb-api.com/en/API/MostPopularTVs/k_9bt9v0l7`);
  // }

  // filmTrend(): Observable<any> {
  //   // return this.http.get(`${this.url}/getFilm.php`);
  //   return this.http.get(`https://imdb-api.com/en/API/MostPopularMovies/k_9bt9v0l7`);
  // }

  // searchAll(reasearch: any): Observable<any> {
  //   // return this.http.get(`${this.url}/getFilm.php`);
  //   return this.http.get(`https://imdb-api.com/en/API/Search/k_9bt9v0l7/${reasearch}`);
  // }

  searchAll(reasearch: any): Observable<any> {
    // return this.http.get(`${this.url}/getFilm.php`);
    return this.http.get(`https://api.themoviedb.org/3/search/multi?api_key=c04ac87410132d6f3b9895aa33fef9d0&language=en-US&query=${reasearch}&page=1&include_adult=false`);
  }

  detailtv(videoId: any): Observable<any> {
    // return this.http.get(`${this.url}/getfilm.php`, videoId);
    return this.http.get(`https://api.themoviedb.org/3/tv/${videoId}?api_key=c04ac87410132d6f3b9895aa33fef9d0&language=fr-FR`);
  }

  detailmovie(videoId: any): Observable<any> {
    // return this.http.get(`${this.url}/getfilm.php`, videoId);
    return this.http.get(`https://api.themoviedb.org/3/movie/${videoId}?api_key=c04ac87410132d6f3b9895aa33fef9d0&language=fr-FR`);
  }


  tvTrend(): Observable<any> {
    // return this.http.get(`${this.url}/getFilm.php`);
    return this.http.get(`https://api.themoviedb.org/3/tv/popular?api_key=c04ac87410132d6f3b9895aa33fef9d0&language=en-US&page=1`);
  }

  filmTrend(): Observable<any> {
    // return this.http.get(`${this.url}/getFilm.php`);
    return this.http.get(`https://api.themoviedb.org/3/movie/popular?api_key=c04ac87410132d6f3b9895aa33fef9d0&language=en-US&page=1`);
  }

  imdbDetail(videoId: any){
    return this.http.get(`https://imdb-api.com/fr/API/Title/k_9bt9v0l7/${videoId}`);
  }



  //////////////////////////////////////////////////////////
  getfilm(): Observable<any> {
    return this.http.get(`${this.url}/getfilm.php`);
  }

  addfilm(data: any): Observable<any> {
    return this.http.post(`${this.url}/addfilm.php`, data);
  }
  editfilm(data: Film): Observable<any> {
    return this.http.put(`${this.url}/editfilm.php`, data);
  }
  deletefilm(id: any): Observable<any> {
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.delete(`${this.url}/deletefilm.php`, { params: params });
  }

  getserie(): Observable<any> {
    return this.http.get(`${this.url}/getserie.php`);
  }
  addserie(data: any): Observable<any> {
    return this.http.post(`${this.url}/addserie.php`, data);
  }

  editserie(data: Film): Observable<any> {
    return this.http.put(`${this.url}/editserie.php`, data);
  }

  deleteserie(id: any): Observable<any> {
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.delete(`${this.url}/deleteserie.php`, { params: params });
  }
  
  // getPopularAll(): Observable<any> {
  //   // return this.http.get(`${this.url}/getFilm.php`);
  //   return this.http.get("https://api.themoviedb.org/3/movie/popular?api_key=c04ac87410132d6f3b9895aa33fef9d0&language=en-US&page=1");
  // }

  // getLatestAll(): Observable<any> {
  //   // return this.http.get(`${this.url}/getFilm.php`);
  //   return this.http.get("https://api.themoviedb.org/3/movie/latest?api_key=c04ac87410132d6f3b9895aa33fef9d0&language=en-US&page=1");
  // }

  // getTrend(): Observable<any> {
  //   // return this.http.get(`${this.url}/getFilm.php`);
  //   return this.http.get("https://api.themoviedb.org/3/trending/all/week?api_key=c04ac87410132d6f3b9895aa33fef9d0&language=en-US&page=1");
  // }






}
