export class User{

    private activeCourses:any[];
    private purchases:any[];
    constructor(private firstName:string,
                private lastName:string,
                private phone:number,
                private phone2:number,
                private photoURL:string,
                private email:string,
                private email2:string,
                private country:string,
                private city:string,
                private createdAt:Date,
                private updatedAt:Date,
                private lastLogin:Date,
                private active:boolean,
                private completed:string,
                private userRole:string){
            
        this.activeCourses=[];
        this.purchases=[];
    }

    addActiveCourse(course){
        let theCourse={
            achieved:course.achieved,
            idCourse:course.idCourse,
            expDate: new Date(course.expDate)
        }
        this.activeCourses.push(course);
    }
    
    getActiveCourses():any[]{
        return this.activeCourses;
    }

    addPurchase(purchase){
        this.purchases.push(purchase);
    }
    
    getPurchases():any[]{
        return this.purchases;
    }



    getFirstName():string{
        return this.firstName;
    }
    getLastName():string{
        return this.lastName;
    }
    getPhone():number{
        return this.phone;
    }
    getPhone2():number{
        return this.phone2;
    }
    getPhotoURL():string{
        return this.photoURL;
    }
    getEmail():string{
        return this.email;
    }
    getEmail2():string{
        return this.email2;
    }
    getCountry():string{
        return this.country;
    }
    getCity():string{
        return this.city;
    }
    getCreatedAt():Date{
        return this.createdAt;
    }
    getUpdatedAt():Date{
        return this.updatedAt;
    }
    getLastLogin():Date{
        return this.lastLogin;
    }
    isActive():boolean{
        return this.active;
    }
    getCompleted():string{
        return this.completed;
    }
    getUserRole():string{
        return this.userRole;
    }
    hasCourse(idcourse):boolean{
        let ans:boolean = false;
        for(let i =0;i<this.activeCourses.length;i++){
            ans= ans || (this.activeCourses[i].idCourse == idcourse);
        }
        return ans;
    }
    isActiveCourse(idCourse):boolean{
        let now = new Date();
        let ans:boolean = false;
        for(let i=0;i<this.activeCourses.length;i++){
            if(idCourse == this.activeCourses[i].idCourse){
                let date = new Date(this.activeCourses[i].expDate);
                let now = new Date();
                ans = (date > now);
                console.log('date: '+ date + ' now: ' + now + ' ' + ans);
            }
        }
        return ans;
    }
}