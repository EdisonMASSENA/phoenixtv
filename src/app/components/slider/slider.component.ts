import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input() sliderConfig: any;
  @Input() films : any;
  @Input() cat: any;
  @Input() type: any;

  constructor() { }

  ngOnInit(): void {
  }

}
