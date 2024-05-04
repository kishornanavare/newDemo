import { Component } from '@angular/core';
import { StatesService } from '../common/service/states.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  public reciveData:any[]=[];
  public takeAllData:any=[
    'Project Name',
    'Client Name',
    'Location',
    'Start Date',
    'End Date',
    'Project Description',
    'Project Manager',
    'Budget',
  ]
  constructor(private sd:StatesService , private route:Router){
  }

  ngOnInit(){
    this.reciveData = this.sd.getHistoryData();
  }

  onDelete(data:any){
    alert('Are you sure...')
    this.reciveData.forEach((x,index)=>{
      if(x.id == data.id){
        this.reciveData.splice(index,1);
      }
    })
  }

  onUpdate(data:any){
    this.route.navigate(['about']);
    this.sd.setData(data);
  }
}
