import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FakeDataService } from '../common/service/states.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 
  public liveData: any = [];
  public formData: any = FormGroup;
  constructor(private fb: FormBuilder, private sc: FakeDataService) {
    this.formData = this.fb.group({
      id:[''],
      title:[''],
      price:[''],
      description:[''],
      category:[''],
      rating:[''],
      image:['']
    })
  }

  // Submit new Data
  OnSubmit(){

    this.sc.addAPIData(this.formData.value).subscribe({
      next:((res)=>{
        this.liveData.push(res)
      }),
      error:((err)=>{
        console.log("Data has been not Added"+err);
      }),
      complete:(()=>{
        console.log("Data has been Add SuccessFully....");
      })
    })
  }

  // Delete the Api Data
  onDelete(data:any){
    alert('Are you sure...');
    this.sc.deleteAPIData(data).subscribe({
      next:((res:any)=>{
        console.log(res);
        // this.liveData = this.liveData.filter((x:any)=>res.id !== x.id);
        this.liveData.forEach((x:any,index:any)=>{
          if(x.id == res.id){
            this.liveData.splice(index,1);
          }
        })
      }),
      error:((err)=>{
        console.log("Data has been not deleted" + err);
      }),
      complete:(()=>{
        console.log("Data has been deleted SuccessFully...");
      })
    })
  }

  // Fetch the data from api to form
  onUpdate(data:any){
    // this.formData.patchValue({...data});
    this.formData.setValue({...data});
  }

  // update API data 
  UpdateData(){
    this.sc.updateAPIData(this.formData.value).subscribe({
      next:((res:any)=>{
        console.log(res);
        this.liveData.forEach((x:any,index:any)=>{
          if(x.id == res.id){
            this.liveData.splice(index,1,res);
          }
        })
      }),
      error:((err)=>{
        console.log("Data has been not Updated"+err);
      }),
      complete:(()=>{
        console.log("Data has been updated SuccessFully...");
      })
    })
  }



  // Fetch data in table
  ngOnInit() {
    this.showgetAPI()
  }
  showgetAPI() {
    this.sc.getAPIData().subscribe({
      next: ((res) => {
        console.log(res);
        this.liveData = res
      }),
      error: ((err) => {
        console.log("errorrrrrrrrrrr" + err);
      }),
      complete: (() => {
        console.log("Data Fetch SuccessFully...");
      })
    })
  }

}


