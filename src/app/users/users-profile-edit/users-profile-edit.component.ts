import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from '../../helpers/mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserProfile } from '../user-profile.model';
import { UserService } from '../users.service';

@Component({
  selector: 'app-users-profile-edit',
  templateUrl: './users-profile-edit.component.html',
  styleUrls: ['./users-profile-edit.component.css']
})
export class UsersProfileEditComponent implements OnInit {
  userProfile: UserProfile;
  isLoading = false;
  imagePreview: any;
  form: FormGroup;
  userId = null;
  private profileId: string;
  private authStatusSub: Subscription;

  constructor(
    public userService: UserService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Reactive form
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });

    this.userId = this.authService.getUserId();

    this.form = new FormGroup({
      firstName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      lastName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      about: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      sex: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    if (this.userId) {
      this.profileId = this.userId;
      this.isLoading = true;
      this.userService.getProfile(this.userId).subscribe(profileData => {
        this.isLoading = false;
        this.userProfile = {
          id: profileData.profile._id,
          firstName: profileData.profile.firstName,
          lastName: profileData.profile.lastName,
          about: profileData.profile.about,
          imagePath: profileData.imagePath,
          sex: profileData.profile.sex,
          createdAt: profileData.profile.createdAt,
          profileCreated: profileData.profile.profileCreated
        };
        this.form.setValue({
          firstName: this.userProfile.firstName || null,
          lastName: this.userProfile.lastName || null,
          about: this.userProfile.about || null,
          sex: this.userProfile.sex || null,
          image: this.userProfile.imagePath || null
        });
        this.imagePreview =  profileData.imagePath;
      });
    } else {
      this.profileId = null;
    }
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onUpdateProfile() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.userService.updateUserProfile(
      this.userId,
      this.form.value.firstName,
      this.form.value.lastName,
      this.form.value.about,
      this.form.value.image,
      this.form.value.sex,
      null,
      true
    );
  }
}
