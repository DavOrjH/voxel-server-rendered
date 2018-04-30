import { Slide } from "app/slider/slide";

export class SlideGroup {
  slides:Slide[];
  first:Slide;
  constructor(slides:Slide[]){
    this.slides = slides;
    this.first = this.slides.shift();
  }

  getFirst(){
    return this.first;
  }
  getSlides(){
    return this.slides;
  }

}
