import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoaderService } from './loader.service';
import { catchError, finalize, retry } from 'rxjs/operators';
import { UtilityService } from './utility.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  apiCount = 0;
  constructor(private loaderService: LoaderService, private utility: UtilityService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.showLoader(request, true);
    return next.handle(request)
      .pipe(
        retry(2), //call once more if the response is failed
        catchError(err => {
          // this.apiCount = 0;
          this.utility.setError(err.message)
          return this.handleError(err);
        }),
        finalize(() => {
          this.showLoader(request, false);
        })
      );
  }

  /****************************************************************
  * This Error Handler should be responsible to handle all error
  * if there is anything goes wrong (return error code like 404, 
  * oo1 etc) with api response. It will create a string with 
  * status and error message and return the message as observable.
  ***************************************************************/
  private handleError(err: any) {
    this.loaderService.hide();
    if (err instanceof HttpErrorResponse) {
      console.log(`Error - StatusCode: ${err.statusText}, Status text: ${err.statusText}, \r\n Message: ${err.message}`);
    }
    return of(err);
  }

  showLoader(request: HttpRequest<unknown>, show: boolean) {
    if (!this.utility.isNoLoadAPI(request.url)) {
      if (show) {
        this.apiCount++;
        // console.log(`${this.apiCount}-Request - ${request.url}`)
        this.loaderService.show();
      }
      else {
        this.apiCount--;
        // console.log(`${this.apiCount}-Response - ${request.url}`)
        if (this.apiCount <= 0)
          this.loaderService.hide();
      }
    }
  }

  /****************************************************************
  * This Error Handler should be responsible to handle all error
  * if there is anything goes wrong (return error code like 404, 
  * oo1 etc) with api response. It will create a string with 
  * status and error message and return the message as observable.
  ***************************************************************/
  // private handleError(error: Response | any, metho) {
  //   let errMsg: string;
  //   if (error instanceof Response) {
  //     const err = error || '';
  //     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //   } else {
  //     errMsg = error.message ? error.message : error.toString();
  //   }
  //   console.error(errMsg);

  //   return Observable.throw(errMsg);
  // }
}


