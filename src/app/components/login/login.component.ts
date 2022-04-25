import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { TokenService } from 'src/app/services/token.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private snackBar: MatSnackBar, private router: Router, private token: TokenService, private loginService: LoginService) { }

  ngOnInit(): void {

    if (this.token.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['/profil']);
    }

  }

  login(): void {
    this.loginService.login(this.form).subscribe(
      data => {
        this.token.saveToken(data.accessToken);
        this.token.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['/browse']);

      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log(err.error.message)

        let msg = 'Mauvais mot de passe'

        this.snackBar.open(msg, 'Fermer', {
          duration: 3000,
          horizontalPosition: "center",
          verticalPosition: "bottom",
        });

      }
    );
  }

}
