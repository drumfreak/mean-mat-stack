import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { AuthGuard } from './auth/auth.guard';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { WeatherComponent } from './weather/weather.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'posts/create', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'posts/edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'posts/:postId', component: PostDetailsComponent },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'user', loadChildren: './users/users.module#UsersModule' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
