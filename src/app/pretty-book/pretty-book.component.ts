import {Component,Input,AfterViewInit, HostListener} from '@angular/core';
import { trigger, state,style,animate, transition} from '@angular/animations';
import {Pages} from './pages';

declare var $:any;
declare var Jquery:any;

@Component({
  selector: 'app-pretty-book',
  templateUrl: './pretty-book.component.html',
  styleUrls: ['./pretty-book.component.css']
})
export class PrettyBookComponent implements AfterViewInit {

  bookWidth:number;
  bookHeight:number;
  pageWidth:number;
  pageHeight:number;
  pageY:number;
  canvasPadding:number;
  book:any;
  pages:any;
  flips:any=[];
  mouseX:number = 0;
  mouseY:number = 0;
  page:number = 0;
  canvas:any = document.getElementById("pageflip-canvas");
  context:any;
  timer:any;

  @Input() pagesCnt:Pages;   

  constructor() { 
    }

  ngAfterViewInit() {
    this.bookWidth = $(window).width()*0.8;         
    this.bookHeight = $(window).height()*0.8; 
    this.pageWidth = this.bookWidth*0.482;    
    this.pageHeight = this.bookHeight*0.962;
       
     $("#book").css({
      'width': this.bookWidth,
      'height': this.bookHeight,
    });

    $("#pages section").css({
      'width': this.pageWidth,
      'height': this.pageHeight,
    });

    this.page = 0;
    this.pageY = (this.bookHeight-this.pageHeight)/2;
    this.canvasPadding = (60/830)*0.8*$(window).height();
    this.book = document.getElementById( "book" );
    this.pages = this.book.getElementsByTagName( "section" );
    this.canvas = document.getElementById("pageflip-canvas");
    this.canvas.width = this.bookWidth + ( this.canvasPadding * 2 );
    this.canvas.height = this.bookHeight + ( this.canvasPadding * 2 );
    
    // Offset the canvas so that it's padding is evenly spread around the book
    this.canvas.style.top = -this.canvasPadding + "px";
    this.canvas.style.left = -this.canvasPadding + "px";
    this.context = this.canvas.getContext( "2d" );
    this.passpage();
    
    // Render the page flip 60 times a second
    this.setTimer();

  }
 getImages():any{
   return this.pagesCnt.getPagesImages();
 }

  setTimer(){
    this.timer = setInterval(()=> this.render(), 1000 / 60 );
  }
  
  passpage():void{
    let len:number = this.pages.length
    for( let i = 0; i <len ; i++ ) {
      this.pages[i].style.zIndex = len - i;
  
      this.flips.push( {
      progress: 1,
      target: 1,
      page: this.pages[i],
      dragging: false
    });
  }
  }

  render():void {
    	
		// Reset all pixels in the canvas
		this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
		
		for( let i = 0, len = this.flips.length; i < len; i++ ) {
			let flip = this.flips[i];
			
			if( flip.dragging ) {
				flip.target = Math.max( Math.min( this.mouseX /this.pageWidth, 1 ), -1 );
			}
			
			// Ease progress towards the target value 
			flip.progress += ( flip.target - flip.progress ) * 0.2;
			
			// If the flip is being dragged or is somewhere in the middle of the book, render it
			if( flip.dragging || Math.abs( flip.progress ) < 0.997 ) {
				this.drawFlip( flip );
			}			
		}		
  }

    drawFlip( flip):void {
		// Strength of the fold is strongest in the middle of the book
		let strength = 1 - Math.abs( flip.progress );
		
		// Width of the folded paper
		let foldWidth = ( this.pageWidth * 0.5 ) * ( 1 - flip.progress );
		
		// X position of the folded paper
		let foldX = this.pageWidth * flip.progress + foldWidth;
		
		// How far the page should outdent vertically due to perspective
		let verticalOutdent = 20 * strength;
		
		// The maximum width of the left and right side shadows
		let paperShadowWidth = ( this.pageWidth * 0.5 ) * Math.max( Math.min( 1 - flip.progress, 0.5 ), 0 );
		let rightShadowWidth = ( this.pageWidth * 0.5 ) * Math.max( Math.min( strength, 0.5 ), 0 );
		let leftShadowWidth = (  this.pageWidth * 0.5 ) * Math.max( Math.min( strength, 0.5 ), 0 );
		
		
		// Change page element width to match the x position of the fold
		flip.page.style.width = Math.max(foldX, 0) + "px";
		
		this.context.save();
		this.context.translate( this.canvasPadding + ( this.bookWidth / 2 ), this.pageY + this.canvasPadding );
		
		
		// Draw a sharp shadow on the left side of the page
		this.context.strokeStyle = 'rgba(0,0,0,'+(0.05 * strength)+')';
		this.context.lineWidth = 30 * strength;
		this.context.beginPath();
		this.context.moveTo(foldX - foldWidth, -verticalOutdent * 0.5);
		this.context.lineTo(foldX - foldWidth, this.pageHeight+ (verticalOutdent * 0.5));
		this.context.stroke();
		
		
		// Right side drop shadow
		let rightShadowGradient = this.context.createLinearGradient(foldX, 0, foldX + rightShadowWidth, 0);
		rightShadowGradient.addColorStop(0, 'rgba(0,0,0,'+(strength*0.2)+')');
		rightShadowGradient.addColorStop(0.8, 'rgba(0,0,0,0.0)');
		
		this.context.fillStyle = rightShadowGradient;
		this.context.beginPath();
		this.context.moveTo(foldX, 0);
		this.context.lineTo(foldX + rightShadowWidth, 0);
		this.context.lineTo(foldX + rightShadowWidth, this.pageHeight);
		this.context.lineTo(foldX, this.pageHeight);
		this.context.fill();
		
		
		// Left side drop shadow
		let leftShadowGradient = this.context.createLinearGradient(foldX - foldWidth - leftShadowWidth, 0, foldX - foldWidth, 0);
		leftShadowGradient.addColorStop(0, 'rgba(0,0,0,0.0)');
		leftShadowGradient.addColorStop(1, 'rgba(0,0,0,'+(strength*0.15)+')');
		
		this.context.fillStyle = leftShadowGradient;
		this.context.beginPath();
		this.context.moveTo(foldX - foldWidth - leftShadowWidth, 0);
		this.context.lineTo(foldX - foldWidth, 0);
		this.context.lineTo(foldX - foldWidth, this.pageHeight);
		this.context.lineTo(foldX - foldWidth - leftShadowWidth, this.pageHeight);
		this.context.fill();
		
		
		// Gradient applied to the folded paper (highlights & shadows)
		let foldGradient = this.context.createLinearGradient(foldX - paperShadowWidth, 0, foldX, 0);
		foldGradient.addColorStop(0.35, '#fafafa');
		foldGradient.addColorStop(0.73, '#eeeeee');
		foldGradient.addColorStop(0.9, '#fafafa');
		foldGradient.addColorStop(1.0, '#e2e2e2');
		
		this.context.fillStyle = foldGradient;
		this.context.strokeStyle = 'rgba(0,0,0,0.06)';
		this.context.lineWidth = 0.5;
		
		// Draw the folded piece of paper
		this.context.beginPath();
		this.context.moveTo(foldX, 0);
		this.context.lineTo(foldX, this.pageHeight);
		this.context.quadraticCurveTo(foldX, this.pageHeight + (verticalOutdent * 2), foldX - foldWidth, this.pageHeight + verticalOutdent);
		this.context.lineTo(foldX - foldWidth, -verticalOutdent);
		this.context.quadraticCurveTo(foldX, -verticalOutdent * 2, foldX, 0);
		
		this.context.fill();
		this.context.stroke();
		
		
		this.context.restore();
	}
  
