import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SidebarComponent } from './sidebar/sidebar.component';
import { CardholderComponent } from './cardholder/cardholder.component';
import { DialogComponent } from './dialog/dialog.component';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ExpandabletextComponent } from './expandabletext/expandabletext.component';
const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CardholderComponent,
    DialogComponent,
    ExpandabletextComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),

    FormsModule,

    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatExpansionModule
  ],
  providers: [],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
