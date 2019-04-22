import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'https://api-tesis-clincker.herokuapp.com/api';
  //private baseUrl = 'http://localhost:53617/api';

  public ventas: any[] = [];
  public productos: any[] = [];
  public pedidos: any[] = [];
  public usuarios: any[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getAsync = (uri: string, dataCollection: any[]) => Observable.create(observer => {
    this.http.get(`${this.baseUrl}/${uri}`)
      .subscribe(data => {
        dataCollection = [];
        for (const d of data as any[]) {
          dataCollection.push(d);
        }
        observer.next(dataCollection);
        observer.complete();
      });
  })

  createAsync = (uri: string, object: any, dataCollection: any[]) => Observable.create(observer => {
    this.http.post(`${this.baseUrl}/${uri}`, object)
      .subscribe(result => {
        // TODO result deberia traer el id del nuevo objeto insertado
        // object['id] = result.id;
        dataCollection.push(object);
        observer.next(dataCollection);
        observer.complete();
      });
  })

  updateAsync = (uri: string, object: any, dataCollection: any[]) => Observable.create(observer => {
    this.http.post(`${this.baseUrl}/${uri}`, object)
      .subscribe(result => {
        // TODO probar que esto funcione. Se asume que la primary key de las tablas sea 'id'
        const objectToUpdate = dataCollection.filter(x => x.id === object.id)[0];
        const objectIndex = dataCollection.indexOf(objectToUpdate);
        dataCollection[objectIndex] = object;

        observer.next(result);
        observer.complete();
      });
  })
}