  activeLeft():void{
    console.log("se ejecuta el botón")
    if(this.page-1>=0){
      this.flips[this.page-1].dragging = true;
      this.flips[this.page-1].target= 1;
      this.mouseX = this.pageWidth-1;      
      do{
        this.mouseX = this.mouseX-1;
        console.log(this.mouseX)
      }while(Math.abs(this.mouseX)<this.pageWidth)
      this.page = this.page-1;
    }

    for(let i=0; i< this.flips.length; i++){
      this.flips[i].dragging = false;
    }
  }

  activeRight():void{
    console.log("se ejecuta el botón")
    if(this.page<this.flips.length-1){
      this.flips[this.page].dragging = true;
      this.flips[this.page].target= -1;
      this.mouseX = -this.pageWidth+1;      
      do{
        this.mouseX = this.mouseX+1;
        console.log(this.mouseX)
      }while(Math.abs(this.mouseX)<this.pageWidth)
      this.page = this.page+1;
    }

    for(let i=0; i< this.flips.length; i++){
      this.flips[i].dragging = false;
    }
  }


  @HostListener('mousemove', ['$event'])
  mouseHandling(event) {
    this.mouseX = event.clientX - this.book.offsetLeft - ( this.bookWidth / 2 );
    this.mouseY = event.clientY - this.book.offsetTop;
    // console.log(this.mouseX + ' ' + this.mouseY + ' mouse en la coordenada de');
   }

  @HostListener('mousedown', ['$event'])
  mouseDownHandler( event ) {
    console.log("mantener en click")
    // Make sure the mouse pointer is inside of the book
    if (Math.abs(this.mouseX) < this.pageWidth) {
      if (this.mouseX < 0 && this.page - 1 >= 0) {
        // We are on the left side, drag the previous page
        this.flips[this.page - 1].dragging = true;
      }
      else if (this.mouseX > 0 && this.page + 1 < this.flips.length) {
        // We are on the right side, drag the current page
        this.flips[this.page].dragging = true;
      }
    }  
    // Prevents the text selection
    event.preventDefault();
  }

  @HostListener('mouseup', ['$event'])
  mouseUpHandler( event ) {
    console.log("soltar en click")
     for( let i = 0; i < this.flips.length; i++ ) {
      // If this flip was being dragged, animate to its destination
      if( this.flips[i].dragging ) {
        // Figure out which page we should navigate to
        if( this.mouseX < 0 ) {
          this.flips[i].target = -1;
          this.page = Math.min( this.page + 1, this.flips.length );
        }
        else {
          this.flips[i].target = 1;
          this.page = Math.max( this.page - 1, 0 );
        }
      }
  
      this.flips[i].dragging = false;
    }
   }

  @HostListener('window:resize', ['$event'])
  onResize($event:any){
    // this.bookWidth = $('#book').width();         
    // this.bookHeight = $('#book').height(); 
    // this.pageWidth = this.bookWidth*0.482;   
    // this.pageHeight = this.bookHeight*0.962;
    // console.log(this.pageWidth);
    // console.log(this.pageHeight);    
    // this.pageY = (this.bookHeight-this.pageHeight)/2;
    // this.canvasPadding = (60/830)*0.8*$(window).height();
    // this.canvas.width = this.bookWidth + ( this.canvasPadding * 2 );
    // this.canvas.height = this.bookHeight + ( this.canvasPadding * 2 );   
    
    // // Offset the canvas so that it's padding is evenly spread around the book
    // this.canvas.style.top = -this.canvasPadding + "px";   
    // this.canvas.style.left = -this.canvasPadding + "px";
    //    $("#pages section").css({
    //   'width': this.pageWidth,
    //   'height': this.pageHeight,
    // });
  }
}