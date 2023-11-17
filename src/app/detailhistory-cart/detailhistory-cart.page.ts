import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-detailhistory-cart',
  templateUrl: './detailhistory-cart.page.html',
  styleUrls: ['./detailhistory-cart.page.scss'],
})
export class DetailhistoryCartPage implements OnInit {

  listCart: any = [];
  listMember: any = [];
  listPayment:any;

  imageBaseUrl = environment.imageUrl;
  webServiceUrl = environment.baseUrl;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public router:Router,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.getDetailMember();
    this.getListCart(id);
    this.getDetailPayment(id);

  }

  getListCart(id:any) {
    this.http.get(this.webServiceUrl + '/ws_list_cart_history.php?var_id_member=1&var_id_payment='+id)
    .subscribe((res) => {
      this.listCart = res;
      console.log(res);
    });
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
  /** get detail member **/
  getDetailPayment(id:any) {
    this.http
      .get(this.webServiceUrl + '/ws_payment_history.php?var_id_member=1&var_id_payment='+id)
      .subscribe((respayment) => {
        this.listPayment = respayment;
        console.log(respayment);
      });
  }

  gotoHistoryCart(){
    this.router.navigate(['/history-cart']);
  }


}
