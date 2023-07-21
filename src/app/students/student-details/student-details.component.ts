import { Component, Input, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Student } from '../student';
import { StudentService } from '../student.service';



@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})


export class StudentDetailsComponent implements OnInit {

  onRecordSelect(selectedStudentId:number)
  {
    this.studentService.getStudentById(selectedStudentId).subscribe( data => {
      this.student = data;
    });
  }

  @Input() _studentId?: number;

  selectedStudentId : any;
  id: number
  student: Student
  constructor(private route: ActivatedRoute, private studentService: StudentService) { }

 
  ngOnInit(): void {
    debugger
    this.id = this.route.snapshot.params['id'];

    this._studentId
    this.selectedStudentId = (this.id==undefined||this.id==null )?this._studentId:this.id
    this.studentService.getStudentById(this.route.snapshot.params['id']).subscribe( data => {
      this.student = data;
    });

  }



}
