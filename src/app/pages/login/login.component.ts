import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../core/services/login.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription();
  user: any;
  pass: any;

  constructor(private router: Router, private route: ActivatedRoute, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  getUser(user: any){
    this.sub.add(this.loginService.getUser(user).subscribe(data => {
      this.router.navigate(['/invoice']);
    }, error => {
      console.error('Error: ' + error);
    },() => {

    }));
  }

  login(){
    let user = {
      email: this.user,
      password: this.pass
    }
    this.getUser(user);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
