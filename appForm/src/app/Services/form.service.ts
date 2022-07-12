import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Table } from '../Models/Table';
import { Time } from '../Models/Time';
import { Reserve } from '../Models/Reserve';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http:HttpClient) { }

  getTable():Observable<Table[]>{

    return  this.http.get<Table[]>("http://localhost:3000/tables").pipe(tap(data=>console.log(data)),catchError(this.HandleError));
  }

  getTime():Observable<Time[]>{

    return  this.http.get<Time[]>("http://localhost:3000/times").pipe(tap(data=>console.log(data)),catchError(this.HandleError));
  }

  getForm():Observable<Reserve[]>{

    return  this.http.get<Reserve[]>("http://localhost:3000/reserves").pipe(tap(data=>console.log(data)),catchError(this.HandleError));
  }


  postForm(reserve:any):Observable<any>{


    const httpOption={
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Token'
      })
    }

    return  this.http.post<any>("http://localhost:3000/reserves",
      reserve,httpOption).pipe(tap(data=>console.log(data)),catchError(this.HandleError));
  }


  private HandleError(error: HttpErrorResponse)
  {

    if(error.error instanceof ErrorEvent)
    {

      alert("Error: "+ error.error.message);

    }
    else{

      switch (error.status) {
        case 404:
                alert("404 Error: \n"+ error.message);
          break;

          case 403:
            alert("403 Error: \n"+ error.message);
           break;

           case 500:
            alert("500 Error: \n"+ error.message);
           break;

        default:
          alert("Some unknow Error: \n"+ error.message);
      }
    }
    return throwError(()=>new Error ("from HandleError: "+error.message));
  }
}
