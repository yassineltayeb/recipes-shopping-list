import { AuthService } from './../auth/auth.service';
import { Subscription } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../auth/models/user.mode';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userSub: Subscription;
  isAuthenticated: boolean;

  constructor(private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.userSub = this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user;
      })
    )
      .subscribe((user: User) => {
        this.isAuthenticated = !!user;
      });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.getRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
