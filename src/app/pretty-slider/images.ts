export class Images{
  image:String;
  projectName:String;
  designedBy:String;
  hasProjectName:boolean;
  HasProjectAuthor:boolean;


  constructor(image:String, projectName?:String, designedBy?:String){
    this.image = image;
    if(projectName){
      this.projectName = projectName;
      this.hasProjectName = true;
    }else{
      this.hasProjectName = false;
    }

    if(designedBy){
      this.designedBy = designedBy;
      this.HasProjectAuthor = true;
    }else{
      this.HasProjectAuthor = false;
    }   
    this.designedBy = designedBy;
  }

  getImages(){
    return this.image;
  }

  getProjectNames(){
    if(this.hasProjectName){
      return this.projectName
    }else{
      return ""
    }    
  }

  getDesignedBy(){
    if(this.HasProjectAuthor){
      return this.designedBy
    }else{
      return ""
    }    
  }

  isProjectNameHere():boolean{
    return this.hasProjectName;
  }

  isProjectAuthorHere():boolean{
    return this.HasProjectAuthor;
  }
  
}
