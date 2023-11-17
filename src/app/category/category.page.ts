import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  dataListCate:any;
  dataNameCate:any=[];

  imageBaseUrl = environment.imageUrl;
  webServiceUrl = environment.baseUrl;

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private http: HttpClient,
    public router:Router,
    private alertController: AlertController,
    private loadingCtral: LoadingController,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getListCatagory(id);

  }

  goBackPage(){
    this.navCtrl.navigateForward('tabs/tab-category');
  }

  async getListCatagory(id:any){

    const loading = await this.loadingCtral.create({
      message: 'Loading...', 
      spinner:'bubbles'
    });
    await loading.present();
    /** list data **/
    this.http.get(this.webServiceUrl+'/ws_id_category.php?id_category='+id).subscribe(res => {
      this.dataListCate = res;
      console.log("getListCatagory = "+res);
    });

    /** list name category **/
    this.http.get(this.webServiceUrl+'/ws_name_category.php?id_category='+id).subscribe(resname => {
      this.dataNameCate = resname;
      console.log(resname);
    });

    loading.dismiss();

  }

  AddToCart(product: any) {
    console.log('Cart : ' + product.id_book);
    const data = {
      var_id_book: product.id_book,
      var_image_book: product.image_book,
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

  gotoDetailBook(id_book:any){
    console.log("go to DetailBook"+id_book);
    this.router.navigate(['/detail-book',id_book]);
  }


}
