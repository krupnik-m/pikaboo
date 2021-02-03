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

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    EffectsModule.forFeature([GetFeedEffect]),
    StoreModule.forFeature('feed', reducers)
  ],
  declarations: [FeedComponent],
  exports: [FeedComponent],
  providers: [FeedService]
})

export class FeedModule {
}
