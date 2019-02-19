import {
  Component,
  OnInit
} from '@angular/core';
import {
  QuestionsService
} from '../../service/questions.service';
import {
  Question
} from '../../model/Questions';
import {
  ActivatedRoute
} from "@angular/router"


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  checked: boolean = false;
  questions: Question[];
  p: number = 1;
  collection: any[] = this.questions;  
  Subject: string[] = ['All', 'math', 'science'];;
  selectedSubject: string = 'All';
  Grade: string[] = ['All', '6', '7', '8'];
  selectedGrade: string = 'All';
  Status: string[] = ['All', 'Reviewed', 'Not Reviewed'];
  selectedStatus: string = 'All';



  refreshList() {
    const queryObj = {
      Grade: this.selectedGrade !== 'All' ? this.selectedGrade : undefined,
      subject: this.selectedSubject !== 'All' ? this.selectedSubject : undefined,
      reviewed: this.selectedStatus !== 'All' ? this.selectedStatus === 'Reviewed' : undefined,
    }
    this.data.GetQuestions(queryObj).subscribe(data => {
      this.questions = data;
    });
  }

  delete(id) {
    if (confirm("Are you sure you want to delete question of ID:" + id + '?')) {
      this.data.DeleteQuestion(id).subscribe();
      this.refreshList();
    }
  }

  //Change to arabic
  Arabic() {
    this.checked = !this.checked;
  }
  review(event) {
    event.reviewed = !event.reviewed
    console.log(event)
    this.data.UpdateQuestion(event).subscribe();
  }
  constructor(private route: ActivatedRoute, private data: QuestionsService) {

  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.query) {
        this.data.GetQuestion(params.query).subscribe(data => this.questions = [data]);
      } else
        this.refreshList()
    });
  }


}
