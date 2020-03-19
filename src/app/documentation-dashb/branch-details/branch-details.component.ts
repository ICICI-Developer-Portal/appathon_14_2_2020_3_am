import { Component, OnInit, TemplateRef, Pipe, ɵConsole } from "@angular/core";
import { LoginService } from "src/app/services";
import { NgxXml2jsonService } from "ngx-xml2json";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
declare var $: any;
@Component({
  selector: "app-branch-details",
  templateUrl: "./branch-details.component.html"
  //styleUrls: ['./branch-details.component.css']
})
export class BranchDetailsComponent implements OnInit {
  id: any;
  resp: any;
  description: any;
  branchId: any;
  obj: any;
  /** @class BranchDetailsComponent
   * @constructor
   */
  constructor(
    private route: ActivatedRoute,
    private adm: LoginService,
    private ngxXml2jsonService: NgxXml2jsonService,
    private modalService: BsModalService,
    private sanitizer: DomSanitizer,
    private spinnerService: Ng4LoadingSpinnerService
  ) {
    this.route.params.subscribe(params => {
      this.branchId = params["id"];
      this.newApplication();
    });
  }

  ngOnInit() {}
  /** get branch node details
   * @class BranchDetailsComponent
   * @method newApplication
   */
  newApplication() {
    this.spinnerService.show();
    this.adm.api_description(this.branchId).subscribe((data: any) => {
      var response = data._body;
      this.spinnerService.hide();
      this.obj = JSON.parse(response);
      this.resp = this.obj[0].TAB_NAME;
      this.description = this.obj[0].DESCRIPTION;
    });
  }
}
