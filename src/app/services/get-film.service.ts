import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetFilmService {

  private url = "http://localhost/api-phx";

  constructor(private http: HttpClient) { }

  getPopulaire(): Observable<any> {
    // return this.http.get(`${this.url}/getFilm.php`);
    return this.http.get("https://api.themoviedb.org/3/movie/popular?api_key=c04ac87410132d6f3b9895aa33fef9d0&language=en-US&page=1");
  }


}
