import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  interactionSubject;

  constructor(private socket: Socket,
              private snackBar: MatSnackBar) {

      this.interactionSubject = new Subject<any>();

      socket.on('message', (data) => {
        this.showSnackBar(data);
        console.log(data);
      });

      socket.on('interaction', (interaction) => {
         console.log(interaction);
         this.interactionSubject.next(interaction);
      });
    }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 2000,
    });
  }

  getInteraction() {
    return this.interactionSubject;
  }

  reply(data) {
    this.socket.emit('reply', data);
  }
}
