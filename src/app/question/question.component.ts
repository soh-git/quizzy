import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
 public pseudo :string ="";
 public questionList : any = [];
 public currentQuestion : number =0;
 public point: number=0;
 counter: number=60;
 correctAns:number =0;
 incorrectAns:number =0;
 interval$:any;
 progress:string="0";
 isQuizzCompleted:boolean=false;
  constructor(private QuestionService:QuestionService) { }

  ngOnInit(): void {
    this.pseudo= localStorage.getItem("pseudo")!;
    this.getALLQuestion();
    this.startCounter();
  }

  getALLQuestion(){
    this.QuestionService.getQuestionJson()
    .subscribe(res => {
      this.questionList=res.questions
    });
    
  }
  nextQuestion(){
    if(this.currentQuestion+1===this.questionList.length){
      this.stopCounter();
      this.isQuizzCompleted=true;
      
    }
    this.currentQuestion++;
    this.getProgress_Pr_100()
    this.point-=10;
  }
  prevQuestion(){
    this.currentQuestion--;
    this.getProgress_Pr_100()
  }
answer(currentQuestNb:number,option:any){
  if(currentQuestNb===this.questionList.length){
    this.stopCounter();
    this.isQuizzCompleted=true;
    
  }
  if(option.correct){
    this.point+=10;
    this.correctAns++;

  }else{
    this.point-=10;
    this.incorrectAns++;
  }
  setTimeout(() => {
    this.resetCounter()
  this.currentQuestion++;
  this.getProgress_Pr_100()
  }, 1000);
  
}
  refreshQuestion(){
    this.resetCounter();
    this.getALLQuestion();
    this.point=0;
    this.counter=60;
    this.currentQuestion=0;
    this.progress="0";


  }

  startCounter(){
    console.log("e")
    this.interval$=interval(1000).subscribe(val=>{
      this.counter--;
      if(this.counter===0){
        if(this.currentQuestion+1===this.questionList.length){
          this.stopCounter();
          this.isQuizzCompleted=true;
          
        }
        this.currentQuestion++;
        this.getProgress_Pr_100()
        this.counter=60;
        this.point-=10;
      }
    });
    setTimeout(()=>{
      this.interval$.unsubscribe();
    },600000);

  }
  stopCounter(){

    this.interval$.unsubscribe();
    this.counter=0;
  }
  resetCounter(){
    this.startCounter();
    this.counter=60;
    this.startCounter();
  }

  getProgress_Pr_100(){
    this.progress= ((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }
}
