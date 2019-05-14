import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from '../../models/events';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: [ './event-details.component.scss' ]
})
export class EventDetailsComponent implements OnInit {
  allEvnts: Array<Events>;
  evtInfo: Events;
  evtId: string;
  newDate: Date;
  cost: any;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.eventService.getEventsByDate()
      .subscribe(
        (data: Events[]) => {
          this.allEvnts = data.slice();
          this.getEvntDetail();
          if (!this.evtInfo) {
            this.router.navigateByUrl('/error');
          }
        },
        error1 => console.error(error1)
      );
  }

  async getEvntDetail() {
    this.evtId = this.route.params[ '_value' ].id;
    await this.allEvnts.forEach(evt => {
      if (evt._id === this.evtId) {
        this.evtInfo = evt;
        if (this.evtInfo.cost === 0) {
          this.cost = 'Free';
        } else {
          this.cost = `$${this.evtInfo.cost}`;
        }
        this.newDate = new Date(evt.date);
      }
    });
  }
}
