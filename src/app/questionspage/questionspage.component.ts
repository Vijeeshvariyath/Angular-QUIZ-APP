import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../services/services/question.service';

@Component({
  selector: 'app-questionspage',
  templateUrl: './questionspage.component.html',
  styleUrls: ['./questionspage.component.css']
})
export class QuestionspageComponent implements OnInit {

  public name: string="";
  public questionList:any=[];
  public currentQuestions:number=0;
  public points:number=0;
  counter=60;
  correctAnswer:number=0;
  incorrectAnswer:number=0;
  interval$:any;
  progress:string="0";
  constructor(private questionServices:QuestionService) { }

  ngOnInit(): void {
    this.name=localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();

  }
  getAllQuestions(){
    this.questionServices.getQuestionjson()
    .subscribe(res=>{
      this.questionList=res.questions;
      
    })

  }
  nextQuestions(){
    this.currentQuestions++;

  }

  previousQuestions(){
    this.currentQuestions--;

  }

  answer(currentQno:number,option:any){
    if(option.correct){
      this.points+=10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestions++;
        this.resetCounter();
         
        this.getprogressPercent();
  
        
      }, 1000);
     

    }else{
      setTimeout(() => {
        this.currentQuestions++;
        this.incorrectAnswer++;
        this.resetCounter();
        this.getprogressPercent();
        
      }, 1000);

      this.points-=10;
      this.currentQuestions++;
      this.incorrectAnswer++;
      this.getprogressPercent();

    }

  }
  startCounter(){
    this.interval$=interval(1000)
    .subscribe(val=>{
      this.counter--;
      if(this.counter===0){
        this.currentQuestions++;
        this.counter=60;
        this.points-=10;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
      
    }, 6000000);

  }
  stopCounter(){
    this.interval$.unsubscribe();
    this.counter=0;

  }
  resetCounter(){
    this.stopCounter();
    this.counter=60;
    this.startCounter();

  }
  resetQuiz(){
    this.resetCounter();
    this.getAllQuestions();
    this.points=0;
    this.counter=60;
    this.currentQuestions=0;
    this.progress="0";

  }
  getprogressPercent(){
    this.progress=((this.currentQuestions/this.questionList.length)*100).toString()
    return this.progress;
  }

}
