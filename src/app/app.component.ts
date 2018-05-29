import { Component, OnInit } from '@angular/core';
import { CalculatorService } from './calculator.service';
import { PushUpItem } from './PushUpItem';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

	title: string = 'Pushups';
	pushUpData: PushUpItem[] = [];
	fetchingError:boolean;
	currentAmount: any = 0;
	currentWeek:number  = 1;
	newAmount: number = 10;
	selectedID: number = 0;
	maxAmount: number = 200;
	newWeek:number;
	error: string;
	keyboard: any[] = ["7", "8", "9", "4","5","6","1","2","3",".","0"];

	constructor(private calculatorService: CalculatorService) { }

	ngOnInit() {
		this.getPushUpData();

 	}
	dataChanged(event) {
 		 	this.currentWeek = event.target.selectedOptions[0].innerHTML.replace(/\D/g,'');
	    this.currentAmount = event.target.value;
	}
	delete (){
		if(this.currentAmount.length > 0){
			this.currentAmount = this.currentAmount.slice(0,-1)
			if(this.currentAmount == ''){
				this.currentAmount = 0;
			};
		}
		else {
			this.currentAmount = 0;
		}
	}
	clickedEvent(event) {
 	if (event.target.innerHTML === '.'){
			alert("Half Pushups!")
		}
		else {
			if (this.currentAmount == '0'){
				this.currentAmount = (event.target.innerHTML);
			}
			else {
				this.currentAmount = this.currentAmount + (event.target.innerHTML);

			}
		}
		if(this.currentAmount > this.maxAmount ){
			alert("You have exceeded the maxAmount of Pushups");
			this.delete();
		}
	}

	getPushUpData() {
	  this.calculatorService.getPushUpData()
	    .subscribe((data: PushUpItem[]) => {
				this.pushUpData = data["pushups"];
				this.currentAmount = 0;
			}, error => {
				this.fetchingError = true;
				this.error = error;
			});
	}

	updateOrCreatePushUpData(e){
		if(e == 'update'){
			this.calculatorService.updateOrCreatePushUpData(this.currentAmount, this.currentWeek)
		    .subscribe((data: PushUpItem[]) => {
					this.getPushUpData();
				}, error => {
				});
 		}
		else {
			this.newWeek = this.pushUpData.length + 1;
			this.currentAmount = this.newAmount;
			this.calculatorService.updateOrCreatePushUpData(this.newAmount, this.newWeek)
			.subscribe((data: PushUpItem[]) => {
			 this.getPushUpData();
		 }, error => {
		 });
		}
	}
}
