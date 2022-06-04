import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';



import {MatDatepicker} from '@angular/material/datepicker';
import { Film } from 'src/app/interfaces/phx';


// import * as _moment from 'moment';
// import {default as _rollupMoment, Moment} from 'moment';
// import 'moment/locale/fr';
// import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';



@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

 
  types= [
    {value: 'Technique' },
    {value: 'Numérique' },
    {value: 'Métier' },
    {value: 'Étude' },
    {value: 'Documentation' },
    {value: 'Organisationnel' }
  ];
  action: string;
  local_data: any;
  moiss: number[] = [];
  annees: number[] = [];
  // url = environment.Url;
  user: any;
  
  message = '';
  progress = 0;
  currentFile?: File;
  fileName = 'Ajouter documents';
  modif = false;

  diaFormControl = new UntypedFormControl('', [
    Validators.required
  ]);

  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Film) { this.local_data = { ...data }; this.action = this.local_data.action;  }

  ngOnInit(): void {


    for (let i = 1; i <= 12; i++) {
      this.moiss.push(i)
    };

    for (let i = 2020; i <= 2075; i++) {
      this.annees.push(i)
    }; 

    // this.user = this.tokenStorageService.getUser();
    this.local_data.direction = this.user.username;

  }

  


  doAction() {

    if (this.modif) {
      this.dialogRef.close({ event: this.action, data: this.local_data });
    } else {
      this.dialogRef.close({ event: 'Nomodif', data:'' });
    }

  }



  closeDialog() {
    this.dialogRef.close({ event: 'Annuler' });
  }



  ///////////////// Upload /////////////////////

  // selectFile(event: any): void {
  //   if (event.target.files && event.target.files[0]) {
  //     const file: File = event.target.files[0];
  //     this.currentFile = file;
  //     this.fileName = this.currentFile.name;
  //   } else {
  //     this.fileName = 'Ajouter documents';
  //   }
  // }  

  // upload(id): void {
  
  //   this.progress = 0;
  //   this.message = "";

  //   if (this.currentFile) {

  //     this.uploadService.upload(this.currentFile, id).subscribe({
  //       next: (event: any) => {
  //         if (event.type === HttpEventType.UploadProgress) {
  //           this.progress = Math.round(100 * event.loaded / event.total);
  //         } else if (event instanceof HttpResponse) {
  //           this.message = event.body.message;
  //           this.recupFile(id);
  //           this.modif = true;
  //         }
  //       },
  //       error: (err: any) => {
  //         console.log(err);
  //         this.progress = 0;

  //         if (err.error && err.error.message) {
  //           this.message = err.error.message;
  //         } else {
  //           this.message = 'Could not upload the file!';
  //         }

  //         this.currentFile = undefined;
  //       }
  //     });
  //   }
  // };

  
  // deleteUp(id,tabid) {
  //   this.uploadService.delete(id)
  //     .subscribe({
  //       next: (res) => {
  //         // console.log(response);
  //         this.recupFile(tabid);
  //         this.modif = true;
  //       },
  //       error: (e) => console.error(e)
  //     });
  // };


 /////////// refresh fichier après modif ////////////////

  // recupFile(id): void {
  //   this.uploadService.getFiles(id)
  //     .subscribe({
  //       next: (files) => {
  //         this.local_data.file = files;
  //         console.log(this.local_data.file)
  //       },
  //       error: (e) => console.error(e)
  //     });
  // };

  ///////////////////////////////////////////


}
