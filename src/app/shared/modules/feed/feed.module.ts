import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {FeedComponent} from './components/feed/feed.component';
import {GetFeedEffect} from './store/effects/get-feed.effect';
import {reducers} from './store/reducers';
import {FeedService} from './services/feed.services';
import {ErrorMessageModule} from "../error-message/error-message.module";
import {LoadingModule} from "../loading/loading.module";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    EffectsModule.forFeature([GetFeedEffect]),
    StoreModule.forFeature('feed', reducers),
    ErrorMessageModule,
    LoadingModule
  ],
  declarations: [FeedComponent],
  exports: [FeedComponent],
  providers: [FeedService]
})

export class FeedModule {
}
