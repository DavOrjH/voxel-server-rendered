export class Lesson{

    nameLesson:string;
    videoLesson:string;
    descLesson:string;
    isAccomplished:boolean;
    isCurrent:boolean;

    constructor(nameLesson?:string,videoLesson?:string, descLesson?:string, isAccomplished?:boolean, isCurrent?:boolean){
        this.nameLesson = nameLesson? nameLesson: "none";
        this.videoLesson = videoLesson? videoLesson:"none";
        this.descLesson = descLesson? descLesson:"none";
        this.isAccomplished = isAccomplished? isAccomplished: false;
        this.isCurrent = isCurrent? isCurrent: false;
    }

    getNameLesson():string{
        return this.nameLesson;
    }

    getVideoLesson():string{
        return this.videoLesson;
    }

    getDescLesson():string{
        return this.descLesson;
    }

    getIsAccomplished():boolean{
        return this.isAccomplished;
    }

    setIsAccomplished(bool:boolean):void{
        
        this.isAccomplished = bool;    
    }

    getIsCurrent():boolean{
        return this.isCurrent;
    }
    
    setIsCurrent(bool:boolean):void{
        this.isCurrent = bool;    
    }
}