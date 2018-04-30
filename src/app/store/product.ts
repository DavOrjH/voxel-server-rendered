export class Product{

idStore:string;
idShelf:string;
name:string;
type:string;
desc:string;
imgURL:string;
price:number;
hasDiscount:boolean;
discount:number;
tax:number;
relProd:string[];
ident:string;


constructor(idStore?:string, idShelf?:string,name?:string, type?:string, desc?:string, imgURL?:string, 
             price?:number, hasDiscount?:boolean, discount?:number, tax?: number,
            relProd?:string[],ident?:string)
    {
        this.idStore = idStore?idStore:"none";
        this.idShelf = idShelf?idShelf:"none";
        this.name = name?name:"none";
        this.type = type? type:"none";
        this.desc = desc? desc:"none";
        this.imgURL = imgURL? imgURL:"../../favicon.ico";
        this.price = price? ((hasDiscount)? price*(1-discount): price):0;
        this.hasDiscount = hasDiscount? hasDiscount : false;
        this.discount = discount? discount: 0;
        this.tax = tax? tax: 0;
        this.relProd = relProd? relProd:[];
        this.ident = ident? ident: "none";
    }

    getIdStore():string{
        return this.idStore;
    }

    getIdShelf():string{
        return this.idShelf;
    }

    getName():string{
        return this.name;
    }
    
    getType():string{
        return this.type;
    }

    getDesc():string{
        return this.desc;
    }

    getImgURL():string{
        return this.imgURL;
    }

    getPrice():number{
        return this.price;
    }

    getHasDiscount():boolean{
        return this.hasDiscount;
    }

    getDiscount():number{
        return this.discount;
    }

    getTax():number{
        return this.tax;
    }

    getRelProd():string[]{
        return this.relProd;
    }

    getIdent():string{
        return this.ident;
    }


}