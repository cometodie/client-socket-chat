import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Message } from './data-structures';

@Injectable()
export class ChatService {
  private url = 'http://localhost:5000';
  private socket;

  public sendMessage(message) {
    console.log('we send message to the server: ', message);
    this.socket.emit('add-message', message);
  }

  public getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (message: Message) => {
        console.log('we get message from the server: ', message);
        observer.next(message);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  public getAllMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('all-messages', messages => {
        console.log('we get all messages from the server: ', messages);
        observer.next(messages);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }
}
