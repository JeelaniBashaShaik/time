import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent implements OnInit {

  @Input() newsData;
  currentIndex;

  constructor() { }

  ngOnInit() {
  }

  playNews(articles) {
    const textToSpeak = [];
    articles.map(item => {
      textToSpeak.push(item['title'] + '. ' + item['description']);
    });
    textToSpeak.map((item, index) => {
     const msg = new SpeechSynthesisUtterance(item);
     msg.lang = 'en-GB';
      msg.rate = 1;
      window.speechSynthesis.speak(msg);
      msg.onstart = (event) => {
        this.currentIndex = index;
      };
    });
}

playSpecific(item) {
  const msg = new SpeechSynthesisUtterance(item['title'] + '. ' + item['description']);
  msg.lang = 'en-GB';
   msg.rate = 1;
   window.speechSynthesis.speak(msg);
}



}
