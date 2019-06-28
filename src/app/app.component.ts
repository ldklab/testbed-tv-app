import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public now: Date = new Date();

    notification = {
    _id: '6wdfq3w4f65q4256wrf4q',
    title: 'Danger',
    description: 'A new urecognizable device was plugged to the network. In order to better secure the network please perform the following actions and provide the requested information.',
    instruction: [
      'Step 1',
      'Step 2',
      'Step 3',
      '...'
    ],
    inputs: [
      {
        title: 'Device name',
        name: 'device_name',
        type: 'text',
        required: true
      },
      {
        title: 'Check',
        name: 'device_check',
        type: 'checkbox',
        required: true
      },
      {
        title: 'Device type',
        name: 'device_type',
        type: 'select',
        elements: [
          {text: 'TV', value: 'tv'},
          {text: 'Computer', value: 'computer'},
          {text: 'Smartphone', value: 'smartphone'},
          {text: 'Camera', value: 'camera'},
          {text: 'Custom device', value: 'custom_device'}
        ],
        required: true
      }
    ]
  };
/*
  notification = {
    title: "Warning",
    description: "Unusual traffic goint to <device_name> was detected and blocked.",
    specific: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non orci diam. Nam sollicitudin justo eu laoreet sodales. Fusce ut sollicitudin ligula. Vivamus sed pretium arcu. Nullam dignissim turpis risus, in lacinia ligula ultricies a. Cras eleifend nisl eu porttitor fringilla. Duis sed leo nec tortor malesuada dictum. Vivamus at orci eget tortor porta faucibus. Duis ex ligula, commodo sed metus quis, pharetra tincidunt metus. Sed non ornare odio, at porta ex."
  }*/

  constructor(public dialog: MatDialog,
              public socketService: SocketService) {}

  ngOnInit() {
      setInterval(() => {
        this.now = new Date();
      }, 1);

      this.socketService.getInteraction()
      .subscribe(interaction => {
        // console.log(interaction);
        this.openDialog(interaction);
      });
  }

  openDialog(interaction) {

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: interaction ? interaction : this.notification,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ', result.inputs);
      const data = {
        _id: result._id,
        inputs: result.inputs.map(i => {
          return {name: i.name, value: i.value};
        })
      };
      this.socketService.reply(data);
    });
  }

  openSnackBar() {
    this.socketService.showSnackBar('Test');
  }
}
