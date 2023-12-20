import { BehaviorSubject, Observable, map } from 'rxjs';
import { State } from './state';
import { distinctUntilChanged } from 'rxjs';
/**
 *
 * store.set('todos', [{},{}])
 *
 * store.select('todos')
 */

const state: State = {
  playlist: [],
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(
      map((store: any) => {
        type StoreKey = keyof typeof store;
        let key: StoreKey = name;
        return store[key];
      })
    );
  }
  set(name: string, state: any) {
    this.subject.next({
      ...this.value,
      [name]: state,
    });
  }
}
