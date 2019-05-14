import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, } from 'rxjs/operators';
import { Events } from '../models/events';
import { throwError } from 'rxjs';

@Injectable()
export class EventsService {

  events: Events[];
  url = 'http://localhost:3000/events';

  constructor(private http: HttpClient) {
  }

  getEventsByCategory(category: string) {
    return this.http.get<EventsResponse>(`${this.url}/${category}`)
      .pipe(map(data => {
        this.events = data.obj.slice();
        return this.events;
      }), catchError(
        error => throwError(error.error)
      ));
  }

  getEventsByDate() {
    return this.http.get<EventsResponse>(this.url)
      .pipe(map(data => {
        this.events = data.obj.slice();
        return this.events;
      }), catchError(
        error => throwError(error.error)
      ));
  }

  getEventsByID(id: string) {
    const parameters = `${this.url}/byID/${id}`;
    return this.http.get<EventRes>(parameters)
      .pipe(map(data => {
        const evt = new Events(data.obj._id,
          data.obj.name, data.obj.description,
          data.obj.imageLink, data.obj.category,
          data.obj.streetAddress, data.obj.location,
          data.obj.date, data.obj.cost);
        return evt;
      }), catchError(
        error => error
      ));
  }

  getEvents(skip: number, limit: number) {

    const parameters = `/start/${skip}/limit/${limit}`;
    return this.http.get<EventsResponse>(this.url + parameters)
      .pipe(map(data => {
        this.events = data.obj.slice();
        return this.events;
      }), catchError(
        error => throwError(error.error)
      ));
  }
}

interface EventsResponse {
  msg: string;
  obj: Array<Events>;
}

interface EventRes {
  msg: string;
  obj: Events;
}
