import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from '../users.service';
import { UserProfile } from '../user-profile.model';

@Component({
  selector: 'app-users-profile-view',
  templateUrl: './users-profile-view.component.html',
  styleUrls: ['./users-profile-view.component.css']
})
export class UsersProfileViewComponent implements OnInit {
  isLoading = false;
  userProfile: UserProfile;
  imagePreview: any;
  userId: string;
  userIsAuthenticated = false;
  profileId: string;
  private authStatusSub: Subscription;
  private authListenerSubs: Subscription;

  constructor(
    public userService: UserService,
    public route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getAuthStatus();
    this.userId = this.authService.getUserId();

    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('userId')) {
        this.isLoading = true;
        this.profileId = paramMap.get('userId');
        console.log('Profile ID', this.profileId);
        console.log('User ID', this.userId);

        this.userService.getProfile(this.userId).subscribe(profileData => {
          this.isLoading = false;
          this.userProfile = {
            id: profileData.profile._id,
            firstName: profileData.profile.firstName,
            lastName: profileData.profile.lastName,
            about: profileData.profile.about,
            imagePath: profileData.imagePath,
            sex: profileData.profile.sex,
            createdAt: profileData.profile.createdAt
          };
          this.imagePreview =  profileData.imagePath;
        });
      }
    });
  }
}
