import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  template: `
    <h2>Contact Page</h2>
    <p>Welcome, {{ name }}!</p>
  `,
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  name: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name') || 'Guest';
  }
}
