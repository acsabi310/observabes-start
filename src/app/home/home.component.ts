import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, Observer, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

	numbersObsSubscription: Subscription;
	customObsSubscription: Subscription;

	constructor() { }

	ngOnInit() {
		// Observable
		// + Operators
		const myNumbers = interval(1000)
			// operátorok láncolhatóak pipe-al!
			.pipe(map(
				(data: number) => {
					return data * 2;
				}
			));
		this.numbersObsSubscription = myNumbers.subscribe(
			(number: number) => {
				console.log(number);
			}
		);

		const myObserable = Observable.create((observer: Observer<string>) => {
			setTimeout(() => {
				observer.next('first package');
			}, 2000);
			setTimeout(() => {
				observer.next('second package');
			}, 4000);
			setTimeout(() => {
				// observer.error('not work');
				observer.complete();
			}, 5000);
			// never arrives
			setTimeout(() => {
				observer.next('third package');
			}, 6000);
		});

		this.customObsSubscription = myObserable.subscribe(
			(data: string) => { console.log(data); },
			(error: string) => { console.log(error); },
			() => {console.log('completed'); }
		);
	}

	ngOnDestroy() {
		this.numbersObsSubscription.unsubscribe();
		this.customObsSubscription.unsubscribe();
	}
}
