export class Pages {
    images:string[];
    pdfUrl:string;
    constructor(images:string[], pdfUrl:string){
        this.images=images;
        this.pdfUrl=pdfUrl;
    }

    getPagesImages():string[]{
        return this.images;
    }

    getPdfUrl():string{
        return this.pdfUrl;
    }

}