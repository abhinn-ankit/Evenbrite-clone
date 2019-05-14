import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../../services/events.service';
import { Booking } from '../../../models/Booking';
import { UserAccountService } from '../../../services/userAccount.service';
import { UserAccount } from '../../../models/userAccount';
import { BookingService } from '../../../services/booking.service';
import { Events } from '../../../models/events';

@Component({
  selector: 'app-review-payment',
  templateUrl: './review-payment.component.html',
  styleUrls: [ './review-payment.component.scss' ]
})
export class ReviewPaymentComponent implements OnInit {

  evt: Events;
  cost: string;
  totalCost: any;
  qty: number;
  zero: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService,
    private userAccountService: UserAccountService,
    private bookingService: BookingService
  ) {
  }

  ngOnInit() {
    if (this.route.params[ '_value' ].eventId) {
      this.eventsService.getEventsByDate()
        .subscribe((data: Events[]) => {
          console.log(data);
          data.forEach(e => {
            if (e._id === this.route.params['_value'].eventId) {
              this.evt = e;
            }
          });
          this.cost = this.evt.cost !== 0 ? `${this.evt.cost}` : 'Free';
          if (this.cost === 'Free') {
            this.totalCost = 'Free';
          } else {
            this.totalCost = this.cost;
          }
        }, error => {
          console.log(error);
          this.router.navigate([ '/error' ]);
        });
    } else {
      this.router.navigate([ '/error' ]);
    }
  }

  findCost(quantity) {
    if (this.cost !== 'Free') {
      this.qty = parseInt(quantity, 10);
      this.totalCost = parseInt(this.cost.slice(), 10) * this.qty;
      if (this.totalCost === 0) {
        this.zero = true;
      } else {
        this.zero = false;
      }
    }
  }

  onBookNow() {
    let user: UserAccount;
    this.userAccountService.getCurrentUser().subscribe(
      (data: UserAccount) => {
        user = data;
        const booking = new Booking(
          this.evt,
          user,
          this.qty,
          this.totalCost,
          new Date()
        );
        this.bookingService.updateBooking(booking)
          .subscribe(result => {
            console.log(result);
            this.router.navigateByUrl('/home');
          });
      });
  }

}
