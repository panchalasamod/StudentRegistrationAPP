import {
  Component, OnInit, Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student, } from '../student';
import { StudentService } from '../student.service';

import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { ImageTransform, ImageCroppedEvent, LoadedImage, Dimensions, base64ToFile } from 'ngx-image-cropper';
import * as moment from 'moment';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {

  id: number;
  scale = 1;
  transform: ImageTransform = {};
  aspectRatio: number = 1;
  imageFile: File;
  imageSrc: any;
  tmpImageSrc: SafeUrl;
  imgErrorMessage: string;

  minImageWidth = 100;
  minImageHeight = 100;

  @Output() imageCroppedUploadEvent = new EventEmitter<object>();

  @ViewChild("fileInputEl") fileInputEl: ElementRef;
  @ViewChild("editImageElem") editImageEl: ElementRef;

  imageChangedEvent: any = '';
  croppedImage: any = '';

  student: Student = new Student();
  base64textString: any = null;


  constructor(
    private studentService: StudentService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.croppedImage = null;
    this.imageChangedEvent = null;
    this.id = this.route.snapshot.params['id'];


  }



  saveStudent() {
    debugger
    this.student.Base64Image = (this.base64textString == null || this.base64textString == '') ?this.student.Base64Image.replace("data:image/png;base64,","") : this.base64textString  

    this.studentService.updateStudent(this.student).subscribe(data => {
      console.log(data);
      this.goToStudentList();
    },
      error => console.log(error));
  }

  goToStudentList() {
    this.router.navigate(['/students']);
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;

    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }

  }

  handleReaderLoaded(e: any) {
    this.base64textString = btoa(e.target.result);
  }

  imageCropped(event: any) {
    debugger
    let a = '';
    a = event.blob;
    var reader = new FileReader();
    reader.readAsDataURL(event.blob);

    // this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    // event.blob can be used to upload the cropped image
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady(event: any) {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  onSubmit() {
    console.log(this.student);
    this.saveStudent();
  }


  onCropImage() {
    this.imageCroppedUploadEvent.emit(this.croppedImage);
  }

}
