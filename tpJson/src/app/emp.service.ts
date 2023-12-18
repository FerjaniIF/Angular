import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpService {

  constructor(private http: HttpClient) { }

  public postEmployees(data : any){
    return this.http.post<any>('http://localhost:3000/posts', data)
    .pipe(map((res:any) => {
      return res;
    }))
  }

  public getEmployee(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/posts')
    .pipe(map((res:any) => {
      return res;
    }))
  }

  public updateEmployee(data:any , id:number){
    return this.http.put<any>('http://localhost:3000/posts/'+id,data)
    .pipe(map((res:any) => {
      return res;
    }))
  }

  public deleteEmployee(id: number) {
    return this.http.delete<any>('http://localhost:3000/posts/' + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  
}
