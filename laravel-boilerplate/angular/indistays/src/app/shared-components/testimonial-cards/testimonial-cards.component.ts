import {Component} from '@angular/core';

@Component({
  selector: 'app-testimonial-cards',
  templateUrl: './testimonial-cards.component.html',
  styleUrls: ['./testimonial-cards.component.scss']
})
export class TestimonialCardsComponent {

  slides = [
    {img: "http://placehold.it/350x150/000000"},
    {img: "http://placehold.it/350x150/111111"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/666666"}
  ];
  slideConfig = {
    // centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    speed: 300,
    infinite: true,
    autoplay: true,
    dots: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true
        }
      }
    ]
  };

  reviews = [
    {
      name: "Rahul Gadge",
      comment: "Booking through this camping website was a breeze! The campsite had stunning views, and the amenities were top-notch. Can't wait for my next adventure!",
      ratings: "5/5",
      userImg: "assets/icons/man.png"
    },
    {
      name: "Shrushti shah",
      comment: "Impressed with the service! The detailed information and straightforward booking process made our camping trip enjoyable. Highly recommend this platform!",
      ratings: "4.7/5",
      userImg: "assets/icons/woman.png"
    },
    {
      name: "Vijendra kalaskar",
      comment: "Found a hidden gem on this website! The user-friendly interface made it easy to pick the perfect spot. The campsite was peaceful and well-maintained.",
      ratings: "4.5/5",
      userImg: "assets/icons/man.png"
    },
    {
      name: "Aditi parakh",
      comment: "First-time camper, and it was fantastic! The website made it easy to navigate, and the chosen campsite exceeded expectations. Can't wait to do it again!",
      ratings: "4.5/5",
      userImg: "assets/icons/woman.png"
    },
    {
      name: "Shrirang Mendre",
      comment: "Exceptional experience! Accurate descriptions and photos made choosing a campsite stress-free. The staff was friendly, and the overall atmosphere was amazing.",
      ratings: "5/5",
      userImg: "assets/icons/man.png"
    },
    {
      name: "Shubham kute",
      comment: "As a seasoned camper, I rely on this website for all my trips. The variety of campsites and reliable reviews ensure I always have a great outdoor experience.",
      ratings: "4.8/5",
      userImg: "assets/icons/man.png"
    },
    {
      name: "Darshan rathod",
      comment: "A reliable resource for camping enthusiasts! Accurate information, great customer support, and a wide range of options. Thumbs up!",
      ratings: "4.9/5",
      userImg: "assets/icons/man.png"
    },
    {
      name: "Kavya zha",
      comment: "This website saved our camping trip! Easy booking, clear directions, and a beautiful campsite. Will be using it for all future adventures.",
      ratings: "5/5",
      userImg: "assets/icons/woman.png"
    },
    {
      name: "Azhar shaikh",
      comment: "Kudos to the team! The camping experience was seamless, and the amenities matched the description. I appreciate the attention to detail.",
      ratings: "4.8/5",
      userImg: "assets/icons/man.png"
    },
    {
      name: "Eknath pandhare",
      comment: "Highly recommend! The website is my go-to for finding the perfect camping spot. It never disappoints, and the reviews are spot-on.",
      ratings: "5/5",
      userImg: "assets/icons/man.png"
    }
  ];


  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }

}
