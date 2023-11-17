import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  listCart: any = [];
  totalSumQty: number;
  loading: any;
  imageBaseUrl = environment.imageUrl;
  webServiceUrl = environment.baseUrl;

  constructor(
    public router: Router,
    private http: HttpClient,
    private loadingCtral: LoadingController
  ) {}

  ionViewWillEnter() {
    this.getListCart();
    this.getQTYCost();
  }
  ngOnInit(): void {
    this.getListCart();
  }

  gotoPageAddCart() {
    this.router.navigate(['/add-cart']);
  }

  async getListCart() {
    const loading = await this.loadingCtral.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });
    await loading.present();
    /** list name category **/
    this.http.get(this.webServiceUrl + '/ws_list_cart.php').subscribe((res) => {
      if (res !== 'null') {
        this.listCart = res;
      } else {
        this.listCart === '';
      }
      this.totalSumQty = this.getQTYCost();
    });
    loading.dismiss();
  }

  /**total qty */
  getQTYCost() {
    let total_qty = 0;
    for (var i = 0; i < this.listCart.length; i++) {
      total_qty = total_qty += parseInt(this.listCart[i].qty_book);
    }
    console.log('total_qty =' + total_qty);
    return total_qty;
  }
}
