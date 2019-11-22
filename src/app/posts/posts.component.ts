import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { AppError } from './common/app-error';
import { NotFoundError } from '../common/not-found-error';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {
  posts: any[];
  constructor(private service: PostService) { }

  ngOnInit() {
    this.service.getPosts()
      .subscribe(response => {
        this.posts = response;

      },
        error => {
          alert('An unexpected error occured');
          console.log(error);
        });
  }

  createPost(input: HTMLInputElement) {
    let post = { title: input.value };
    input.value = '';
    this.service.createPost(post)
      .subscribe(
        response => {
          post['id'] = response;
          this.posts.splice(0, 0, post);
        },
        (error: Response) => {
          if(error.status ===400) {
         // this.form.setErrors(error.json());
          }
          else {
          alert('Problem in creating the post');
          console.log(error);
        }
        });
  }

  updatePost(post) {
    this.service.updatePost(post)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          alert('Problem in updating the post');
          console.log(error);
        });
  }

  deletePost(post) {
    this.service.deletePost(345)
      .subscribe(
        response => {
          let index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
        },
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            alert('This post has already been deleted');
          } else {
            alert('Problem in deleting the post');
            console.log(error);
          }
        });
  }

}
