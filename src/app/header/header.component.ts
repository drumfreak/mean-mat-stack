import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  userId: string;
  userProfile: any;
  private authListenerSubs: Subscription;

  constructor(
      private authService: AuthService,
      private breakpointObserver: BreakpointObserver,
      public userService: UserService
    ) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getAuthStatus();
    this.userId = this.authService.getUserId();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

    if (this.userIsAuthenticated) {
      if (this.userId) {
        this.userService.getProfile(this.userId).subscribe(profileData => {
          this.userProfile = {
            id: profileData.profile._id,
            firstName: profileData.profile.firstName,
            lastName: profileData.profile.lastName,
            about: profileData.profile.about,
            imagePath: profileData.imagePath,
            sex: profileData.profile.sex,
            createdAt: profileData.profile.createdAt
          };
        });
      }
    }
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
