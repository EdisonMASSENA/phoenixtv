import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatChipsModule} from '@angular/material/chips';
import { DatePipe } from '@angular/common'
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {SlickCarouselModule} from 'ngx-slick-carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirstComponent } from './components/first/first.component';
import { ProfilComponent } from './components/profil/profil.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowseComponent } from './components/browse/browse.component';
import { SliderComponent } from './components/slider/slider.component';
import { SearchComponent } from './components/search/search.component';
import { FilmComponent } from './components/film/film.component';
import { SerieComponent } from './components/serie/serie.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    FirstComponent,
    ProfilComponent,
    FooterComponent,
    HeaderComponent,
    BrowseComponent,
    SliderComponent,
    SearchComponent,
    FilmComponent,
    SerieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatChipsModule,
    MatSnackBarModule,
    MatCardModule,
    MatMenuModule,
    SlickCarouselModule,
    MatCheckboxModule,
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
