import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare var $: any;
@Component({
  selector: 'app-root-details',
  templateUrl: './root-details.component.html',
  // styleUrls: ['./sidenavpages.component.css']
})
export class RootDetailsComponent implements OnInit {
  id: any;
  tabName: any;
  description: any;
  obj: any;
  rootId: any;
  /** get branch node details
   * @class RootDetailsComponent
   * @constructor
   */
  constructor(
    private route: ActivatedRoute,
    private adm: LoginService,
    private ngxXml2jsonService: NgxXml2jsonService,
    private modalService: BsModalService,
    private sanitizer: DomSanitizer,
    private spinnerService: Ng4LoadingSpinnerService,
  ) {
    this.route.params.subscribe(params => {
      this.rootId = params['id'];
      this.newApp();
    });
  }

  ngOnInit() {}
  /** To send data to next page
   * @class RootDetailsComponent
   * @method newApp
   */
  newApp() {
    this.spinnerService.show();
    this.adm.api_description(this.rootId).subscribe((data: any) => {
      var response = data._body;
      this.spinnerService.hide();
      this.obj = JSON.parse(response);
      this.tabName = this.obj[0].TAB_NAME;
      this.description = this.obj[0].DESCRIPTION;
    });
  }
}
