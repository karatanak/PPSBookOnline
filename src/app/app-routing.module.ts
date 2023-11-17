import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'category/:id',
    loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'detail-book/:id',
    loadChildren: () => import('./detail-book/detail-book.module').then( m => m.DetailBookPageModule)
  },
  {
    path: 'add-cart',
    loadChildren: () => import('./add-cart/add-cart.module').then( m => m.AddCartPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'checkout-cart',
    loadChildren: () => import('./checkout-cart/checkout-cart.module').then( m => m.CheckoutCartPageModule)
  },
  {
    path: 'history-cart',
    loadChildren: () => import('./history-cart/history-cart.module').then( m => m.HistoryCartPageModule)
  },
  {
    path: 'detailhistory-cart/:id',
    loadChildren: () => import('./detailhistory-cart/detailhistory-cart.module').then( m => m.DetailhistoryCartPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
