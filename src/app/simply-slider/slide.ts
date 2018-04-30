export class Slide{
    image:String;
    url:String;

    constructor(image:String, url:String){
        this.image = image;
        this.url = url;
    }

    getImage():String{
        return this.image
    }

    getUrl():String{
        return this.url
    }

}