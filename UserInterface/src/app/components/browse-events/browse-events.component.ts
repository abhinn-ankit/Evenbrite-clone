import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Events } from '../../models/events';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-browse-events',
  templateUrl: './browse-events.component.html',
  styleUrls: ['./browse-events.component.scss']
})
export class BrowseEventsComponent implements OnInit {

  events: Events[] = [];
  endReached: boolean;
  start: number;
  limit: number;
  prefix: string;

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute
  ) {
    this.start = 0;
    this.limit = 5;
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    if (!this.route.params['_value'].category) {
      window.addEventListener('scroll', this.scroll, true);
      this.getEvents(this.start, this.limit);
    } else {
      this.eventsService.getEventsByCategory(this.route.params['_value'].category)
        .subscribe((data: Events[]) => {
          this.events = data;
          const firstChar = this.route.params['_value'].category.charAt(0).toUpperCase();
          const restoftheWord = this.route.params['_value'].category.slice(1).toLowerCase();
          this.prefix = `${firstChar + restoftheWord} realted `;
        }, error => console.error(error));
    }
  }

  scroll = (): void => {
    if ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 75)) {
      if (!this.endReached) {
        this.start += this.limit;
        this.getEvents(this.start, this.limit);
      }
    }
  }

  getEvents(start: number, limit: number) {
    this.eventsService.getEvents(start, limit)
      .subscribe((data: Events[]) => {
        data.forEach(element => {
          this.events.push(element);
        });
        if (!data) {
          this.endReached = true;
        } else if (!Array.isArray(data)) {
          this.endReached = true;
        } else if (Array.isArray(data) && data.length < this.limit) {
          this.endReached = true;
        } else if (data.length === this.limit) {
          this.endReached = false;
        }
      }, error1 => console.error(error1));
  }

}
