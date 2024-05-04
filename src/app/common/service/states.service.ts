import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  constructor(private http:HttpClient) { }

  
  public PreviousData:any[]=[];
  public oldData = new BehaviorSubject<any>('');
  public newData = this.oldData.asObservable();

  getFormData(){
    return this.newData;
  }

  sendFormData(dt:any){
    this.PreviousData.push(dt);
    this.oldData.next(dt);
  }
  getHistoryData(){
    return this.PreviousData;
  }

  // count increment 
  private count: any = 1;
  getCount(): any {
    return this.count++;
  }

  // update data
  private dataSubject = new BehaviorSubject<any>('');
  public data = this.dataSubject.asObservable();

  setData(data: any) {
    this.dataSubject.next(data);
  }
}


// Fake APi Data service


@Injectable({
  providedIn: 'root'
})
export class FakeDataService {
  constructor(private Http1: HttpClient) {

  }

  getAPIData(): Observable<any> {
    return this.Http1.get('https://fakestoreapi.com/products?limit=5');
  }
  deleteAPIData(data: any) {
    return this.Http1.delete('https://fakestoreapi.com/products/' + data.id, data);
  }
  updateAPIData(data: any) {
    return this.Http1.put('https://fakestoreapi.com/products/' + data.id, data);
  }
  addAPIData(data: any) {
    return this.Http1.post('https://fakestoreapi.com/products', data)
  }

}