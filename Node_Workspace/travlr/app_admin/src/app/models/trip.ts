export interface Trip {
  _id: string; // Unique identifier for the trip
  code: string; // Code for the trip
  name: string; // Name of the trip
  length: string; // Length of the trip
  start: Date; // Start date of the trip
  resort: string; // Resort associated with the trip
  perPerson: string; // Price per person for the trip
  image: string; // Image URL for the trip
  description: string; // Description of the trip
}