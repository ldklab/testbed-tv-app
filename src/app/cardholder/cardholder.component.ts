import { Component, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cardholder',
  templateUrl: './cardholder.component.html',
  styleUrls: ['./cardholder.component.css']
})
export class CardholderComponent {

  showCards = true;
  videoReference = null;
  loadingVideo = false;
  videoUrl = null;

  allCards = [
    {title: 'Cats', image: 'assets/img/thumbnails/thumb1.webp', video: 'hY7m5jjJ9mM'},
    {title: 'More cats', image: 'assets/img/thumbnails/thumb2.webp', video: 'XyNlqQId-nk'},
    {title: 'AC/DC - Back In Black', image: 'assets/img/thumbnails/thumb3.webp', video: '6vImyP5EYc8'},
    {title: 'Arctic Monkeys - Do I Wanna Know?', image: 'assets/img/thumbnails/thumb4.webp', video: 'bpOSxM0rNPM'},
    {title: 'Kygo, Chelsea Cutler - Not Ok', image: 'assets/img/thumbnails/thumb5.webp', video: 'MFdzgnMOmlw'},
    {title: 'Avicii - Without You “Extended Mix” ft. Sandro Cavazza', image: 'assets/img/thumbnails/thumb6.webp', video: 'ZyYQQa2HlAI'},
    {title: 'Ron Burgundy Targets Shawn Mendes in His Stand-Up Debut', image: 'assets/img/thumbnails/thumb7.webp', video: 'JRgoVGu4WHQ'},
    {title: 'Bill Burr - Animation - Helicopter Bit', image: 'assets/img/thumbnails/thumb8.webp', video: 'S9ZSzuj1UpA'},
    {title: 'Dave Chappelle Pulls Off An Impossible Punchline | Netflix Is A Joke', image: 'assets/img/thumbnails/thumb9.webp', video: 'VHkHw-NQ5Wk'},
    // {title: 'Chrome', image: 'assets/img/app-icons/chrome.png'},
    // {title: 'Drive', image: 'assets/img/app-icons/drive.png'},
    // {title: 'Earth', image: 'assets/img/app-icons/earth.png'},
    // {title: 'Gmail', image: 'assets/img/app-icons/gmail.png'},
    // {title: 'Google', image: 'assets/img/app-icons/google.png'},
    // {title: 'Maps', image: 'assets/img/app-icons/maps.png'},
    // {title: 'Photos', image: 'assets/img/app-icons/photos.png'},
    // {title: 'Play Music', image: 'assets/img/app-icons/play-music.png'},
    // {title: 'Play Store', image: 'assets/img/app-icons/play-store.png'}
  ];

  cards = [];

  constructor(private sanitizer: DomSanitizer) {
    // Select 9 random Cards
    const shuffled = this.allCards.sort(() => 0.5 - Math.random());
    this.cards = shuffled.slice(0, 9);
  }

  playVideo(card) {
    console.log('PLAAAY: ' + card.video);
    this.showCards = false;
    this.videoReference = card.video;
    this.loadingVideo = true;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.videoReference + '?controls=0');
  }

  closeVideo() {
    this.showCards = true;
  }

  videoLoaded() {
    console.log('Video loaded');
    this.loadingVideo = false;
  }

  getEmbedUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.videoReference + '?controls=0');
  }
}
