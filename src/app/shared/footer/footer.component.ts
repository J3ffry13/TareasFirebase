import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {

  date = new Date();
  year: any

  ngOnInit() {
    this.year = this.date.getFullYear();    
  }
}
