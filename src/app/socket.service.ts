import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket,
    private _snackBar: MatSnackBar) {
      socket.on("message", (data) => {
        this.showSnackBar(data);
        console.log(data);
      })
     }

  showSnackBar(message:string){
    this._snackBar.open(message, "Ok", {
      duration: 2000,
    });
  }
}
