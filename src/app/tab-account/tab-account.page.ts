import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-tab-account',
  templateUrl: './tab-account.page.html',
  styleUrls: ['./tab-account.page.scss'],
})
export class TabAccountPage implements OnInit {

  listAcc:any;
  imageBaseUrl = environment.imageUrl;
  webServiceUrl = environment.baseUrl;

  constructor(
    public router: Router,
    private http: HttpClient,
    ) { }

  ngOnInit() {
    this.listAccount();
  }

  listAccount(){
    this.http.get(this.webServiceUrl+'/ws_member.php?var_id_member=2').subscribe(res => {
      this.listAcc = res;
      console.log(res);
    });
  }

  gotoCartHistory(){
    console.log("gotoCartHistory");
    this.router.navigate(['/history-cart']);
    
  }

  gotoSettingAccount(){
    console.log("gotoSettingAccount");
  
  }

  
}
