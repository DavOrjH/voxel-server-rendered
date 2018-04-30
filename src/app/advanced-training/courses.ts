import {Images} from '../pretty-slider/images';
import {Pages} from '../pretty-book/pages'
import { Topic } from 'app/advanced-training/topic';

export class Courses{

  idCourse:string;
  imgCnt:string;
  imgLabel:string;
  galCnt:Images[];
  textCnt:string;
  pagesCnt:Pages;
  productId:string;

  hasVirtual:boolean;
  contentPdf: string;
  state:string = "inactive";
  goal:string[];
  addressedTo:string;
  topics:any[];

  constructor(idCourse:string, imgLabel:string, imgCnt:string, textCnt:string,  galCnt:Images[], pagesCnt:Pages, productId:string, hasVirtual:boolean, contentPdf: string, goal:string[], addressedTo:string, topics:Topic[]){
    this.idCourse = idCourse;
    this.imgCnt = imgCnt;
    this.imgLabel = imgLabel;
    this.textCnt = textCnt;
    this.galCnt = galCnt;
    this.pagesCnt = pagesCnt;
    this.productId = productId;
    this.hasVirtual = hasVirtual;
    this.contentPdf = contentPdf;
    this.goal = goal;
    this.addressedTo = addressedTo
    this.topics = topics;    
  }

  getIdCourse():string{
    return this.idCourse;
  }

  getImgCnt():string{
    return this.imgCnt;
  }

  getImgLabel():string{
    return this.imgLabel;
  }
  getGalCnt():Images[]{
    return this.galCnt;
  }

  getPagesCnt():Pages{
    return this.pagesCnt;
  }

  getTextCnt():string{
    return this.textCnt;
  }

  getProductId():string{
    return this.productId;
  }

  getHasVirtual():boolean{
    return this.hasVirtual;
  }

  getContentPdf():string{
    return this.contentPdf;
  }

  getState():string{
    return this.state;
  }

  getGoal():string[]{
    return this.goal;
  }

  getAddressedTo(){
    return this.addressedTo;
  }

  getTopics():Topic[]{
    return this.topics

  }

  setActive(){
  (this.state==="inactive")?this.state='active':this.state='active';
  }

  setInactive(){
  (this.state==="active")?this.state='inactive':this.state='inactive';
  }

}
