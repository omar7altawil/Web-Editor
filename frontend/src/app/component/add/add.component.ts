import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import {
  Question
} from '../../model/Questions';
import {
  QuestionsService
} from '../../service/questions.service';
import {
  ActivatedRoute
} from "@angular/router"
import '../../../assets/quill/mathquill-0.10.1/mathquill.js';
import Quill from "../../../assets/quill/quill.js";
import enableMathQuill from './mathquill4quill';
import { MatTabChangeEvent } from '@angular/material';
declare var require: any
const  QuillDeltaToHtmlConverter = require('quill-delta-to-html');
import { Router } from '@angular/router';

declare var MathQuill;

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit,AfterViewInit {
  tab:number=0;
  quill:Quill;
  isLinear = false;
  question: Question;
  Subject: string[] = ['math','science'];
  Grade: string[] = ['6', '7', '8', '9'];
  QuestionType: string[] = ['practice', 'mpq'];
  Difficulty: string[] = ['easy', 'medium', 'hard'];
  QuestionClass: string[] =['mcq','fill in']
  ContentType: string[] =['html', 'plain text']
  mode: string;
  constructor(private route: ActivatedRoute, private data: QuestionsService,private router: Router) {

  }

  @ViewChild('editor') editor;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.mode == 'add') {
        this.mode = "Create New";
        this.question = < Question > {};
      }else if(params.mode == 'edit')  {
        this.mode = "Edit";
        this.question = < Question > {};
        this.data.GetQuestion(params.id).subscribe(data => {
          this.question = data;
          console.log("params",this.question)
          this.refreshTab(this.tab);
        });
      }
    });
  }

  ngAfterViewInit() {
    enableMathQuill(Quill, MathQuill);
     this.quill = new Quill(this.editor.nativeElement, {
      modules: {
        formula: true,
        toolbar: [
          ["formula"],
          ['bold', 'italic', 'underline', 'strike'],       
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],               
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],     
          [{ 'indent': '-1'}, { 'indent': '+1' }],         
          [{ 'direction': 'rtl' }],                         
          [{ 'size': ['small', false, 'large', 'huge'] }],  
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'color': [] }, { 'background': [] }],         
          [{ 'font': [] }],
          [{ 'align': [] }],
          ['link'],
          ['image'],    
        ]
      },
      placeholder: "Type text here, or click on the formula button to enter math.",
      theme: "snow",
      scrollingContainer: 'body'
    });
    this.quill.enableMathQuillFormulaAuthoring();
  }

  Done() {
    if(this.mode == "Create New"){
      this.question.reviewed=false;
      this.data.AddQuestion(this.question).subscribe(data => {
        this.router.navigateByUrl('home/'+data._id);
      });
  }
    else if(this.mode == "Edit"){
      this.data.UpdateQuestion(this.question).subscribe(data => {
        this.router.navigateByUrl('home/'+this.question._id);
      });
    }
  }
  
  onLinkClick(event: MatTabChangeEvent) {
    this.tab= event.index;
    this.refreshTab(this.tab)
  }

  refreshTab(index: number){
      if(index===0) this.quill.setContents(this.question.O_question_text);
      else if(index===1)this.quill.setContents(this.question.O_arabic_translation_of_question);
      else if(index===2)this.quill.setContents(this.question.O_hint);
      else if(index===3)this.quill.setContents(this.question.O_arabic_translation_of_hint);
      else if(index===4)this.quill.setContents(this.question.O_justification);
      else if(index===5)this.quill.setContents(this.question.O_arabic_translation_of_justification);
      else if(index===6)this.quill.setContents(this.question.O_option_A);
      else if(index===7)this.quill.setContents(this.question.O_option_B);
      else if(index===8)this.quill.setContents(this.question.O_option_C);
      else if(index===9)this.quill.setContents(this.question.O_option_D);
  }
 save(){
  if(this.tab==0){
    this.question.O_question_text=this.quill.getContents();
    this.question.question_text = new QuillDeltaToHtmlConverter(this.quill.getContents().ops,{}).convert();
    console.log(this.question)
  }
  else if(this.tab==1){
    this.question.O_arabic_translation_of_question=this.quill.getContents();
    this.question.arabic_translation_of_question = new QuillDeltaToHtmlConverter(this.quill.getContents().ops,{}).convert();
  }
  else if(this.tab==2){
    this.question.O_hint=this.quill.getContents();
    this.question.hint = new QuillDeltaToHtmlConverter(this.quill.getContents().ops,{}).convert();
  }
  else if(this.tab==3){
    this.question.O_arabic_translation_of_hint=this.quill.getContents();
    this.question.arabic_translation_of_hint = new QuillDeltaToHtmlConverter(this.quill.getContents().ops,{}).convert();
  }
  else if(this.tab==4){
    this.question.O_justification=this.quill.getContents();
    this.question.justification = new QuillDeltaToHtmlConverter(this.quill.getContents().ops,{}).convert();
  }
  else if(this.tab==5){
    this.question.O_arabic_translation_of_justification=this.quill.getContents();
    this.question.arabic_translation_of_justification = new QuillDeltaToHtmlConverter(this.quill.getContents().ops,{}).convert();
  }
  else if(this.tab==6){
    this.question.O_option_A=this.quill.getContents();
    this.question.option_A = new QuillDeltaToHtmlConverter(this.quill.getContents().ops,{}).convert();
  }
  else if(this.tab==7){
    this.question.O_option_B=this.quill.getContents();
    this.question.option_B = new QuillDeltaToHtmlConverter(this.quill.getContents().ops,{}).convert();
  }
  else if(this.tab==8){
    this.question.O_option_C=this.quill.getContents();
    this.question.option_C = new QuillDeltaToHtmlConverter(this.quill.getContents().ops,{}).convert();
  }
  else if(this.tab==9){
    this.question.O_option_D=this.quill.getContents();
    this.question.option_D = new QuillDeltaToHtmlConverter(this.quill.getContents().ops,{}).convert();
 }
}

}
