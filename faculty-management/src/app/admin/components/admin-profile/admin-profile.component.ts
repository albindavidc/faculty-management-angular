import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectProfile,
  selectProfileLoading,
  selectProfileError,
} from './store/profile.selectors';
import { ProfileActions } from './store/profile.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-profile',
  imports: [CommonModule],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent implements OnInit {
  admin$: Observable<any>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.admin$ = this.store.select(selectProfile);
    this.loading$ = this.store.select(selectProfileLoading);
    this.error$ = this.store.select(selectProfileError);
  }

  ngOnInit(): void {
    this.store.dispatch(ProfileActions.loadProfiles());
    console.log('this is the frontend' + this.admin$);
  }
}
