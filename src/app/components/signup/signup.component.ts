import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  hide = true;
  form: any = {};
  select = true;
  ndate = new Date;
  date = this.datepipe.transform(this.ndate, 'yyyy/MM/dd');
  keywords = new Set(['Horreur', 'Action', 'Comédie','Science-fiction']);
  
  diaFormControl = new UntypedFormControl('', [
    Validators.required
  ]);


  constructor(private loginService: LoginService, private datepipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
   
  
  }

  createUser(): void {

    this.form.inscrit = this.date;

    this.loginService.create(this.form)
      .subscribe(
        response => {
          console.log(response);
          if (response == true) {
            this.router.navigate(['/login']);
          }
          // this.recupUser();
          // this.recupFile();
        },
        error => {
          console.log(error);

        });

  };

  

}

