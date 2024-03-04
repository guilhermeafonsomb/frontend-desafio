import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../../shared/services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
          console.error('Client side error:', error.error.message);
        } else {
          console.error(
            `Server side error: code ${error.status}, ` +
              `message: ${error.message}`
          );

          if (error.error.message) {
            errorMessage = error.error.message;
          }
        }
        this.notificationService.showError(errorMessage, 'Erro');
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
