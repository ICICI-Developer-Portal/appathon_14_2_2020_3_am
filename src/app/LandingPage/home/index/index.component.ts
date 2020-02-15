import { Component, OnInit, TemplateRef, ɵConsole } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ToasterService, Toast } from 'angular2-toaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services';
import { PasswordValidation } from '../../layout/header/password.validator';
import { VariablesService } from 'src/app/services/Variables.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var showProdTabEnv: any; // just change here from arun answer.
declare var openProdCurrentTabEnv: any;
import { formatDate } from '@angular/common';
import { CONSTANTS } from 'config/application-constant';
import { PATTERNS } from 'config/regex-pattern';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  //styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  IP_Pattern =
    '^([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.' +
    '([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.' +
    '([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.' +
    '([01]?\\d\\d?|2[0-4]\\d|25[0-5])$';
  Callback_URL = 'https?://.+';
  isemail_reg_check: string = '';
  ismobile_reg_check: string = '';
  isotp_reg_check: string = '';

  Cms_allShow: Boolean = false;
  Webservice_Show: Boolean = false;
  Ecollection_Show: Boolean = false;
  showTab = 1;
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  modalRef3: BsModalRef;
  modalRef4: BsModalRef;
  modalRef5: BsModalRef;
  modalRef6: BsModalRef;
  modalRef7: BsModalRef;
  modalRef8: BsModalRef;

  valueWidth = false;
  show: boolean = false;
  showdocs: boolean = false;
  showOtp: boolean = true;
  signupForm: FormGroup;
  isSubmitted: boolean;
  signupForm2: FormGroup;
  signupForm3: FormGroup;
  signupForm4: FormGroup;
  forgetpassForm: FormGroup;
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  logged_in: Boolean = false;
  hideSignupbtn1: Boolean = false;
  isusername: boolean = false;
  issetpwd: boolean = false;
  is_res_error: boolean = false;

  isemail_check: boolean = false;
  shfrmSFFirst: boolean = false;
  shfrmSFSecond: boolean = false;
  shfrmSFThird: boolean = false;

  domainLst = [];
  subdomainlst = [];
  objOnB: any;
  drpHide: boolean;
  shfrmUATFirst: boolean = false;
  shfrmUATSecond: boolean = false;
  shfrmUATThird: boolean = false;

  imageSrc;
  sellersPermitFile: any;
  sellersPermitString: string;

  frmUAT_A1: boolean = false;
  frmUAT_A2: boolean = false;
  frmUAT_A3: boolean = false;
  feedback_email_address: any;
  feedback_location_name: any;
  issues: any = '';
  //Suggestion:any ="";
  feedback_email_test: any;
  itemList = [];
  selectedItems = [];
  settings = {};
  otp_verified = 0;

  list: any = [];

  edit_data = {
    JiraId: '',
    txtMerchantName: '',
    txtDescription: '',
    companyName: '',
    contactPerson: '',
    contactEmail: '',
  };
  otp_txt_id: any = '';
  confirmMsg: any;
  confirmMsgProd: any;
  JiraId: any;
  JiraIdnew: any;
  active: string;
  collection: any;

  accountNumErrorMsg: string = '';
  ipAddressErrorMsg: string = '';
  portNumErrorMsg: string = '';
  urlErrorMsg: string = '';

  constructor(
    private HttpClient: HttpClient,
    private formbuilder: FormBuilder,
    private objOnBoarding: VariablesService,
    private spinnerService: Ng4LoadingSpinnerService,
    private modalService: BsModalService,
    private router: Router,
    private adm: LoginService,
    private toasterService: ToasterService,
    private dashboardService: DashboardService,
  ) {
    this.objOnB = this.objOnBoarding.getonBoarding();
    this.Hide_signbtn();

    sessionStorage.setItem('1105', 'false');
    sessionStorage.setItem('1106', 'false');
    sessionStorage.setItem('1107', 'false');
    this.adm.getUserId().subscribe(data => {
      this.logged_in =
        data != '' && data != null && data != undefined ? true : false;
    });
  }

  ngOnInit() {
    this.settings = {
      singleSelection: false,
      text: 'Select Fields',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      searchPlaceholderText: 'Search Fields',
      enableSearchFilter: true,
      badgeShowLimit: 5,
      groupBy: 'category',
    };
    this.logged_in = this.adm.check_log();
    this.forgetpassForm = this.formbuilder.group({
      username: ['', [Validators.required]],
    });
    this.signupForm = this.formbuilder.group({
      firstname: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      domainNm: ['', [Validators.required]],
      CITY: [''],
      RM: [''],
      email: ['', [Validators.required, Validators.email]],
      otp_verified: ['0'],
      otp_send: ['0'],
    });

    this.signupForm2 = this.formbuilder.group({
      mobile_no: [
        '',
        [Validators.required, Validators.pattern(this.mobnumPattern)],
      ],
      otp_code: ['', [Validators.required]],
    });

    this.signupForm3 = this.formbuilder.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        term: ['', [Validators.required]],
      },
      {
        validator: PasswordValidation.MatchPassword, // your validation method
      },
    );

    this.signupForm4 = this.formbuilder.group({
      termsandcondition: ['', [Validators.required]],
    });

    this.shfrmSFFirst = true;
    this.shfrmSFSecond = false;
    this.shfrmSFThird = false;

    this.shfrmUATFirst = true;
    this.shfrmUATThird = false;
    this.shfrmUATSecond = false;
    this.frmUAT_A1 = true;
    this.frmUAT_A2 = true;
    this.frmUAT_A3 = true;

    this.get_domain_and_apis();
  }

  get firstname() {
    return this.signupForm.get('firstname');
  }
  get companyName() {
    return this.signupForm.get('companyName');
  }
  get domainNm() {
    return this.signupForm.get('domainNm');
  }
  get email() {
    return this.signupForm.get('email');
  }
  get CITY() {
    return this.signupForm.get('CITY');
  }
  get RM() {
    return this.signupForm.get('RM');
  }

  get mobile_no() {
    return this.signupForm2.get('mobile_no');
  }
  get otp_code() {
    return this.signupForm2.get('otp_code');
  }

  get username() {
    return this.signupForm3.get('username');
  }
  get password() {
    return this.signupForm3.get('password');
  }
  get confirmPassword() {
    return this.signupForm3.get('confirmPassword');
  }

  get termsandcondition() {
    return this.signupForm2.get('termsandcondition');
  }

  get username1() {
    return this.forgetpassForm.get('username1');
  }

  toastrmsg(type, title) {
    var toast: Toast = {
      type: type,
      title: title,
      showCloseButton: true,
    };
    this.toasterService.pop(toast);
  }

  UAT_help(UAT_Help: any) {
    this.modalRef = this.modalService.show(UAT_Help, {
      backdrop: 'static',
      class: 'modal-lg',
    });
  }

  openModal2(signup: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(signup, { backdrop: 'static' });
    try {
      this.modalRef.hide();
    } catch (e) {}
    this.shfrmSFFirst = true;
    this.shfrmSFSecond = false;
    this.shfrmSFThird = false;
  }
  already_Log(alreadylogin: any, signup: any) {
    if (localStorage.getItem('id') != null) {
      this.modalRef7 = this.modalService.show(alreadylogin, {
        backdrop: 'static',
      });
    } else {
      this.modalRef2 = this.modalService.show(signup, { backdrop: 'static' });
    }
  }

  openModal(signin: TemplateRef<any>) {
    this.modalRef = this.modalService.show(signin, { backdrop: 'static' });
    try {
      this.modalRef2.hide();
    } catch (e) {}
  }
  Modalforgotpassw(forgotpassw: TemplateRef<any>) {
    this.modalRef3 = this.modalService.show(forgotpassw, {
      backdrop: 'static',
    });
    try {
      this.modalRef.hide();
    } catch (e) {}
  }
  already_login(alreadylogin: TemplateRef<any>) {
    this.modalRef7 = this.modalService.show(alreadylogin, {
      backdrop: 'static',
    });
  }

  Login(username: any, password: any) {
    this.isusername = false;
    this.issetpwd = false;
    this.is_res_error = false;
    if (username == '') {
      this.isusername = true;
      return;
    } else if (password == '') {
      this.isusername = false;
      this.issetpwd = true;
      return;
    }
    var json = { username: username, password: password };
    this.spinnerService.show();
    this.adm.Login(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == true) {
        this.Hide_signbtn();
        this.show = false;
        this.modalRef.hide();
        localStorage.setItem('id', obj.data.id);
        localStorage.setItem('email', obj.data.email);
        localStorage.setItem('username', obj.data.username);
        localStorage.setItem('password', obj.data.password);
        localStorage.setItem('role', 'user');
        this.adm.sendUserId(obj.data.id);
        this.adm.LoginPortal(json).subscribe(
          res => {
            this.router.navigate(['/index']);
          },
          err => {
            this.router.navigate(['/index']);
          },
        );
        this.spinnerService.hide();
      } else {
        this.spinnerService.hide();
        this.isusername = false;
        this.issetpwd = false;
        this.is_res_error = obj.message;
      }
    });
  }

  today = new Date();
  //  Signup function
  sign_up() {
    var CurrentTime = formatDate(
      this.today,
      'dd-MM-yyyy hh:mm:ss a',
      'en-US',
      '+0530',
    );
    //var CurrentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':'+  new Date().getSeconds();
    try {
      var json = {
        username: this.signupForm3.value.username,
        password: this.signupForm3.value.password,
        email: this.signupForm.value.email,
        firstname: this.signupForm.value.firstname,
        lastName: this.signupForm.value.firstname,
        domainNm: this.signupForm.value.domainNm,
        companyName: this.signupForm.value.companyName,
        contactNo: this.signupForm2.value.mobile_no,
        CITY: this.signupForm.value.CITY,
        RM: this.signupForm.value.RM,
        tncConfirmed: '1',
        tncConfirmedDt: CurrentTime,
        approverName: 'YES',
        approverEmailId: 'YES',
        requestDt: CurrentTime,
      };
      this.spinnerService.show();
      this.adm.sign_up(json).subscribe((data: any) => {
        var response = data._body;
        var obj = JSON.parse(response);
        if (obj.status == true) {
          this.signup_jira();
          this.toastrmsg(
            'success',
            'Thanks for registering, once your application is approved it would be conveyed to you on mail sign up.',
          );
          this.spinnerService.hide();
          this.signupForm.reset();
          this.signupForm2.reset();
          this.signupForm3.reset();
          this.signupForm4.reset();
          this.modalRef2.hide();
          this.shfrmSFFirst = true;
          this.shfrmSFSecond = false;
          this.shfrmSFThird = false;
          this.router.navigate(['/index']);
        } else {
          this.shfrmSFThird = true;
          this.shfrmSFSecond = false;
          this.shfrmSFFirst = false;
          this.spinnerService.hide();
          this.toastrmsg('error', obj.message);
        }
      });
    } catch {
      this.toastrmsg('error', console.error());
    }
  }

  signup_jira() {
    var CurrentTime = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
    var json = {
      userName: this.signupForm3.value.username,
      email: this.signupForm.value.email,
      firstName: this.signupForm.value.firstname,
      lastName: this.signupForm.value.firstname,
      domainNm: this.signupForm.value.domainNm,
      companyName: this.signupForm.value.companyName,
      contactNo: this.signupForm2.value.mobile_no,
      CITY: this.signupForm.value.CITY,
      RM: this.signupForm.value.RM,
      tncConfirmed: '1',
      tncConfirmedDt: CurrentTime,
      approverName: 'YES',
      approverEmailId: 'YES',
      requestDt: CurrentTime,
    };
    this.adm.sign_upjira(json).subscribe((data: any) => {
      var response = data._body;
    });
  }

  SendOtp(mobile: any) {
    this.signupForm.controls['otp_send'].setValue('0');
    try {
      if (mobile == '') {
        this.ismobile_reg_check = 'Enter Mobile Number';
        return;
      }
      var json = {
        mobile_no: mobile,
      };
      this.ismobile_reg_check = '';
      this.adm.SendOTP(json).subscribe((data: any) => {
        var response = data._body;
        var obj = JSON.parse(response);
        if (obj.status == true) {
          this.showOtp = true;
          this.show = true;
          this.otp_txt_id = obj.data;
          this.signupForm.controls['otp_send'].setValue('1');
        } else {
          this.signupForm.controls['otp_send'].setValue('0');
          this.showOtp = true;
          this.show = true;
        }
      });
    } catch {}
  }

  SendEmailOtp() {
    try {
      this.adm.SendEmailOTP(this.signupForm.value).subscribe((data: any) => {
        var response = data._body;
        var obj = JSON.parse(response);
        if (obj.status == true) {
          this.show = true;
          //this.toastrmsg('success', "Send Email Otp");
          this.toastrmsg('success', 'Please check your email and verified');
        } else {
          this.toastrmsg('error', 'some thing went wrong');
        }
      });
    } catch {}
  }
  email_validate(searchValue: string): void {}
  verifyOtp1() {
    try {
      this.adm
        .verify_otp(this.signupForm2.value, this.otp_txt_id)
        .subscribe((data: any) => {
          var response = data._body;
          var obj = JSON.parse(response);
          if (obj.status == true) {
            this.shfrmSFThird = true;
            this.shfrmSFFirst = false;
            this.shfrmSFSecond = false;
            this.otp_verified = 1;
            this.signupForm.controls['otp_verified'].setValue('1');
            this.isotp_reg_check = '';
          } else {
            this.shfrmSFSecond = true;
            this.shfrmSFThird = false;
            this.shfrmSFFirst = false;
            this.otp_verified = 0;
            this.signupForm.controls['otp_verified'].setValue('0');
            this.isotp_reg_check = 'Otp not verified';
          }
        });
    } catch {}
  }

  // new signup form function
  save1() {
    this.shfrmSFSecond = true;
    this.shfrmSFFirst = false;
    this.shfrmSFThird = false;
  }

  save2() {
    this.verifyOtp1();
  }

  // End region

  Documentation() {
    if (localStorage.getItem('id') != null) {
      this.router.navigate(['/dashboard']);
      this.showdocs = true;
    } else {
      this.router.navigate(['/index']);
    }
  }

  HowItWork(modal_hwi: any) {
    this.modalRef = this.modalService.show(modal_hwi, {
      backdrop: 'static',
      class: 'modal-lg',
    });
  }

  browse_api(signin: any) {
    if (localStorage.getItem('id') != null) {
      this.router.navigate(['/documentation']);
    } else {
      this.modalRef = this.modalService.show(signin, { backdrop: 'static' });
    }
  }
  // forget Password function
  forgot(username: any) {
    if (username == '') {
      this.toastrmsg('error', 'Enter Username');
      return;
    }
    var json = { username: username };
    this.spinnerService.show();
    this.adm.forgetPassw(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == true) {
        this.toastrmsg('success', ' Please check your mail');
        this.router.navigate(['/index']);
        this.modalRef3.hide();
        this.spinnerService.hide();
      } else {
        this.toastrmsg('error', obj.message);
      }
    });
  }

  OnCheckEmail(Exists_Email: any) {
    try {
      var json = { email: Exists_Email };
      this.adm.Exists_Email(json).subscribe((data: any) => {
        var response = data._body;
        var obj = JSON.parse(response);
        if (obj.status == true) {
          this.isemail_check = true;
        } else {
          this.isemail_check = false;
          this.isemail_reg_check = obj.message;
        }
      });
    } catch {}
  }

  OnCheckUsername(username: any) {
    try {
      var json = { username: username };
      this.adm.Exists_Username(json).subscribe((data: any) => {
        var response = data._body;
        var obj = JSON.parse(response);
        if (obj.status == true) {
          //this.toastrmsg('error', "Username already Exist");
        } else {
          this.toastrmsg('error', 'Username already Exist');
        }
      });
    } catch {}

    //alert(Email);
  }

  show_build(signin: any) {
    if (localStorage.getItem('id') != null) {
      this.router.navigate(['/buildingblock']);
    } else {
      this.modalRef = this.modalService.show(signin, { backdrop: 'static' });
    }
  }

  loans(signin: any) {
    if (localStorage.getItem('id') != null) {
      this.router.navigate(['/loanandcard']);
    } else {
      this.modalRef = this.modalService.show(signin, { backdrop: 'static' });
    }
  }

  account(signin: any) {
    if (localStorage.getItem('id') != null) {
      this.router.navigate(['/accountdeposit']);
    } else {
      this.browse_api(signin);
    }
  }

  payment(signin: any) {
    if (localStorage.getItem('id') != null) {
      this.router.navigate(['/payment']);
    } else {
      this.browse_api(signin);
    }
  }

  corporate(signin: any) {
    if (localStorage.getItem('id') != null) {
      this.router.navigate(['/corporatebank']);
    } else {
      this.browse_api(signin);
    }
  }

  commercial(signin: any) {
    if (localStorage.getItem('id') != null) {
      this.router.navigate(['/commercialbank']);
    } else {
      this.browse_api(signin);
    }
  }

  Hide_signbtn() {
    if (!localStorage.getItem('id')) {
      this.hideSignupbtn1 = true;
    } else {
      this.hideSignupbtn1 = false;
    }
  }

  get_domain_and_apis() {
    this.adm.domain_and_apis().subscribe((data: any) => {
      var obj = JSON.parse(data._body);
      var domain = [];
      for (var i in obj) {
        domain.push(obj[i].domain);
      }
      this.domainLst = domain;
    });
  }

  callSubdomain(value) {
    console.log('doamin name', value);

    if (value != '') {
      this.adm.domain_and_apis().subscribe((data: any) => {
        console.log('get treedata', data);
        var obj = JSON.parse(data._body);
        console.log('obj', obj);
        var subdomain = [];
        for (var i in obj) {
          if (obj[i].domain == value) {
            for (var j in obj[i].sub_domain) {
              subdomain.push(obj[i].sub_domain[j]);
            }
          }
        }
        this.drpHide = true;
        let dt = [];

        this.subdomainlst = subdomain;
        console.log(this.subdomainlst);
        for (let j in this.subdomainlst) {
          let d = this.subdomainlst[j];
          console.log('d', d);
          for (let k in d['api']) {
            dt.push({
              id: d['api'][k]['ApiId'],
              itemName: d['api'][k]['name'],
              category: d['name'],
            });
          }
        }
        this.objOnB.txtSubDomain = [];
        this.itemList = dt;
        console.log(this.itemList);
      });
    } else {
      this.drpHide = false;
      this.toastrmsg('error', 'Please select correct domain type.');
    }
  }
  onItemSelect(item: any) {
    if (item.id == 1105 || item.id == 1106) {
      if (item.id == 1105) {
        sessionStorage.setItem('1105', 'true');
      }
      if (item.id == 1106) {
        sessionStorage.setItem('1106', 'true');
      }
      if (
        sessionStorage.getItem('1105') == 'true' ||
        sessionStorage.getItem('1106') == 'true'
      ) {
        this.Cms_allShow = true;
        this.Webservice_Show = true;
        this.Ecollection_Show = false;
      }
    }

    if (item.id == 1107) {
      sessionStorage.setItem('1107', 'true');
    }
    if (item.id == 1107) {
      this.Cms_allShow = true;
      this.Webservice_Show = false;
      this.Ecollection_Show = true;
    }
  }

  /****** To Unselect group ******/
  onGroupSelect(items) {
    if (items.category == CONSTANTS.CMS_COLLECTION) {
      sessionStorage.setItem('1105', 'false');
      sessionStorage.setItem('1106', 'false');
      sessionStorage.setItem('1107', 'false');
      this.Cms_allShow = false;
      this.Webservice_Show = false;
      this.Ecollection_Show = false;
    }
  }

  /****** To select group ******/
  onGroupDeSelect(items) {
    if (items.category == CONSTANTS.CMS_COLLECTION) {
      sessionStorage.setItem('1105', 'true');
      sessionStorage.setItem('1106', 'true');
      sessionStorage.setItem('1107', 'true');
      this.Cms_allShow = true;
      this.Webservice_Show = true;
      this.Ecollection_Show = true;
    }
  }

  onSelectAll(items: any) {
    if (items.category == CONSTANTS.CMS_COLLECTION) {
      this.Cms_allShow = true;
      this.Webservice_Show = true;
      this.Ecollection_Show = true;

      sessionStorage.setItem('1105', 'true');
      sessionStorage.setItem('1106', 'true');
      sessionStorage.setItem('1107', 'true');
    }
    // var ips = [];
    // for (var i = 0; i < this.objOnB.txtSubDomain.length; ++i) {
    //   ips.push(this.objOnB.txtSubDomain[i].itemName+" ("+this.objOnB.txtSubDomain[i].id+")");
    // }
  }
  onDeSelectAll(items: any) {
    if (items.category == CONSTANTS.CMS_COLLECTION) {
      this.Cms_allShow = false;
      this.Webservice_Show = false;
      this.Ecollection_Show = false;

      sessionStorage.setItem('1105', 'false');
      sessionStorage.setItem('1106', 'false');
      sessionStorage.setItem('1107', 'false');
    }
  }

  OnItemDeSelect(items: any) {
    if (items.id == 1105 || items.id == 1106) {
      if (items.id == 1105) {
        sessionStorage.setItem('1105', 'false');
      }
      if (items.id == 1106) {
        sessionStorage.setItem('1106', 'false');
      }
      if (
        sessionStorage.getItem('1105') == 'false' &&
        sessionStorage.getItem('1106') == 'false'
      ) {
        this.Webservice_Show = false;
      }
      if (
        sessionStorage.getItem('1105') == 'false' &&
        sessionStorage.getItem('1106') == 'false' &&
        sessionStorage.getItem('1107') == 'false'
      ) {
        this.Cms_allShow = false;
        this.Webservice_Show = false;
        this.Ecollection_Show = false;
      }
    }

    if (items.id == 1107) {
      if (items.id == 1107) {
        sessionStorage.setItem('1107', 'false');
      }
      if (
        sessionStorage.getItem('1105') == 'false' &&
        sessionStorage.getItem('1106') == 'false' &&
        sessionStorage.getItem('1107') == 'false'
      ) {
        this.Cms_allShow = false;
        this.Webservice_Show = false;
        this.Ecollection_Show = false;
      }
    }
    if (items.id == 1105 && items.id == 1106 && items.id == 1107) {
      this.Cms_allShow = false;
      this.Webservice_Show = false;
      this.Ecollection_Show = false;
    }
  }

  public picked(event) {
    //this.currentId = field;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.sellersPermitFile = file;
      this.handleInputChange(file);
    }
  }

  handleInputChange(files) {
    var file = files;
    //var pattern = /image-*/;
    var reader = new FileReader();
    // if (!file.type.match(pattern)) {
    //   this.toastrmsg('error', "Invalid Format.");
    //   return;
    // }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    this.imageSrc = base64result;
    localStorage.setItem('Imagepath', this.imageSrc);
  }

  btnNext() {
    this.frmUAT_A2 = true;
    this.frmUAT_A1 = false;
    this.frmUAT_A3 = false;

    this.shfrmUATSecond = true;
    this.shfrmUATFirst = false;
    this.shfrmUATThird = false;
  }

  uatNext(id) {
    if (this.shfrmUATFirst) {
      this.shfrmUATFirst = true;
    } else if (this.shfrmUATSecond) {
      this.shfrmUATFirst = id == 1 ? true : false;
      this.shfrmUATSecond = id > 1 ? true : false;
    } else {
      this.shfrmUATFirst = id == 1 ? true : false;
      this.shfrmUATSecond = id == 2 ? true : false;
      this.shfrmUATThird = id == 3 ? true : false;
    }
  }

  btnContinue() {
    this.shfrmUATThird = true;
    this.shfrmUATFirst = false;
    this.shfrmUATSecond = false;
  }

  openModaldemo(UATconfirm: TemplateRef<any>) {
    this.modalRef = this.modalService.show(UATconfirm);
  }

  btnConfirm(UATconfirm) {
    this.shfrmUATThird = true;
    this.shfrmUATFirst = false;
    this.shfrmUATSecond = false;
    var ips = [];
    for (var i = 0; i < this.objOnB.txtSubDomain.length; ++i) {
      ips.push(
        this.objOnB.txtSubDomain[i].itemName +
          ' (' +
          this.objOnB.txtSubDomain[i].id +
          ')',
      );
    }

    this.collection =
      this.objOnB.AccountNo +
      ' ' +
      this.objOnB.CmsClientCode +
      ' ' +
      this.objOnB.url +
      ' ' +
      this.objOnB.Ip +
      ' ' +
      this.objOnB.Port +
      ' ' +
      this.objOnB.Checksum +
      ' ' +
      this.objOnB.Encryption +
      ' ' +
      this.objOnB.Certificate +
      ' ' +
      this.objOnB.web +
      ' ' +
      this.objOnB.message +
      ' ' +
      this.objOnB.ModeOffered +
      ' ' +
      this.objOnB.noOftransaction +
      ' ' +
      this.objOnB.transactionLimit +
      ' ' +
      this.objOnB.ammountField +
      ' ' +
      this.objOnB.URN1 +
      ' ' +
      this.objOnB.URN2 +
      ' ' +
      this.objOnB.DiscText +
      ' ' +
      this.objOnB.IFSC_Code +
      ' ' +
      this.objOnB.vertualCode +
      ' ' +
      this.objOnB.refundCode +
      ' ' +
      this.objOnB.Account_no;

    var inputFields = {
      userName: localStorage.getItem('username'),
      domainName: this.objOnB.txtDomainType,
      domainApis: ips.toString(),
      mName: this.objOnB.txtMerchantName,
      desc: this.objOnB.txtDescription + ' ' + this.collection,
      spocEmail: this.objOnB.txtContactEmail,
      spocPhone: this.objOnB.txtContactNumber,
      relManager: this.objOnB.txtRelManager,
      env: 'UAT',
      ips: this.objOnB.txtIPAddress,
      callbackUrl: this.objOnB.txtCallbackURL,
      // "file1":file
    };

    const formData = new FormData();

    formData.append('userName', inputFields['userName']);
    formData.append('domainName', inputFields['domainName']);
    formData.append('domainApis', inputFields['domainApis']);
    formData.append('mName', inputFields['mName']);
    formData.append('desc', inputFields['desc']);
    formData.append('spocEmail', inputFields['spocEmail']);
    formData.append('spocPhone', inputFields['spocPhone']);
    formData.append('relManager', inputFields['relManager']);
    formData.append('env', inputFields['env']);
    formData.append('ips', inputFields['ips']);
    formData.append('callbackUrl', inputFields['callbackUrl']);
    console.log(formData);
    let a: any = (<HTMLInputElement>document.getElementById('file1')).files;
    console.log('a', a);
    for (let k = 0; k < a.length; k++) {
      formData.append('file1', a[k]);
    }

    //Jira Service
    this.HttpClient.post<any>(
      'https://developerapi.icicibank.com:8443/api/v2/jira',
      formData,
    ).subscribe(
      res => {
        console.log(res);
        if (res.success === 'true') {
          //File upload service
          var formData = new FormData();
          let b: any = (<HTMLInputElement>document.getElementById('file1'))
            .files;
          for (let k = 0; k < b.length; k++) {
            formData.append(res.jiraId, b[k]);
          }
          this.HttpClient.post<any>(
            'https://developer.icicibank.com/fileUpload',
            formData,
          ).subscribe(
            res => {
              console.log(res);
            },
            err => {
              console.log('err', err);
              console.log('err headers', err.headers);
            },
          );
        }
        this.modalRef = this.modalService.show(UATconfirm, {
          backdrop: 'static',
        });
        this.confirmMsg = res['message'];
        this.confirmMsg = this.confirmMsg.substring(51, 44);
        //this.toastrmsg('success', res['message']);
        this.modalRef4.hide();
      },
      err => {
        console.log('zze', err);
        console.log('zzz', err.headers);
      },
    );
  }

  Close_ConfirmUAT() {
    this.modalRef.hide();
    this.router.navigate(['/index']);
  }
  Close_ConfirmProd() {
    this.modalRef.hide();
    this.router.navigate(['/index']);
  }
  get_onboardUAT(UAT, signin) {
    if (localStorage.getItem('id') != null) {
      this.modalRef4 = this.modalService.show(UAT, { backdrop: 'static' });
    } else {
      this.modalRef = this.modalService.show(signin, { backdrop: 'static' });
    }
    this.shfrmUATFirst = true;
    this.shfrmUATSecond = false;
    this.shfrmUATThird = false;
  }

  get_Production(Production, signin) {
    if (localStorage.getItem('id') != null) {
      this.modalRef5 = this.modalService.show(Production, {
        backdrop: 'static',
      });
      openProdCurrentTabEnv(0);
      setTimeout(() => {
        openProdCurrentTabEnv(0);
      });
      this.getRequestIds();
    } else {
      this.modalRef = this.modalService.show(signin, { backdrop: 'static' });
    }
  }

  getRequestIds() {
    this.list = [];

    let username = localStorage.getItem('username');
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded',
    );

    let options = {
      method: 'POST',
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded',
      ),
    };

    let body = new URLSearchParams();
    body.set('username', username);
    this.HttpClient.post(
      'https://developer.icicibank.com/rest/fetch-jiraid',
      body.toString(),
      options,
    ).subscribe(
      res => {
        this.list = res;
      },
      err => {
        this.list = [];
      },
    );
  }
  open_modal(Interested: TemplateRef<any>) {
    this.modalRef = this.modalService.show(Interested, { backdrop: 'static' });
    try {
      this.modalRef2.hide();
    } catch (e) {}
  }
  signup_link(id) {
    if (this.shfrmSFFirst) {
      this.shfrmSFFirst = true;
    } else if (this.shfrmSFSecond) {
      this.shfrmSFFirst = id == 1 ? true : false;
      this.shfrmSFSecond = id > 1 ? true : false;
    } else {
      this.shfrmSFFirst = id == 1 ? true : false;
      this.shfrmSFSecond = id == 2 ? true : false;
      this.shfrmSFThird = id == 3 ? true : false;
    }
  }

  changeItem(JiraId) {
    this.JiraIdnew = JiraId;
    for (var j in this.list) {
      if (this.list[j]['JiraId'] == JiraId) {
        this.edit_data = this.list[j];
        this.edit_data['CallbackUrl'] = '';
        this.edit_data['whitelistIpInputModal'] = '';
        break;
      }
    }
  }

  btnConfirmProd(Prodconfirm) {
    var ips = [];
    var inputFields = {
      userName: localStorage.getItem('username'),
      domainName: this.edit_data['Domain'],
      domainApis: this.edit_data['DomainApi'],
      mName: this.edit_data['MerchantName'],
      desc: this.edit_data['Description'],
      spocEmail: this.edit_data['SpocEmail'],
      spocPhone: this.edit_data['SpocPhone'],
      relManager: this.edit_data['RelManager'],
      env: 'PROD',
      ips: this.edit_data['whitelistIpInputModal'],
      callbackUrl: this.edit_data['CallbackUrl'],
      file1: '',
      jiraRefId: this.JiraIdnew,
    };

    //console.log('inputFields',inputFields);

    const formData = new FormData();

    formData.append('userName', inputFields['userName']);
    formData.append('domainName', inputFields['domainName']);
    formData.append('domainApis', inputFields['domainApis']);
    formData.append('mName', inputFields['mName']);
    formData.append('desc', inputFields['desc']);
    formData.append('spocEmail', inputFields['spocEmail']);
    formData.append('spocPhone', inputFields['spocPhone']);
    formData.append('relManager', inputFields['relManager']);
    formData.append('env', inputFields['env']);
    formData.append('ips', inputFields['ips']);
    formData.append('callbackUrl', inputFields['callbackUrl']);

    let a: any = (<HTMLInputElement>document.getElementById('file2')).files;
    for (let k = 0; k < a.length; k++) {
      formData.append('file1', a[k]);
    }
    formData.append('jiraRefId', this.JiraIdnew);
    //console.log(formData);
    this.HttpClient.post<any>(
      'https://developerapi.icicibank.com:8443/api/v2/jira',
      formData,
    ).subscribe(
      res => {
        // this.toastrmsg('success', res['message']);
        this.modalRef = this.modalService.show(Prodconfirm, {
          backdrop: 'static',
        });
        this.confirmMsgProd = res['message'];
        this.confirmMsgProd = this.confirmMsgProd.substring(51, 44);
        this.modalRef5.hide();
      },
      err => {
        console.log('zze', err);
        console.log('zzz', err.headers);
      },
    );
  }

  feedback_form_submit(signin) {
    if (this.issues == '') {
      this.toastrmsg('error', 'Please select Issue related to.');
      return;
    }
    //  if(this.Suggestion==""){
    //   this.toastrmsg('error', "Please select Suggestion.");
    //   return;
    //  }
    else {
      if (localStorage.getItem('id') != null) {
        var json = {
          email: this.feedback_email_address,
          location: this.feedback_location_name,
          feedback: this.feedback_email_test,
          topic: this.issues,
          feedbackIn: this.feedback_email_test + '' + this.issues,
          // "feedbackIn":this.feedback_email_test+''+this.issues+' '+this.Suggestion
        };
        this.adm.feedback(json).subscribe((data: any) => {
          var obj = JSON.parse(data._body);
          if (obj.status == true) {
            this.toastrmsg('success', 'Thank your for your suggestion.');
            this.feedback_email_address = '';
            this.feedback_location_name = '';
            this.feedback_email_test = '';
            this.issues = '';
          } else {
            this.toastrmsg('error', obj.message);
          }
        });
      } else {
        this.browse_api(signin);
      }
    }
  }
  Inter_full_name: String = '';
  Inter_email: String = '';
  Inter_contactnumber: String = '';
  Inter_location: String = '';
  Inter_company: String = '';
  Inter_requirements: String = '';

  inter_submit() {
    // var feedback =
    //   'User Interested Full Name = ' +
    //   this.Inter_full_name +
    //   ' Contact Number =' +
    //   this.Inter_contactnumber;
    // var json = { email: this.Inter_email, feedbackIn: feedback };
    // this.adm.feedback(json).subscribe((data: any) => {
    //   var obj = JSON.parse(data._body);
    //   if (obj.status == true) {
    //     this.toastrmsg('success', 'Thank your for your Request.');
    //     this.Inter_full_name = '';
    //     this.Inter_contactnumber = '';
    //     this.Inter_email = '';
    //     this.modalRef.hide();
    //   } else {
    //     this.toastrmsg('error', obj.message);
    //   }
    // });
    var feedback =
      'User Interested Full Name = ' +
      this.Inter_full_name +
      ' Contact Number =' +
      this.Inter_contactnumber;
    var json = {
      fullName: this.Inter_full_name,
      email: this.Inter_email,
      mobile: this.Inter_contactnumber,
      location: this.Inter_location,
      company: this.Inter_company,
      requirements: this.Inter_requirements,
      feedbackIn: feedback,
    };
    console.log('josn', json);
    this.adm.feedback(json).subscribe((data: any) => {
      var obj = JSON.parse(data._body);
      if (obj.status == true) {
        this.toastrmsg('success', 'Thank your for your Request.');
        this.Inter_full_name = '';
        this.Inter_contactnumber = '';
        this.Inter_email = '';
        this.Inter_location = '';
        this.Inter_company = '';
        this.Inter_requirements = '';
        this.modalRef.hide();
      } else {
        this.toastrmsg('error', obj.message);
      }
    });
  }

  alredy_login() {
    this.modalRef7.hide();
    this.router.navigate(['/documentation']);
  }

  HWI_link(id) {
    this.showTab = id;
    //this.active ='#F06321';
  }

  onChangeAccountNum(event) {
    let result;
    let patt = PATTERNS.REGEX_NUMBERS;
    if (event === '') {
      this.accountNumErrorMsg = '';
    } else {
      result = patt.test(event);
      if (result === false) {
        this.accountNumErrorMsg = CONSTANTS.NUMERIC_VAL;
      } else {
        this.accountNumErrorMsg = '';
      }
      return result;
    }
  }

  onChangeIpAddress(event) {
    let result;
    let pattern = PATTERNS.REGEX_IP;
    if (event === '') {
      this.ipAddressErrorMsg = '';
    } else {
      result = pattern.test(event);
      if (result === false) {
        this.ipAddressErrorMsg = CONSTANTS.IP_ADDRESS;
      } else {
        this.ipAddressErrorMsg = '';
      }
      return result;
    }
  }

  onChangePort(event) {
    let result;
    let pattern = PATTERNS.REGEX_PORT;

    if (event === '') {
      this.portNumErrorMsg = '';
    } else {
      result = pattern.test(event);
      if (result === false) {
        this.portNumErrorMsg = CONSTANTS.PORT_ADDRESS;
      } else {
        this.portNumErrorMsg = '';
      }
      return result;
    }
  }

  onChangeURL(event) {
    let result;
    let pattern = PATTERNS.REGEX_URL;
    if (event === '') {
      this.urlErrorMsg = '';
    } else {
      result = pattern.test(event);
      if (result === false) {
        this.urlErrorMsg = CONSTANTS.URL;
      } else {
        this.urlErrorMsg = '';
      }
      return result;
    }
  }

  numericOnly(event): boolean {
    console.log('keypress');
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }
}
