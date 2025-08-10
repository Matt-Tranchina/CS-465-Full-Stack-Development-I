import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrls: ['./trip-card.css']
})
export class TripCard implements OnInit {
  @Input('trip') trip: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialization logic can go here
  }

  public editTrip(trip: Trip) {
    console.log('editTrip: ' + trip.code);
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(['edit-trip']);
  }

}
