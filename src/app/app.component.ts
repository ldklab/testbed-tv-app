import { Component } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public now: Date = new Date();

  constructor(public dialog: MatDialog,
    public socketService:SocketService) {
      setInterval(() => {
        this.now = new Date();
      }, 1);
  }

  notification = {
    title: "Danger",
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
/*
  notification = {
    title: "Warning",
    description: "Unusual traffic goint to <device_name> was detected and blocked.",
    specific: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non orci diam. Nam sollicitudin justo eu laoreet sodales. Fusce ut sollicitudin ligula. Vivamus sed pretium arcu. Nullam dignissim turpis risus, in lacinia ligula ultricies a. Cras eleifend nisl eu porttitor fringilla. Duis sed leo nec tortor malesuada dictum. Vivamus at orci eget tortor porta faucibus. Duis ex ligula, commodo sed metus quis, pharetra tincidunt metus. Sed non ornare odio, at porta ex."
  }*/

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

  openSnackBar(){
    this.socketService.showSnackBar("Test");
  }
}
