import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  //styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  faqObj:any;
  faqHeader:any;
  faqObjQues:any=[];
  faqObjAns:any=[];
  faqObjList:any;
  faqHeaderList:any;
  constructor(
    private adm: LoginService,
    private router:Router,
  ) { }

  ngOnInit() {
    this.adm.faq().subscribe((data:any)=> {
      this.faqObjList = data._body;
      this.faqObjList= this.faqObjList.replace(/\\n/g, "\\\\n")
      this.faqObj = JSON.parse(this.faqObjList)
       for (var i  in this.faqObj){
        this.faqObjQues.push(this.faqObj[i][1])
        this.faqObjAns.push(this.faqObj[i][2])
       this.faqObjAns= this.faqObjAns.map(function(str) {
          return str.replace(/\\n/g, '\n')
        });
        }
        this.faqHeaderList = JSON.parse(this.faqObjList)
        this.faqHeader = this.faqHeaderList["1"][0]
    },
    err => {
      console.log('err', err);
      this.router.navigate(['error']);
    },)
  }
}
