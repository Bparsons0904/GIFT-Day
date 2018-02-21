import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/success'])
        
      }
    });
  }

  onSubmit() {
    this.auth.emailLogin(this.email, this.password);
  }
}