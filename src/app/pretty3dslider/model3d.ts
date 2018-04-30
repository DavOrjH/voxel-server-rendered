export class Model3d {

    src:string;
    mainImage:string;
    projectName:string
    createdBy:string;
    isProjectName:boolean;
    isCreatedBy:boolean;


    constructor(src:string, mainImage:string, projectName?:string, createdBy?:string){
        this.src = src;        
        this.mainImage = mainImage;
        if(projectName){
            this.isProjectName = true;
        } else{
            this.isProjectName = false;
        }
        if(createdBy){
            this.isCreatedBy = true;
        } else{
            this.isCreatedBy = false;
        }
    }
    getSrc():string{
        return this.src
    }
    getMainImage():string{
        return this.mainImage
    }
    getProjectName():string{
        if(this.isProjectName){
            return this.projectName
        }else{
            return ""
        }        
    }
    isProjectNameHere():boolean{
        return this.isProjectName        
    }

    isProjectAuthorHere():boolean{
        return this.isCreatedBy
        
    }
    getCreatedBy():string{
        if(this.isCreatedBy){
            return this.createdBy
        }else{
            return ""
        }
    }
}