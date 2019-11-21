import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'http://jsonplaceholder.typicode.com/posts';


  constructor(private http: HttpClient) { }

  getPosts()
  {
   return this.http.get(this.url);
  }

  createPost()
  {
    return this.http.post(this.url, JSON.stringify(post))
  }

  updatePost()
  {
    this.http.delete(this.url + '/' + post.id)
  }

  deletepost()
  {
    this.http.delete(this.url + '/' + post.id)
  }
}
