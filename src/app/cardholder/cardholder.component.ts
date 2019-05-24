import { Component } from '@angular/core';

@Component({
  selector: 'app-cardholder',
  templateUrl: './cardholder.component.html',
  styleUrls: ['./cardholder.component.css']
})
export class CardholderComponent {

  cards = [
    {title: 'Calendar', image: 'assets/img/app-icons/calendar.png'},
    {title: 'Chrome', image: 'assets/img/app-icons/chrome.png'},
    {title: 'Drive', image: 'assets/img/app-icons/drive.png'},
    {title: 'Earth', image: 'assets/img/app-icons/earth.png'},
    {title: 'Gmail', image: 'assets/img/app-icons/gmail.png'},
    {title: 'Google', image: 'assets/img/app-icons/google.png'},
    {title: 'Maps', image: 'assets/img/app-icons/maps.png'},
    {title: 'Photos', image: 'assets/img/app-icons/photos.png'},
    {title: 'Play Music', image: 'assets/img/app-icons/play-music.png'},
    // {title: 'Play Store', image: 'assets/img/app-icons/play-store.png'}
  ];

}
