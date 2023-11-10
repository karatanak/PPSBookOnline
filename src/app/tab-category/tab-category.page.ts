import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoadingController, InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-tab-category',
  templateUrl: './tab-category.page.html',
  styleUrls: ['./tab-category.page.scss'],
})
export class TabCategoryPage implements OnInit {
  dataList :any;
  webServiceUrl = environment.baseUrl;

  constructor(
    public router:Router,
    private http: HttpClient,
    private loadingCtral: LoadingController
  ) { }

  ngOnInit():void{
    this.loadCategory();
  }
  async loadCategory(event?: InfiniteScrollCustomEvent){

    const loading = await this.loadingCtral.create({
      message: 'Loading...', 
      spinner:'bubbles'
    });
    await loading.present();

    this.http.get(this.webServiceUrl+'/ws_all_category.php').subscribe(res => {
      loading.dismiss();
      this.dataList = res;
      console.log(res);
    });
  }

  gotoCategory(id_book_cate:any){
    console.log("go to Category"+id_book_cate);
    this.router.navigate(['/category',id_book_cate]);
  }

}
