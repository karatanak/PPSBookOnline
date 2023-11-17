import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoadingController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab-home',
  templateUrl: './tab-home.page.html',
  styleUrls: ['./tab-home.page.scss'],
})

export class TabHomePage implements OnInit {

  dataList :any;
  imageBaseUrl = environment.imageUrl; // webservice image
  webServiceUrl = environment.baseUrl; // webservice databases
  loading: any;

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private loadingCtral: LoadingController,
    public router:Router,
    private alertController: AlertController) { }

    ngOnInit():void{
      this.loadAllBook();
    }

    async loadAllBook(event?: InfiniteScrollCustomEvent){

      const loading = await this.loadingCtral.create({
        message: 'Loading...', 
        spinner:'bubbles'
      });
      await loading.present();
  
      this.http.get(this.webServiceUrl+'/ws_all_book.php').subscribe(res => {
        this.dataList = res;
      });
      loading.dismiss();
    }

    gotoDetailBook(id_book:any){
      console.log("go to DetailBook"+id_book); 
      this.router.navigate(['/detail-book',id_book]);//ส่งค่าเป็น id ไปที่หน้า detail-book
    }

    AddToCart(product: any) {
      console.log('Cart : ' + product);
      const data = {
        var_id_book: product.id_book,
        var_image_book: product.image_book,
        var_name_book: product.namebook_book,
        var_price_book: product.price_book,
        var_qty: '1',
      };
  
      this.http.post(this.webServiceUrl + '/ws_add_cart.php', JSON.stringify(data),this.httpHeader).subscribe((res) => {
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
    

}
