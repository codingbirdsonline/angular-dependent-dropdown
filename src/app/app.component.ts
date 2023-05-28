import { Component, OnInit } from '@angular/core';
import { DropdownService } from './services/dropdown.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Country-State-City Dropdown';
  public loading = false;
  public dropdownForm!: FormGroup;
  public countries: any[] = [];
  public states: any[] = [];
  public cities: any[] = [];

  constructor(
    private dropdownService: DropdownService,
    private formBuiler: FormBuilder
  ) {}
  ngOnInit(): void {
    /**
     * Intialize form with default value null
     */
    this.dropdownForm = this.formBuiler.group({
      country: [null],
      state: [null],
      city: [null],
    });
    /**
     * load all country data at page load
     */
    this.getCountries();
  }
  /**
   * loads all country data
   * @returns void
   */
  private getCountries() {
    this.loading = true;
    this.dropdownService.getCountries().subscribe(
      (response) => {
        this.countries = response.data;
        console.log(this.countries);
        this.loading = false;
      },
      (error) => {
        console.log('Something went wrong: ', error);
      }
    );
  }

  /**
   * Selects country, and gets the states for it
   * @param country
   * @returns void
   */
  public selectCountry(country: any) {
    if (!country) {
      this.dropdownForm.controls['state'].setValue('');
      this.dropdownForm.controls['city'].setValue('');
      this.states = [];
      this.cities = [];
      return;
    }
    this.loading = true;
    const countryId = parseInt(country);
    this.dropdownService.getStates(countryId).subscribe(
      (response) => {
        this.states = response.data;
        this.loading = false;
      },
      (error) => {
        console.log('Something went wrong: ', error);
      }
    );
  }

  /**
   * Selects the state and gets cities for it
   * @param state
   * @returns void
   */
  public selectState(state: any) {
    if (!state) {
      this.dropdownForm.controls['city'].setValue('');
      this.cities = [];
      return;
    }
    this.loading = true;
    const stateId = parseInt(state);
    this.dropdownService.getCities(stateId).subscribe(
      (response) => {
        this.cities = response.data;
        this.loading = false;
      },
      (error) => {
        console.log('Something went wrong: ', error);
      }
    );
  }
}
