export class Testimony{
    desc:string;
    name:string;
    note:string;
    imgURL:string;
    
    constructor(desc:string, name:string, imgURL:string, note?:string,){
        this.desc = desc;
        this.name = name;
        this.imgURL = imgURL;
        this.note = note? note: "";
    }

    getDesc():string{
        return this.desc
    }

    getName():string{
        return this.name
    }

    getImgURL():string{
        return this.imgURL
    }

    getNote():string{
        return this.note
    }


}