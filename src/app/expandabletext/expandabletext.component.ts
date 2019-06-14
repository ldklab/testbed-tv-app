import { Component, OnInit, Input } from '@angular/core';
import { text } from '@angular/core/src/render3';

@Component({
  selector: 'app-expandabletext',
  templateUrl: './expandabletext.component.html',
  styleUrls: ['./expandabletext.component.css']
})
export class ExpandabletextComponent implements OnInit {

  @Input('expandText') expandText: string;
  @Input('hideText') hideText: string;
  @Input('content') content: string;
  show = false;
  text: string;

  constructor() { }

  ngOnInit() {
    this.text = this.expandText;
  }

  toggle() {
    this.show = !this.show;
    console.log("Button clicked, show: " + this.show);
    this.text = this.show ? this.hideText : this.expandText;
  }

}
