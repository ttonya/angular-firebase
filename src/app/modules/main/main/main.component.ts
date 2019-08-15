import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly location: Location
  ) {
  }

  public ngOnInit(): void {
    if (this.location.path() === '/todo' || this.location.path() === '') {
      this.router.navigate(['/todo', this.generateId()]);
    }
  }

  /**
   * Generates Id for a new list
   */
  public generateId(): string {
    return Math.floor((Math.random() * 11111)).toString();
  }
}
