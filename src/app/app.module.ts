import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { JsonComponent } from './json/json.component';

const appRoutes: Routes =
	[{
		path: 'home',
		component: HomeComponent,
	},
	{
		path: 'calculator',
		component: CalculatorComponent,
	}];

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		CalculatorComponent,
		JsonComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		RouterModule.forRoot(appRoutes),
		HttpClientModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
