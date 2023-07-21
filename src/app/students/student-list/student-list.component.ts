import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, map } from "rxjs/operators";
// import { Table } from "primeng/table";
import { StudentService } from '../student.service';
import { FormGroup } from '@angular/forms';
import { StudentDetailsComponent } from '../student-details/student-details.component';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  template: '<app-student-details></app-student-details>',
})
export class StudentListComponent implements OnInit {

  @ViewChild(StudentDetailsComponent) child: StudentDetailsComponent;

  students: any;
  studentId: number;
  optionSalary: string = "Show Salary All"
  showAllSalary: boolean = false

  _form: FormGroup;

  _keyword: string;

  _totalRecords: number = 0;
  _page: number = 1;
  _rows: number = 10;
  _selectedRow: any;
  _selectedStudentRow: any;
  _selectedStudentId: number;

  _isRowExpanded: boolean = false;
  _expandedRows = {};
  _dataLength: number;
  _isShowStudentDetails: boolean;

  key = ''
  isAsc: boolean = true;
  pageSize: any
  currentPage: number = 0
  private _searchText: string | undefined;
  _tableWidth: number = 100;

  constructor(private studentService: StudentService,
    private router: Router) { }

  ngOnInit(): void {

    this.getStudents();
  }

  private getStudents() {

    this.studentService
      .getStudentsList()
      .pipe(
        finalize(() => {
        })
      )
      .subscribe(
        (response) => {
          this.students = []
          this.students = response
        },
        (error) => {
        }
      );

  }

  private searchStudents(searchText: string) {

    this.studentService
      .searchStudents(searchText)
      .pipe(
        finalize(() => {
        })
      )
      .subscribe(
        (response) => {
          this.students = []
          this.students = response
        },
        (error) => {
        }
      );

  }

  studentDetails(id: number) {
    this.router.navigate(['student-details', id]);
  }

  updateStudent(id: number) {
    this.router.navigate(['update-student', id]);
  }

  deleteStudent(id: number) {
    if (confirm("Are you sure to delete ")) {
      this.studentService.deleteStudent(id).subscribe(data => {
        this.getStudents();
      })
    }
    this.isDetailShow = false;
    this._tableWidth = 100;

  }


  expandAll() {
    if (!this._isRowExpanded) {
    } else {
      this._expandedRows = {};
    }
    this._isRowExpanded = !this._isRowExpanded;
  }

  onRowExpand() {
    if (Object.keys(this._expandedRows).length === this._dataLength) {
      this._isRowExpanded = true;
    }
  }

  onRowCollapse() {
    if (Object.keys(this._expandedRows).length === 0) {
      this._isRowExpanded = false;
    }
  }

  onLazyLoad(event: any) {
    this._page = event.first / event.rows + 1;
    this._rows = event.rows;

    // if (this._currentSearchMethod == SearchMethod.Regular) {
    // }

  }

  onFeeScheduleDetailViewShow(event: any, header: any) {

    // this._selectedFeeScheduleId = feeScheduleId;
    this._selectedStudentId = event?.data?.id;
    //  this.getFeeScheduleDetailsById();
    this._isShowStudentDetails = true;
  }

  alert(a: any) {
    alert(a)
  }

  studentSearchKeyUp(event: any) {
    debugger
    const input = document.getElementById('search') as HTMLInputElement | null;
    const value = input?.value == undefined ? '' : input?.value
    if (event.keyCode == 13 || value.length >= 3) {
      this.searchStudents(value);
    }
    if (value.length == 0) {
      this.getStudents();
    }

  }

  clearSearch() {
  }
  isDetailShow: boolean
  _selectedStudent: number

  onRowClick(studentId: number) {
    if (this.isDetailShow == undefined) {
      this.isDetailShow = true
    }
    if (this._selectedStudent != studentId && this.isDetailShow == false) {
      this.isDetailShow = true
    }
    if (this._selectedStudent == studentId) {
      this.isDetailShow = !this.isDetailShow
    }
    this._selectedStudent = studentId
    this.child.onRecordSelect(studentId)

    if(this.isDetailShow)
    {
      this._tableWidth = 85;
    }
    else
    {
      this._tableWidth = 100;
    }

  }

  sortName(column: any) {
    this.key = column
    this.isAsc = !this.isAsc
  }


}
