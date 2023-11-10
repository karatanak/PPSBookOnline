import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.page.html',
  styleUrls: ['./detail-book.page.scss'],
})
export class DetailBookPage implements OnInit {
  
  dataDetailBook: any;
  imageBaseUrl = environment.imageUrl;
  webServiceUrl = environment.baseUrl;

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getDetailBook(id);
  }

  getDetailBook(id: any) {
    this.http
      .get(this.webServiceUrl + '/ws_detail_book.php?id_book=' + id)
      .subscribe((res) => {
        this.dataDetailBook = res;
        console.log('getListCatagory = ' + this.dataDetailBook);
      });
  }

  AddToCart(product: any) {
    console.log('Cart : ' + product.id_book);
    const data = {
      var_id_book: product.id_book,
      var_name_book: product.namebook_book,
      var_price_book: product.price_book,
      var_qty: '1',
    };

    this.http
      .post(
        this.webServiceUrl + '/ws_add_cart.php',
        JSON.stringify(data),
        this.httpHeader
      )
      .subscribe((res) => {
        if(res === 'success'){
          this.showAlertSuccess();
        }else{
          this.showAlertErrr();
        }
      });
  }

  //* Alert**/
  async showAlertSuccess() {
    const alert = await this.alertController.create({
      header: 'ตะกร้าสินค้า',
      message: 'เพิ่มสินค้าลงตะกร้า เรียบร้อย!',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('confirm');
            this.gotoCart();
          }
        }
      ]
    });
    await alert.present();
  }

  async showAlertErrr() {
    const alert = await this.alertController.create({
      header: 'ตะกร้าสินค้า',
      message: 'ไม่สามารถเพิ่มสินค้าลงตะกร้า!',
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
  

  gotoCart() {
    this.router.navigate(['/add-cart']);
  }
  
  gotoBack() {
    this.router.navigate(['/tabs/tab-home']);
  }
}
