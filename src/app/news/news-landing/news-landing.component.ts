import { Component, OnInit } from '@angular/core';
import { FetchService } from './../../fetch.service';
import { MzToastService } from 'ngx-materialize';


@Component({
  selector: 'app-news-landing',
  templateUrl: './news-landing.component.html',
  styleUrls: ['./news-landing.component.css']
})
export class NewsLandingComponent implements OnInit {

  news = [];
  newsSource = '';
  currentNews = 'bbc';
  bbcNewsUrl = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=2d99d74987364e95aaf013993c90327c';
  hinduNewsUrl = 'https://newsapi.org/v1/articles?source=the-hindu&sortBy=top&apiKey=2d99d74987364e95aaf013993c90327c';
  techRadarNewsUrl = 'https://newsapi.org/v1/articles?source=techradar&sortBy=top&apiKey=2d99d74987364e95aaf013993c90327c';
  natGeoNewsUrl = 'https://newsapi.org/v1/articles?source=national-geographic&sortBy=top&apiKey=2d99d74987364e95aaf013993c90327c';
  vergeNewsUrl = 'https://newsapi.org/v1/articles?source=the-verge&sortBy=top&apiKey=2d99d74987364e95aaf013993c90327c';
  newScientistUrl = 'https://newsapi.org/v1/articles?source=new-scientist&sortBy=top&apiKey=2d99d74987364e95aaf013993c90327c';
  cnnUrl = 'https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=2d99d74987364e95aaf013993c90327c'
  dailyMailUrl = 'https://newsapi.org/v2/top-headlines?sources=daily-mail&apiKey=2d99d74987364e95aaf013993c90327c';
  googleNewsUrl = 'https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=2d99d74987364e95aaf013993c90327c';
  espnCricUrl = 'https://newsapi.org/v2/top-headlines?sources=espn-cric-info&apiKey=2d99d74987364e95aaf013993c90327c';
  toiUrl = 'https://newsapi.org/v2/top-headlines?sources=the-times-of-india&apiKey=2d99d74987364e95aaf013993c90327c';
  biUrl = 'https://newsapi.org/v2/top-headlines?sources=business-insider&apiKey=2d99d74987364e95aaf013993c90327c';

  constructor(private _fetchService: FetchService, private toastService: MzToastService) { }

  ngOnInit() {
    this.fetchNews(this.bbcNewsUrl);
  }

  che (event) {
    console.log(event)
  }
  fetchNews(url) {
    this._fetchService.fetchNews(url).subscribe(data => {
      this.news = data.articles;
     // this.playNews(this.news);
    }, error => this.toastService.show('Error while fetching from API', 10000));
  }

  playNews(articles) {
    const textToSpeak = [];
    articles.map(item => {
      textToSpeak.push(item['title'] + '. ' + item['description']);
    });

    textToSpeak.map(item => {
      const msg = new SpeechSynthesisUtterance(item);
      msg.lang = 'en-GB';
      msg.rate = 1;
      window.speechSynthesis.speak(msg);
    });
}

}
