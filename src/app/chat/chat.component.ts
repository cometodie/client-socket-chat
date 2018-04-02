import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { ChatService } from '../shared/chat.service';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-chat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('chatInput') chatInput: ElementRef;

  public messages = [];
  public connectionMessage;
  public connectionAllMessage;
  public message;
  public user;

  constructor(private chatService: ChatService, private loginService: LoginService, private ref: ChangeDetectorRef) {
    this.user = this.loginService.getUser;
  }

  ngOnInit() {
    this.connectionMessage = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
      this.ref.markForCheck();
    });
    this.connectionAllMessage = this.chatService.getAllMessages().subscribe((messages: any) => {
      this.messages = messages;
      this.ref.markForCheck();
    });
  }

  ngOnDestroy() {
    this.connectionMessage.unsubscribe();
  }

  sendMessage() {
    this.chatService.sendMessage({ userId: this.user._id, message: this.message });
    this.message = '';
  }

  @HostListener('click')
  public autofocusInput() {
    this.chatInput.nativeElement.focus();
  }
}
