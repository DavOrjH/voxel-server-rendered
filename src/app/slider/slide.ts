export class Slide{
    hasImage: boolean;
    hasVideo: boolean;
    hasFirstImage:boolean;
    hasSecImage:boolean;
    hasTitle:boolean;
    hasDate:boolean;
    image: String;
    date:String;
    title:String;
    url:String;
    urlVideo:String;
    urlFirstImage:String;
    urlSecImage:String;

    constructor( url:String, image?:String, date?:String, title?:String ,urlVideo?:String, urlFirstImage?:String, urlSecImage?:String){
        
        this.date = date;
        this.title = title;
        this.url = url;
        if(urlVideo){
            this.urlVideo=urlVideo;
            this.hasVideo = true;
        }else{
            this.hasVideo = false;
        }
        if(urlFirstImage){
            this.urlFirstImage = urlFirstImage;
            this.hasFirstImage = true;
        }else{
            this.hasFirstImage = false;
        }
        if(urlSecImage){
            this.urlSecImage = urlSecImage;
            this.hasSecImage = true;
        }else{
            this.hasSecImage = false;
        }
        if(title){
            this.title =title;
            this.hasTitle = true;
        }else{
            this.hasTitle = false;
        }
        if(date){
            this.date =date;
            this.hasDate = true;
        }else{
            this.hasDate= false;
        }

        if(image){
            this.image = image;
            this.hasImage = true;
        }else{
            this.hasImage = false;
        }
    }

    getVideo():String{
        if(this.hasVideo){
            return this.urlVideo;
        }else{
            return "";
        }
    }

    getFirstImage():String{
        if(this.hasFirstImage){
            return this.urlFirstImage;
        }else{
            return "";
        }
    }

    getSecImage():String{
        if(this.hasSecImage){
            return this.urlSecImage;
        }else{
            return "";
        }
    } 

    getImage():String{
        if(this.hasImage){
            return this.image;
        }else{
            return "";
        }
    }

    getDate():String{
        if(this.hasDate){
            return this.date;
        }else{
            return "";
        }
    }

    getTitle():String{
        if(this.hasTitle){
            return this.title;
        }else{
            return "";
        }
    }

    getUrl():String{
        return this.url
    }

    isFirstImageHere():boolean{
        return this.hasFirstImage;
    }

    isSecImageHere():boolean{
        return this.hasSecImage;
    }

    isVideoHere():boolean{
        return this.hasVideo;
    }

    isTitleHere():boolean{
        return this.hasTitle;
    }

    isDateHere():boolean{
        return this.hasTitle;
    }

    isImageHere():boolean{
        return this.hasImage
    }


   
}