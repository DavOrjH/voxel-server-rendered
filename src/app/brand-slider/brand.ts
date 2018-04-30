export class Brand{

    imgURL:string;
    pageURL:string;

    constructor(imgURL:string, pageURL:string ){
        this.imgURL = imgURL;
        this.pageURL = pageURL;
    }

    getImgURL():string{
        return this.imgURL
    }

    getPageURL(){
        return this.pageURL
    }



}