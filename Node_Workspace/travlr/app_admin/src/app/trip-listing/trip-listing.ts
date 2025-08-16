import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trips } from '../data/trips';
import { TripCard } from '../trip-card/trip-card';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data';
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
  providers: [TripDataService]
})
export class TripListing implements OnInit {
  trips!: Trip[];
  message: string = '';

  constructor(
    private TripData: TripDataService,
    private router: Router,
    private authenticationService: Authentication) {
    console.log('trip-listing constuctor');
   }
  
  public addTrip(): void {
    console.log('addTrip');
    this.router.navigate(['add-trip']);
  }

  private getStuff(): void {
    this.TripData.getTrips().subscribe({
      next: (data: any) => {
        this.trips = data;
        if(data.length > 0) {
          this.message = 'There are ' + data.length + ' trips available';
        } else {
          this.message = 'There were no trips retrieved from the database';
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }

  public isLoggedIn(){
    return this.authenticationService.isLoggedIn();
  }

}