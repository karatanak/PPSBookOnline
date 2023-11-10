import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabAccountPage } from './tab-account.page';

const routes: Routes = [
  {
    path: '',
    component: TabAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabAccountPageRoutingModule {}
