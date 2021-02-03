import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';


import {FeedService} from '../../services/feed.services';
import {AuthService} from '../../../../../auth/services/auth.service';
import {getFeedAction, getFeedFailureAction, getFeedSuccessAction} from '../actions/get-feed.action';
import {GetFeedResponseInterface} from '../../types/get-feed-response.interface';


@Injectable()
export class GetFeedEffect {
  getFeed$ = createEffect(() => this.actions$.pipe(
    ofType(getFeedAction),
    switchMap(({url}) => {
        return this.feedService.getFeed(url)
          .pipe(map((feed: GetFeedResponseInterface) => {
              return getFeedSuccessAction({feed});
            }), catchError(() => {
              return of(getFeedFailureAction());
            })
          );
      }
    ))
  );

  constructor(private actions$: Actions,
              private authService: AuthService,
              private feedService: FeedService
  ) {
  }
}
