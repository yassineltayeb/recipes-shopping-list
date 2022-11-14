import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../auth/models/user.mode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  isAuthenticated: boolean;

  constructor(private dataStorageService: DataStorageService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user: User) => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
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
