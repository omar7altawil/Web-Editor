import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from'@angular/common/http';

import {MatTableModule} from '@angular/material';
import {MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import {MatPaginatorModule} from '@angular/material';
import {MatSelectModule} from '@angular/material';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {NgxPaginationModule} from 'ngx-pagination';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { AddComponent } from './component/add/add.component';
import { CardComponent } from './component/card/card.component';
import { QuestionsService } from './service/questions.service';
import { FormulaComponent } from './component/formula/formula.component';
import { ImportExportComponent } from './component/import-export/import-export.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AddComponent,
    CardComponent,
    FormulaComponent,
    ImportExportComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    HttpClientModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    MatSlideToggleModule,
    FormsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTabsModule,
    MatIconModule,
    MatProgressBarModule,
    NgxPaginationModule,
    ],
  providers: [QuestionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

