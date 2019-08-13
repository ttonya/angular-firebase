import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly location: Location
  ) {
  }

  ngOnInit() {
    if (this.location.path() === '/todo') {
      this.router.navigate(['/todo', this.generateId()]);
    }
  }

  public generateId(): string {
    return Math.floor((Math.random() * 1000)).toString();
  }
}
