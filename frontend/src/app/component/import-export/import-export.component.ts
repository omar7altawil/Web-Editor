import { Component } from '@angular/core';
import {QuestionsService} from '../../service/questions.service';
import 'rxjs/Rx' ;
declare var require: any

const Json2csvParser = require('json2csv').Parser;

@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.scss']
})
export class ImportExportComponent{
  bar:boolean=false;
  selectedFile: File;
  filename:string;
  filesize:Number;
    Subject: string[] = ['All', 'math', 'science'];;
  selectedSubject: string = 'All';
  Grade: string[] = ['All', '6', '7', '8'];
  selectedGrade: string = 'All';
  Status: string[] = ['All', 'Reviewed', 'Not Reviewed'];
  selectedStatus: string = 'All';
  queryObj:any;

  constructor(private data: QuestionsService) { }


  onFileChanged(event){
   this.selectedFile = event.target.files[0]
  if(this.selectedFile){
    this.bar=true;
    this.filename=this.selectedFile.name;
    this.filesize=this.selectedFile.size;
    const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    console.log(uploadData)
    this.data.upload(uploadData).subscribe(event => {
      console.log('event',event);
      });
    }
  }
  refreshList() {
     this.queryObj = {
      Grade: this.selectedGrade !== 'All' ? this.selectedGrade : undefined,
      subject: this.selectedSubject !== 'All' ? this.selectedSubject : undefined,
      reviewed: this.selectedStatus !== 'All' ? this.selectedStatus === 'Reviewed' : undefined,
    }
  }
  export(){
    this.data.download(this.queryObj).subscribe(data => this.downloadFile(data)),
                 error => console.log("Error downloading the file."),
                 () => console.log("downloading");
  }

  downloadFile(data: any){
    const parser = new Json2csvParser(data[0][0]);
    const csv = parser.parse(data);
    var blob = new Blob([csv], { type: 'text/csv' });
    var url= window.URL.createObjectURL(blob);
    window.open(url);
  }
}