import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private http: HttpClient) { }

getPushUpData() {
  return this.http.get('https://whispering-hollows-16871.herokuapp.com/api/readall');
}
	updateOrCreatePushUpData(amount, week){
  let data = ({"week": Number(week), "amount": Number(amount)});
  return this.http.put('https://whispering-hollows-16871.herokuapp.com/api/update', data );
}

}
