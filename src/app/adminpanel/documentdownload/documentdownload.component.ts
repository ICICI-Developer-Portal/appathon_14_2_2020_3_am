import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
// import 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-documentdownload',
  templateUrl: './documentdownload.component.html',
  // styleUrls: ['./documentdownload.component.css']
})
export class DocumentdownloadComponent implements OnInit {
  dataSource: any;
  p: any = '';
  role: string;
  certificate: any;
  APIListV: string; 
  appNameList =[];
  JiraID:any=[];
  searchText;
  filter : any = "";
  public settings = {};
  //showurl:Boolean;
  constructor(
    private adm: LoginService,
    private spinnerService: Ng4LoadingSpinnerService,
  ) {
    this.request_data();
  }

  ngOnInit() {
    this.settings = {
      singleSelection: false,
      idField: 'key',
      textField:'name',
      selector:'selected',
      enableCheckAll: true,
      selectAllText: 'Choose All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 3,
      searchPlaceholderText: 'Search',
      noDataAvailablePlaceholderText: 'No data available',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };
  }

  request_data() {
    this.spinnerService.show();
    //  this.role=localStorage.getItem('role')
    //   if(localStorage.getItem('role')=='admin'){
    //     this.showurl=true;
    //   }else{
    //   this.showurl=false;
    //   }
    this.adm.Onboardrequestsuser().subscribe((data: any) => {
      var response = data._body;

      var obj = JSON.parse(response);
      this.dataSource = obj;
            
      // var AppName = [];
    
      // for(var i in obj)
      // {
      //    AppName.push(obj[i].JiraId);
      //   this.JiraID[obj[i].JiraId] = obj[i]['JiraId'];
      // }   
      // console.log("Api sort");   
    
      
      // var sort_arr = AppName.sort();
      // var nn = [];
      // var pp = [];
      // var word = "A";
      // var obj1 = {};
      // console.log('sort_arr',sort_arr);
      // for(var i in sort_arr){
      //   if(word == sort_arr[i][0]){
      //     pp.push(sort_arr[i]); 
      //   } else {
      //     obj1[word] = pp;
      //     nn.push(obj1);
      //     word = sort_arr[i][0];
      //     pp = [];
      //     pp.push(sort_arr[i]);
      //   }
        
      // }
      // this.appNameList = nn[0];
      // console.log(this.appNameList);
      this.spinnerService.hide();
    });
  }
  // onSearchChange(searchValue: string): void {  
  //   this.adm.Onboardrequestsuser().subscribe((data: any) => {
  //     var obj = JSON.parse(data._body);
  //     this.dataSource = obj; 
  //     var ApiName = [];
  //     for(let i=0;i<this.dataSource.length;i++)
  //     {        
  //      var apiname =this.dataSource[i]["JiraId"].toString().toLocaleLowerCase().trim();// this.APIListV[i]["ApiName"].toString().toLowerCase().trim(); //|| this.APIListV[i]["ApiDesc"].toLowerCase().indexOf(searchValue.toLowerCase()) !==-1
  //      var ApiDesc =this.dataSource[i]["Domain"].toString().toLocaleLowerCase().trim();
  //      var a = apiname.includes(searchValue.toLocaleLowerCase().trim());
  //      var b = ApiDesc.includes(searchValue.toLocaleLowerCase().trim());
  //      var c =this.dataSource[i]["JiraId"].toString().includes(searchValue.toLocaleLowerCase());       
  //       if(a || b || c)
  //       {
  //         ApiName.push(this.dataSource[i]["JiraId"]);
  //       } 
                 
  //     }
  //     console.log("ApiName : "+ ApiName.sort()); 
  //     var sort_arr = ApiName.sort();
  //     var nn = [];
  //     var pp = [];
  //     var word = "";
  //     var obj1 = {};
  //     for(var i in sort_arr){
  //       if(word == sort_arr[i][0]){
  //         pp.push(sort_arr[i]); 
  //         obj1[word] = pp;
  //         nn.push(obj1);
  //       } else {
  //         obj1[word] = pp;
  //         nn.push(obj1);
  //         word = sort_arr[i][0];
  //         pp = [];
  //         pp.push(sort_arr[i]);
  //       }
        
  //     }
  //     this.appNameList = nn[0];
  //     console.log(this.appNameList);
  //   }); 
  // }

  // search( A:any){
  //   this.onSearchChange(A);
  //   this.searchtext=A;
  // }
  // hasDuplicates(arr) {
  //   var counts = [];
  //   for (var i = 0; i <= arr.length; i++) {
  //     if (counts[arr[i]] === undefined) {
  //       counts[arr[i]] = 1;
  //     } else {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  //supporting .sql,.cer (not supporting .png, .docx)
  downloadCertificate(url) {
    var json = {
      filePath: url,
    };

    var fileName = url.substring(url.lastIndexOf('/') + 1);
    var fileType = url.substring(url.lastIndexOf('.') + 1);

    this.adm.downloadCertificate(json).subscribe((data: any) => {
      this.certificate = data._body;
      console.log(data._body);
      if(fileType === "pdf"){
      var blob = new Blob([this.certificate], {
        type: "application/pdf"
      });
      saveAs(blob, fileName);
    }
    if(fileType === "cer" || fileType === "crt" || fileType ==="txt" || fileType === "pem"){
      var blob = new Blob([this.certificate], {
        type: 'text/plain',
      });
      saveAs(blob, fileName);
    }
    if(fileType === "png"){
      var blob = new Blob([this.certificate], {
        type: 'image/png',
      });
      saveAs(blob, fileName);
    }
    if(fileType === "jpeg" || fileType === "jpg"){
      var blob = new Blob([this.certificate], {
        type: 'image/jpeg',
      });
      saveAs(blob, fileName);
    }
    if(fileType === "xlsx"){
      var blob = new Blob([this.certificate], {
        type: ' application/vnd.ms-excel',
      });
      saveAs(blob, fileName);
    }
    if(fileType === "xlsx"){
      var blob = new Blob([this.certificate], {
        type: ' application/vnd.ms-excel',
      });
      saveAs(blob, fileName);
    }
    if(fileType === "zip"){
      var blob = new Blob([this.certificate], {
        type: 'application/zip',
      });
      saveAs(blob, fileName);
    }
    });
  }

}
