import { Component, inject } from '@angular/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { FormsModule } from '@angular/forms';
import { addDays, formatDistance } from 'date-fns';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { ProjectService } from '../../../../core/services/projects.service';
@Component({
  selector: 'app-tasks-detail',
  imports: [NzFormModule, NzUploadModule, NzListModule, NzIconModule, FormsModule, NzInputModule, NzAvatarModule, NzSelectModule, NzModalModule, NzButtonModule, AngularEditorModule, NzCommentModule],
  templateUrl: './tasks-detail.component.html',
  styleUrl: './tasks-detail.component.css'
})
export class TasksDetailComponent {
  private projectSvc = inject(ProjectService);
  acceptibleExts = ['jpg', 'png', 'pdf', 'jpeg'];
  AcceptedFormats = this.acceptibleExts.map(x => '.' + x).join(', ');
  htmlContent!: string;
  readonly modal = inject(NzModalRef);
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image'
    //   upload: (file: File) => { ... }
    // uploadWithCredentials: false,
    // sanitize: true,
    // toolbarPosition: 'top',
    // toolbarHiddenButtons: [
    //   ['bold', 'italic'],
    //   ['fontSize']
    // ]
  };
  data = [
    {
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      datetime: formatDistance(new Date(), addDays(new Date(), 1))
    },
    {
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      datetime: formatDistance(new Date(), addDays(new Date(), 2))
    }
  ];

  documents: any = [];
  fileList: NzUploadFile[] = [];

  // beforeUpload = (index: number | null = null) => {
  //   return (file: NzUploadFile) => {
  //     // console.log(file);
  //     const uFile = this.getFileObj(file);
  //     // console.log(uFile);
  //     this.documents = uFile;
  //     // if ((this.isFileExtValid(file) && this.documentSvc.isFileSizeValid(file))) {
  //     //   this.documentSvc.getBase64(uFile).then(b64 => {
  //     //     if (index != null) this.patchFile(file.name!, b64.split(',')[1], index);
  //     //     else this.onAdd(file.name!, b64.split(',')[1]);
  //     //   });
  //     // }
  //     return true;
  //   };
  // };


  getFileObj(file: NzUploadFile) {
    console.log(file);
    const formData = new FormData();
    formData.append('files[]', file as any);
    const uFile = formData.getAll('files[]')[0] as File;
    formData.append('file', uFile, uFile.name);

    return uFile;
  }
  beforeUpload = (file: NzUploadFile): boolean => {
    console.log('Before Upload:', file);  // 👈 check here if originFileObj exists
    const uFile = this.getFileObj(file);
    this.getBase64(uFile).then(b64 => {
      console.log(b64);
      // if (index != null) this.patchFile(file.name!, b64.split(',')[1], index);
      // else this.onAdd(file.name!, b64.split(',')[1]);
    });
    return false; // ❗ Prevent auto upload, keeps originFileObj
  };
  getBase64(img: File): Promise<string> {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => res(reader.result!.toString()));
      reader.readAsDataURL(img);
    });
  }
  handleUpload() {
    const formData: any = new FormData();

    this.fileList.forEach((file: any) => {
      if (file.originFileObj) {
        formData.append('files[]', file.originFileObj as File);
      } else {
        console.warn('No originFileObj in file:', file);
      }
    });

    // ✅ Correct way to inspect FormData contents
    for (const pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }

    // Example POST request:
    // this.http.post('YOUR_API_ENDPOINT', formData).subscribe(...)
  }
  save() {
    const formData = new FormData();

    this.fileList.forEach((file: NzUploadFile) => {
      const realFile = (file as any).originFileObj || (file as any);
      formData.append('files[]', realFile);
    });

    // this.uploading = true;
    // You can use any AJAX library you like
    // const req = new HttpRequest('POST', 'https://www.mocky.io/v2/5cc8019d300000980a055e76', formData, {
    //   // reportProgress: true
    // });
    console.log(formData);
    // console.log(this.documents);
    this.projectSvc.uploadFile(this.documents).pipe().subscribe((res) => {
      console.log(res);
    })
    // console.log("Html content is here", this.htmlContent);
  }
  cancel() {
    this.modal.destroy();
  }
}

