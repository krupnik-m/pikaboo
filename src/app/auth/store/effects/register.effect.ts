import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';

import {AuthService} from '../../services/auth.service';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {registerAction, registerFailureAction, registerSuccessAction} from '../../actions/register.actions';
import {PersistanceService} from '../../../shared/services/persistense.service';


@Injectable()
export class RegisterEffect {
  register$ = createEffect(() => this.actions$.pipe(
    ofType(registerAction),
    switchMap(({request}) => {
        return this.authService.register(request)
          .pipe(map((currentUser: CurrentUserInterface) => {
              this.persistanceService.set('accessToken', currentUser.token);

              return registerSuccessAction({currentUser});
            }), catchError((errorResponse: HttpErrorResponse) => {
              return of(registerFailureAction({errors: errorResponse.error.errors}));
            })
          );
      }
    ))
  );

  redirectAfterSubmit$ = createEffect(() => this.actions$.pipe(
    ofType(registerSuccessAction),
    tap(() => {
      this.router.navigateByUrl('/');
    })
    ),
    {dispatch: false});

  constructor(private actions$: Actions,
              private  authService: AuthService,
              private persistanceService: PersistanceService,
              private router: Router

) {
}
}
