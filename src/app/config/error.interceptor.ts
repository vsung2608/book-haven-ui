import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {Inject} from '@angular/core';
import {catchError, throwError} from 'rxjs';
import {MessageService} from 'primeng/api';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService: MessageService = Inject(MessageService)
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = '';
      if(error.error instanceof ErrorEvent){
        message = "Lỗi phía client"
      }else{
        message = `${error.status} + ${error.message}`
      }
      messageService.add({ severity: 'danger', summary: 'Hệ thống', detail: message, life: 3000 })
      return throwError(() => new Error("Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau"))
    })
  )
}
