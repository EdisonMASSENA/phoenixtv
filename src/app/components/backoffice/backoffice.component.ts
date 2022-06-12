import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/interfaces/phx';
import { MatTableDataSource } from '@angular/material/table';
import { GetFilmService } from 'src/app/services/get-film.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})

export class BackofficeComponent implements OnInit {


  displayedColumns: string[] = ['nom', 'action'];

  dataFilm = new MatTableDataSource<Film>();
  dataSerie = new MatTableDataSource<Film>();
  msg: any;


  constructor(private filmService: GetFilmService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    // this.filmPopulaire();

    // this.seriePopulaire();

    this.recupFilm();
    this.recupSerie();

    this.dataFilm.filterPredicate = function (film, filter: string): boolean {
      return film.nom.toLowerCase().includes(filter);
    };

    this.dataSerie.filterPredicate = function (serie, filter: string): boolean {
      return serie.nom.toLowerCase().includes(filter);
    };

  }

  applyFilterFilm(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataFilm.filter = filterValue.trim().toLowerCase()
  };

  applyFilterSerie(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSerie.filter = filterValue.trim().toLowerCase()
  };



  openDialog(action: any, obj: any, type: any) {
    obj.action = action;
    obj.type = type;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '650px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      switch (result.event) {
        case 'ajouterf':
          this.addFilm(result.data);
          this.msg = 'Le film ' + result.data.nom + ' a été ajouté';
          this.snackbar(this.msg)
          break;

        case 'modifierf':
          this.editFilm(result.data);
          console.log(result.data);

          this.msg = 'Le film ' + result.data.nom + ' a été modifié'
          this.snackbar(this.msg)
          break;

        case 'ajouters':
          this.addSerie(result.data);
          this.msg = 'La serie ' + result.data.nom + ' a été ajoutée';
          this.snackbar(this.msg)
          break;

        case 'modifiers':
          this.editSerie(result.data);
          console.log(result.data);

          this.msg = 'La serie ' + result.data.nom + ' a été modifiée'
          this.snackbar(this.msg)
          break;

        case 'supprf':
          this.deleteFilm(result.data);
          this.msg = 'Le film ' + result.data.nom + ' a été supprimé'
          this.snackbar(this.msg)
          break;


        case 'supprs':
          this.deleteSerie(result.data);
          this.msg = 'La serie ' + result.data.nom + ' a été supprimée'
          this.snackbar(this.msg)
          break;

        // case 'Upload':
        //   this.msg = 'Modification effectuée'
        //   this.snackbar(this.msg)
        //   this.recupTab()
        //   break;

        case 'Nomodif':
          this.msg = 'Pas de modification'
          this.snackbar(this.msg)
          break;

        case 'Annuler':
          this.msg = 'Action annulée'
          this.snackbar(this.msg)
          break;

        default:
          break;
      };
    })
  };



  /////////////////////// Ajout Projet ////////////////////

  addFilm(data: Film): void {
    this.filmService.addfilm(data)
      .subscribe({
        next: (res) => {
          // console.log(res);
          this.recupFilm();
        },
        error: (e) => console.error(e)
      });
  };

  //////////////// Modification des champs /////////////////


  editFilm(data: Film): void {
    this.filmService.editfilm(data)
      .subscribe({
        next: (res: any) => {
          // console.log(res);
          this.recupFilm();
        },
        error: (e) => console.error(e)
      });
  };

  deleteFilm(data: any) {
    this.filmService.deletefilm(data.id)
    .subscribe({
      next: (res: any) => {
        // console.log(res);
        this.recupFilm();
      },
      error: (e) => console.error(e)
    });

  };


  recupFilm(): void {
    this.filmService.getPopularFilm()
      .subscribe({
        next: (data) => {
          this.dataFilm.data = data.results
          console.log(data);

        },
        error: (e) => console.error(e)
      });
  };




  addSerie(data: Film): void {
    this.filmService.addserie(data)
      .subscribe({
        next: (res) => {
          // console.log(res);
          this.recupSerie();
        },
        error: (e) => console.error(e)
      });
  };

  //////////////// Modification des champs /////////////////


  editSerie(data: Film): void {
    this.filmService.editserie(data)
      .subscribe({
        next: (res: any) => {
          // console.log(res);
          this.recupSerie();
        },
        error: (e) => console.error(e)
      });
  };

  deleteSerie(data: any) {
    this.filmService.deleteserie(data.id)
    .subscribe({
      next: (res: any) => {
        // console.log(res);
        this.recupSerie();
      },
      error: (e) => console.error(e)
    });

  };

  recupSerie(): void {
    this.filmService.getPopularTv()
      .subscribe({
        next: (data) => {
          this.dataSerie.data = data
          console.log(data);

        },
        error: (e) => console.error(e)
      });
  };



  /////////////////// Snackbar //////////////////////

  snackbar(msg: any) {
    this._snackBar.open(msg, 'Fermer', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
    });
  };


}
