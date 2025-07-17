import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommentRequest, CommentResponse} from '../../model/Interaction';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private static readonly COMMENT_URL = 'http://localhost:8095/api/v1/comments'
  private commentsSubject = new BehaviorSubject<CommentResponse[]>([]);
  comments$ = this.commentsSubject.asObservable();

  private repliesSubject = new BehaviorSubject<CommentResponse[]>([]);
  replies$ = this.repliesSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  postComment(productId: number, content: string, parentCommentId: string){
    let comment: CommentRequest = {
      productId: productId, userId: '1', userName: 'Nguyen Van Sung', userAvatarUrl: 'https://untitledui.com/images/avatars/transparent/byron-robertson', content: content, parentCommentId: parentCommentId
    }
    this.httpClient.post<CommentResponse>(CommentService.COMMENT_URL, comment)
      .subscribe(comment => {
        if(comment.parentCommentId === null || comment.parentCommentId === ''){
          const currentComments = this.commentsSubject.getValue()
          const updatedComment = [comment, ...currentComments]
          this.commentsSubject.next(updatedComment)
        }else{
          const currentReply = this.repliesSubject.getValue()
          const updatedReply = [comment, ...currentReply]
          this.repliesSubject.next(updatedReply)
        }
      });
  }

  deleteComment(id: number){
    this.httpClient.delete(CommentService.COMMENT_URL)
      .subscribe(() => {

      })
  }

  loadComments(productId: number) {
    this.httpClient.get<CommentResponse[]>(`${CommentService.COMMENT_URL}/${productId}`)
      .subscribe(comments => {
        this.commentsSubject.next(comments);
      });
  }

  loadReplyComments(parrentCommentId: string) {
    this.httpClient.get<CommentResponse[]>(`${CommentService.COMMENT_URL}/reply/${parrentCommentId}`)
      .subscribe(comments => {
        this.repliesSubject.next(comments);
      });
  }
}
