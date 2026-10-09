import { Component, OnInit, Input } from '@angular/core';
import { Path } from '../../../../config';
import { Rating, DinamicRating, DinamicReviews } from '../../../../functions';

declare var $: any;

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  @Input() childItem: any;
  path: String = Path.url;
  rating: Array<any> = [];
  totalReviews: number = 0;
  itemReviews: Array<any> = [];
  render: Boolean = true;

  constructor() { }

  ngOnInit(): void {

    this.rating.push(DinamicRating.fnc(this.childItem));

    const reviewOptions = DinamicReviews.fnc(this.rating[0]);

    for (let i = 0; i < 5; i++) {
      $(".reviewsOption").append(`
        <option value="${reviewOptions[i]}">${i + 1}</option>
      `);
    }

    Rating.fnc();

    const reviewList = this.childItem && this.childItem["reviews"] ? JSON.parse(this.childItem["reviews"]) : [];
    this.totalReviews = Array.isArray(reviewList) ? reviewList.length : 0;

    const arrayReview: number[] = [];

    reviewList.forEach((rev: any) => {
      arrayReview.push(Number(rev.review));
    });

    arrayReview.sort((a, b) => b - a);

    const objectStar: Record<string, number> = {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    };

    arrayReview.forEach((value) => {
      objectStar[String(value)] = (objectStar[String(value)] || 0) + 1;
    });

    for (let i = 5; i > 0; i--) {
      const starPercentage = arrayReview.length > 0 ? Math.round((objectStar[String(i)] * 100) / arrayReview.length) : 0;
      $(".ps-block--average-rating").append(`
        <div class="ps-block__star">
          <span>${i} Star</span>
          <div class="ps-progress" data-value="${starPercentage}">
            <span></span>
          </div>
          <span>${starPercentage}%</span>
        </div>
      `);
    }

    this.itemReviews.push(reviewList);
  }

  callback(): void {

    if (this.render) {
      this.render = false;

      const reviews = $("[reviews]");

      for (let i = 0; i < reviews.length; i++) {
        for (let r = 0; r < 5; r++) {
          $(reviews[i]).append(`
            <option value="2">${r + 1}</option>
          `);

          if ($(reviews[i]).attr("reviews") == (r + 1)) {
            $(reviews[i]).children("option").val(1);
          }
        }
      }

      Rating.fnc();
    }
  }

}
