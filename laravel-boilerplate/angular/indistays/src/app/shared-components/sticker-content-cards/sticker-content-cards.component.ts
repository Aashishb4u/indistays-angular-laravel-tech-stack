import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sticker-content-cards',
  templateUrl: './sticker-content-cards.component.html',
  styleUrls: ['./sticker-content-cards.component.scss']
})
export class StickerContentCardsComponent implements OnInit {
  @Input() categories: any = [];

  constructor() {
  }

  ngOnInit() {
    this.categories = [{
      name: 'Galmping',
      description: 'Glamorous camping that combines the comforts of home with the outdoor experience',
      img: 'assets/images/galmping.png'
    },
      {
        name: 'Camping Resorts',
        description: 'Campgrounds with extensive amenities and recreational facilities.',
        img: 'assets/images/tent.png'
      },
      {
        name: 'Private Villas',
        description: 'Luxurious retreats with exclusive amenities for an intimate and upscale getaway.',
        img: 'assets/images/camping.png'
      },
      {
        name: 'Group Camping',
        description: 'Campgrounds or sites designed for large groups, such as scout troops or family reunions',
        img: 'assets/images/tent_people.png'
      }];
  }
}
