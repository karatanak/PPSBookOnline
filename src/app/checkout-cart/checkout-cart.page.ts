import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.page.html',
  styleUrls: ['./checkout-cart.page.scss'],
})
export class CheckoutCartPage implements OnInit {
  listCart: any = [];
  listMember: any = [];
  listBank: any = [];
  totalSum: any;
  totalSumQty: number;
  totalEms: number;
  selectedValue: any;
  IdBank: number;

  imageBaseUrl = environment.imageUrl;
  webServiceUrl = environment.baseUrl;

  isAlertOpen = false;
  alertButtons = ['Action'];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.getListCart();
    this.getDetailMember();
    this.getListBank();
  }

  getListCart() {
    this.http.get(this.webServiceUrl + '/ws_list_cart.php').subscribe((res) => {
      this.listCart = res;
      this.totalSum = this.getTotalCost();
      this.totalSumQty = this.getQTYCost();
      this.totalEms = this.getEms();
    });
  }

  /**total price */
  getTotalCost() {
    let total = 0;
    for (var i = 0; i < this.listCart.length; i++) {
      total = total + this.listCart[i].price_book * this.listCart[i].qty_book;
    }
    return total;
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

  /**total ems */
  getEms() {
    let total_ems = 0;
    total_ems = this.getTotalCost();
    return (total_ems += 50);
  }

  /** get detail member **/
  getDetailMember() {
    this.http
      .get(this.webServiceUrl + '/ws_member.php?var_id_member=1')
      .subscribe((res) => {
        this.listMember = res;
        console.log(res);
      });
  }

  /** get account bank **/
  getListBank() {
    this.http.get(this.webServiceUrl + '/ws_acc_bank.php').subscribe((res) => {
      this.listBank = res;
    });
  }
  /** Select Bank **/
  public BankHandleChange(ev: any) {
    this.selectedValue = JSON.stringify(ev.target.value);
  }

  savePayment(totalEms: any, totalSumQty: any, totalSum: any, IdBank: number) {
  /** If you select Bank **/


    if (IdBank) {

      const data = {
        var_id_bank: IdBank,
        var_id_member: '1',
        var_totalprice: totalSum,
        var_totalqty: totalSumQty,
        var_total_amount: totalEms,
      };
  
      this.http
        .post(
          this.webServiceUrl + '/ws_add_payment.php',
          JSON.stringify(data),
          this.httpHeader
        )
        .subscribe((res) => {
          if(res === 'success'){
            this.showAlertSuccess('คุณสั่งซื้อสินค้าเรียบร้อย');
          }else{
            this.showAlertErrr('ไม่สามารถสั่งซื้อสินค้าได้ ลองใหม่อีกครั้ง');
          }
        });

    } else {
    /** If you not select Bank  **/
      this.showAlertErrr('กรุณาเลือกวิธีชำระเงิน');
    }

  }

  gotoBack(){
    this.router.navigate(['/add-cart']);
  }

  //* Alert**/
  async showAlertSuccess(txt_message:any) {
    const alert = await this.alertController.create({
      header: 'ตะกร้าสินค้า',
      message: txt_message,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('confirm');
            this.router.navigate(['/history-cart']);
          }
        }
      ]
    });
    await alert.present();
  }

  async showAlertErrr(txt_message_error:string) {

    const alert = await this.alertController.create({
      header: 'ตะกร้าสินค้า',
      message: txt_message_error,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('error');
          }
        }
      ]
    });
    await alert.present();
  }
}
