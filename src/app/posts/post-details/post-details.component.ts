import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../posts.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  post: Post;
  isLoading = false;
  imagePreview: any;
  userId: string;
  userIsAuthenticated = false;
  private postId: string;
  private authStatusSub: Subscription;

  constructor(
    public postService: PostService,
    public route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.isLoading = true;
        this.postId = paramMap.get('postId');
        this.userId = this.authService.getUserId();
        this.userIsAuthenticated = this.authService.getAuthStatus();
        this.authStatusSub = this.authService
          .getAuthStatusListener()
          .subscribe(authStatus => {
            this.userIsAuthenticated = authStatus;
          });

        this.postService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath,
            createdAt: postData.createdAt,
            user: postData.user
          };
        });
      }
    });
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(
      () => {
        this.router.navigate(['/posts']);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
