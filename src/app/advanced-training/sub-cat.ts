import{Courses} from './courses';

export class SubCat{

  idSubCat:string;
  nameSubCat:string;
  courses:Courses[];

  constructor(idSubCat:string,nameSubCat:string, courses?:Courses[]){
    this.idSubCat = idSubCat;
    this.nameSubCat = nameSubCat;
    this.courses = courses?courses:[];
  }
  
  addCourse(course:Courses){
    this.courses.push(course);
  }
  getIdSubCat():string{
    return this.idSubCat;
  }
  getNameSubCat():string{
    return this.nameSubCat;
  }

  getCourses():Courses[]{
    return this.courses;
  }

}
