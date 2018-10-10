import { Subject } from 'rxjs';

export class UsersService {
	// observable és observer is egyben
	userActivated = new Subject();
}
