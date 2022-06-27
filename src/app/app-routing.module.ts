import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeComponent } from './components/backoffice/backoffice.component';
import { BrowseComponent } from './components/browse/browse.component';
import { FilmComponent } from './components/film/film.component';
import { FirstComponent } from './components/first/first.component';
import { LoginComponent } from './components/login/login.component';
import { ProfilComponent } from './components/profil/profil.component';
import { SearchComponent } from './components/search/search.component';
import { SerieComponent } from './components/serie/serie.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: '', component: FirstComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'search', component: SearchComponent },
  { path: 'films', component: FilmComponent },
  { path: 'series', component: SerieComponent },
  { path: 'backoffice', component: BackofficeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
