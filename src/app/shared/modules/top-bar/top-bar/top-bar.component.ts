import {Component, OnInit} from '@angular/core';
import {isObservable} from 'rxjs/internal-compatibility';
import {Observable} from 'rxjs';
import {CurrentUserInterface} from '../../../types/currentUser.interface';
import {select, Store} from '@ngrx/store';
import {currentUserSelector, isAnonymousSelector, isLoggedInSelector} from '../../../../auth/store/selectors';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  isLogedIn$: Observable<boolean>;
  isAnonymous$: Observable<boolean>;
  currentUser$: Observable<CurrentUserInterface | null>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.isLogedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector));
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
  }

}
