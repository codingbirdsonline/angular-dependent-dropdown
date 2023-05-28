import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  // Update your API path here
  private BASE_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  /**
   * Fetch All Countries
   * @returns Observable
   */
  public getCountries(): Observable<any> {
    return this.http.get<any>(this.BASE_URL + 'getcountry');
  }
  /**
   * Get states for a country
   * @param countryId
   * @returns Observable
   */
  public getStates(countryId: number): Observable<any> {
    return this.http.get<any>(
      this.BASE_URL + 'getstate&country_id=' + countryId
    );
  }
  /**
   * Get cities for a state
   * @param stateId
   * @returns Observable
   */
  public getCities(stateId: number): Observable<any> {
    return this.http.get<any>(this.BASE_URL + 'getcity&state_id=' + stateId);
  }
}
