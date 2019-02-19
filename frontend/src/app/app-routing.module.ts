import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddComponent} from './component/add/add.component';
import {CardComponent} from './component/card/card.component';
import {FormulaComponent} from './component/formula/formula.component';
import { ImportExportComponent} from './component/import-export/import-export.component';

const routes: Routes = [
  {
    path: '',
    component:CardComponent
  },
  {
    path: 'home/:query',
    component:CardComponent
  },
  {
    path:'form/:mode',
    component:AddComponent
  },
  {
    path:'form/:mode/:id',
    component:AddComponent
  },
  {
    path:'help',
    component:FormulaComponent
  },
  {
    path:'import_export',
    component:ImportExportComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
