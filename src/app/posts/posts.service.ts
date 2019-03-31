import { Post } from './post.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl + '/posts';
const HOST_URL = environment.hostUrl;

@Injectable({providedIn: 'root'})

export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts: Post[], postCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string, posts: any, maxPosts: number }>(
        API_URL + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                createdAt: post.createdAt,
                imagePath: HOST_URL + post.imagePath,
                user: post.user
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe((transformedPostsData) => {
        this.posts = transformedPostsData.posts;
        this.postsUpdated.next({
            posts: [...this.posts],
            postCount: transformedPostsData.maxPosts
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    console.log(id);
    return this.http.get<{
      _id: string,
      title: string,
      content: string,
      imagePath: string,
      user: string,
     }>(API_URL + '/' + id
    );
  }

  addPost(postTitle: string, postContent: string, image: File) {
    const postData = new FormData();
    postData.append('title', postTitle);
    postData.append('content', postContent);
    postData.append('image', image, postTitle);

    this.http
      .post<{message: string, postId: string, post: any}>(API_URL, postData)
      .subscribe(responseData => {
        this.router.navigate(['/posts']);
      });
  }

  updatePost(id: string, postTitle: string, postContent: string, image: any) {
    let postData: Post | FormData;
    if (typeof(image) === 'object') {
     postData = new FormData();
     postData.append('title', postTitle);
     postData.append('content', postContent);
     postData.append('image', image, postTitle);
   } else {
     postData = {
        id,
        title: postTitle,
        content: postContent,
        imagePath: image,
        user: null
     };
   }

    this.http.put(API_URL + '/update/' + id, postData)
      .subscribe(response => {
        this.router.navigate(['/posts']);
    });
  }

  deletePost(postId: string) {
    return this.http.delete(API_URL + '/' + postId);
  }
}
