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


  displayedColumns: string[] = ['titre','action'];
  dataSource = new MatTableDataSource<Film>();
  msg: any;


  constructor(private filmService: GetFilmService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.filmPopulaire();
  }

  filmPopulaire() {
    this.filmService.getPopular().subscribe({
      next: (data) => {
        this.dataSource = data.results;
        console.log(this.dataSource);
      },
      error: (e) => console.error(e)
    });

  }


  openDialog(action: any, obj: { action: any; }) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '650px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      switch (result.event) {
        case 'Ajouter':
          this.createTableau(result.data);
          this.msg = 'Le projet ' + result.data.projet + ' a été ajouté';
          this.snackbar(this.msg)
          break;

        // case 'Modifier':
        //   this.editTableau(result.data);
        //   this.msg = 'Le projet ' + result.data.projet + ' a été modifié'
        //   this.snackbar(this.msg)
        //   break;

        // case 'Supprimer':
        //   this.deleteTableau(result.data);
        //   this.msg = 'Le projet ' + result.data.projet + ' a été supprimé'
        //   this.snackbar(this.msg)
        //   break;

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

  createTableau(data: Film): void {
    this.filmService.create(data)
      .subscribe({
        next: (res) => {
          // console.log(res);
          this.filmPopulaire();
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
