import { Component } from '@angular/core';
import { StatesService } from '../common/service/states.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  public apiData:any;
  public myForm:any;
  constructor(private fb:FormBuilder , private sd:StatesService , private route:Router){
    this.myForm = this.fb.group({
      id:[''],
      projectName: ['', Validators.required],
      clientName: [''],
      location: [''],
      startDate: [''],
      endDate: [''],
      projectDescription: [''],
      projectManager: [''],
      budget: [''],
    })

    // this.callAllApi();
  }

  onSubmit(){
    if(this.myForm.valid){
     var add =  this.sd.getCount();
     this.myForm.value.id = add;
      this.sd.sendFormData(this.myForm.value);
      this.route.navigateByUrl('contact');
      console.log(this.myForm.value);
      this.myForm.reset();
      
    }
   
  }

  ngOnInit() {
    this.sd.data.subscribe(res => {
      if (res) {
        this.myForm.patchValue(res);
      }
    });
  }

}
