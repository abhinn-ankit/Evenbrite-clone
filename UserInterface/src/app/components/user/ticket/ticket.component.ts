import { Component, OnInit } from '@angular/core';
import { UserAccountService } from '../../../services/userAccount.service';
import { UserAccount } from '../../../models/userAccount';
import { BookingService } from '../../../services/booking.service';
import { Booking } from '../../../models/Booking';
import { el } from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: [ './ticket.component.scss' ]
})
export class TicketComponent implements OnInit {

  user: UserAccount;
  hasBooking: boolean;
  bookings: Booking[];

  constructor(private userAccountService: UserAccountService, private bookingService: BookingService) {
  }

  ngOnInit() {
    let id: string;
    this.userAccountService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        id = data['_id'];
        this.bookingService.getBookingByUserId(id)
          .subscribe(result => {
            console.log(result);
            this.bookings = result.reverse();
            this.hasBooking = true;
          });
      }, error => console.error(error));
  }

}
