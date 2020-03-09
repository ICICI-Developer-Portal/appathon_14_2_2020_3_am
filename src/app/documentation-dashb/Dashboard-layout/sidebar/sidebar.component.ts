import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  //styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  treeDataKeys: any;
  responseData: any;
  menuArray: any[];
  constructor(
    private router: Router,
    private dashboardService: DashboardService,
  ) {}

  ngOnInit() {
    $(function() {
      $('.sideMenu>.nav-pills li.nav-link').unbind('click');
      $('.sideMenu>.nav-pills li.nav-link').click(function() {
        $(this)
          .siblings('.active')
          .removeClass('active');
        // $(this).siblings(".openDropdown").removeClass("openDropdown");
        $(this).addClass("openDropdown");
        $(this).addClass('active');
      });
      $('.sideMenu>.nav-pills>li.nav-link a').click(function() {
        $(this)
          .parent()
          .siblings('.openDropdown')
          .removeClass('openDropdown');
        $(this)
          .parent()
          .toggleClass('openDropdown');
      });
      $('.sideMenu .openDropdown.active').click(function() {
        $(this).toggleClass('openDropdown');
      });
      $('.sideMenu .nav-pills-first-level>li.nav-link').click(function() {
        $(this)
          .siblings('.active')
          .removeClass('active');
        $(this).addClass('active');
      });
      // $(".sideMenu .nav-pills-first-level>li.nav-link a").click(function () {
      //     $(this).parent().siblings(".openDropdown").removeClass("openDropdown");
      //     $(this).parent().addClass("openDropdown fuck");
      // });
      $('.sideMenu .nav-pills-first-level>li.nav-link a').click(function() {
        $(this).removeClass('active show');
      });
      $('.sideMenu .nav-pills-second-level>li.nav-link').click(function() {
        $(this).toggleClass('openDropdown');
        $(this).addClass('active');
        $(this)
          .siblings('.openDropdown')
          .removeClass('openDropdown active');
      });
      $('.sideMenu .nav-pills-second-level>li.nav-link a').click(function() {
        $(this).removeClass('active show');
      });
    });

    //api for get tree data
    this.dashboardService.getTreeData().subscribe((data: any) => {
      console.log('response');
      console.log(data._body);
      this.responseData = JSON.parse(data._body);
      this.menuArray = this.getMenuData(this.responseData);
      console.log(this.menuArray);
    });
  }
  getMenuData(data): Array<object> {
    let tempArray = [];
    Object.keys(data).forEach(async (eachKey, index) => {
      let tempObj = { menuName: eachKey, menuOrder: index };
      if (typeof data[eachKey] == 'object' && !data[eachKey].API_ID) {
        //parent node
        tempObj['children'] = this.getMenuData(data[eachKey]);
      } else if (typeof data[eachKey] == 'object' && data[eachKey].API_ID) {
        //child
        tempObj['API_ID'] = data[eachKey].API_ID;
      }
      tempArray.push(tempObj);
    });

    tempArray = tempArray.sort((a, b) =>
      a.menuOrder > b.menuOrder ? 1 : b.menuOrder > a.menuOrder ? -1 : 0,
    );
    return tempArray;
  }

  AppId(num: any) {
    this.router.navigate(['/apidetails/', num]);
  }

  scroll_view(id) {
    this.router.navigate(['index']);
    setTimeout(function() {
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }, 10);
  }
}
