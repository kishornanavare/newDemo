import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';

  // public flag: boolean=false; 
  // constructor( private route:Router){}

  // take(){
  //   this.flag = false;
  //   this.route.navigateByUrl('/about');
  // }
  // take1(){
  //   this.flag = false;
  //   this.route.navigateByUrl('/contact');
  // }
}
