import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-history-cart',
  templateUrl: './history-cart.page.html',
  styleUrls: ['./history-cart.page.scss'],
})
export class HistoryCartPage implements OnInit {

  dataPayment: any = [];
  imageBaseUrl = environment.imageUrl;
  webServiceUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    public router:Router,
    private loadingCtral: LoadingController
  ) {}

 /*ionViewWillEnter() {
    this.getPayment();
  }*/

  ngOnInit() {
    this.getPayment();
  }

  /** list data payment **/
  async getPayment() {
    const loading = await this.loadingCtral.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.http
      .get(this.webServiceUrl + '/ws_list_payment.php?var_id_member=1')
      .subscribe((res) => {
        this.dataPayment = res;
      });

      loading.dismiss();
  }

  detailHistoryCart(id_payment:number){
    this.router.navigate(['/detailhistory-cart',id_payment]);
  }

  gotoBack(){
    this.router.navigate(['/tabs/tab-account']);
  }
}
