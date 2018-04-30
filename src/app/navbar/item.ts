export class Item{
  name:String;
  url:String;
  constructor(name:String,url:String){
    this.name=name;
    this.url=url;
  }
  getName(){
    return this.name;
  }
  getUrl(){
    return this.url;
  }
}
