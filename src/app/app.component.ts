import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule, RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  title = 'CIVILIAN';
  constructor( private _http : HttpClient , private _router : Router)
  {

  }
  

  ngOnInit(): void {

  }

  
  UserName? : String = "" //"sarojini.ravi@kosoft.co";
  password? : String = "" // "pass";
  ErrMsg?: string = "";
  responseData: any;

  async Login() {
    if (this.UserName && this.password) {
      try {
        const response: any = await this._http.get('https://api.kolims.com/api/Signature/Login/' + this.UserName + '/' + this.password).toPromise();
        console.log('API Response:', response);
        this.responseData = response;
        this.GetLoginCall();
      } catch (error) {
        console.error('API Error:', error);
        this.ErrMsg = "An error occurred while processing your request. Please try again later.";
      }
    } else {
      this.ErrMsg = "Please enter the UserName and Password";
    }
  }

  GetLoginCall() {
    if (this.responseData && this.responseData.data.returnCode === '0') {
      console.log("Condition passed")
      this.ErrMsg = "";
      this._router.navigate(['LoginSuccess']);
      this.UserName = "";
      this.password = "";
    } else {
      console.log(this.responseData, "waht")
      this.ErrMsg = "UserName or password is invalid";
    }
  }



}
