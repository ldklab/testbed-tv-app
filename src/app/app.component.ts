import { Component } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public now: Date = new Date();

  constructor(public dialog: MatDialog) {
      setInterval(() => {
        this.now = new Date();
      }, 1);
  }

  notification = {
    title: "Warning",
    description: "A new urecognizable device was plugged to the network. In order to better secure the network please perform the following actions and provide the requested information.",
    instruction: [
      "Step 1",
      "Step 2",
      "Step 3",
      "..."
    ],
    inputs: [
      {
        name: "Device name",
        type: "text",
        required: true
      },
      {
        name: "Device type",
        type: "select",
        elements: ["TV", "Computer", "Smartphone", "Camera", "Custon device"],
        required: true
      }
    ]
  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: this.notification,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
}
