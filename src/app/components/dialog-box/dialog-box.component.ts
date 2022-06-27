import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Film } from 'src/app/interfaces/phx';


import 'moment/locale/fr';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';



@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class DialogBoxComponent implements OnInit {

  action: string;
  type: string;
  local_data: any;
  
  message = '';
  // currentFile?: File;
  // fileName = 'Ajouter documents';
  modif = false;

  diaFormControl = new UntypedFormControl('', [
    Validators.required
  ]);

  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Film) { this.local_data = { ...data }; this.action = this.local_data.action; this.type = this.local_data.type;  }

  ngOnInit(): void {


  }

  


  doAction() {



    // if (this.modif) {
    //   this.dialogRef.close({ event: this.action, data: this.local_data });
    // } else {
    //   this.dialogRef.close({ event: 'Nomodif', data:'' });
    // }

    this.dialogRef.close({ event: this.type, data: this.local_data });


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
