import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Booking } from '../models/Booking';
import { throwError } from 'rxjs';

@Injectable()
export class BookingService {

  constructor(
    private http: HttpClient
  ) {
  }

  url = 'http://localhost:3000/bookings';

  getBookingByUserId(userId: string) {
    return this.http.get<BookingsResponse>(`${this.url}/byUser/${userId}`)
      .pipe(map(data => {
          console.log(data.obj);
          return data.obj;
        }, catchError(err => throwError(err.error)))
      );
  }

  getBookingById(id: string) {
    return this.http.get<BookingResponse>(`${this.url}/byId/${id}`)
      .pipe(map(data => {
          console.log(data);
          return data.obj;
        }, catchError(err => throwError(err.error)))
      );
  }

  updateBooking(booking: Booking) {
    console.log(booking);
    const body = JSON.stringify(booking);
    console.log(body);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.url}`, body, {headers: headers})
      .pipe(map(result  => result));
  }

}

interface BookingResponse {
  message: string;
  obj: Booking;
}

interface BookingsResponse {
  message: string;
  obj: Booking[];
}
