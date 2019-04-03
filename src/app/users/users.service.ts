import { UserProfile } from './user-profile.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl + '/users';
const HOST_URL = environment.hostUrl;

@Injectable({ providedIn: 'root' })
export class UserService {
  private userProfile: UserProfile[] = [];
  private profileUpdated = new Subject<{ profile: UserProfile[] }>();

  constructor(private http: HttpClient, private router: Router) {}

  getProfileUpdateListener() {
    return this.profileUpdated.asObservable();
  }

  getProfile(id: string) {
    return this.http.get<{
      profile: {
        _id: string;
        firstName: string;
        lastName: string;
        about: string;
        sex: string;
        createdAt: any;
      },
      imagePath: string;
    }>(API_URL + '/' + id);
  }

  updateUserProfile(
    id: string,
    firstName: string,
    lastName: string,
    about: string,
    image: any,
    sex: any,
    createdAt: any
  ) {
    let postData: UserProfile | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('firstName', firstName);
      postData.append('lastName', lastName);
      postData.append('about', about);
      postData.append('sex', sex);
      postData.append('image', image, lastName);
    } else {
      postData = {
        id,
        firstName,
        lastName,
        about,
        imagePath: image,
        createdAt,
        sex
      };
    }

    this.http.put(API_URL + '/update/' + id, postData).subscribe(response => {
      this.router.navigate(['/user', id]);
    });
  }

  deleteProfile(postId: string) {
    return this.http.delete(API_URL + '/' + postId);
  }
}
