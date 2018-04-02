import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ScrollEvent } from 'ngx-scroll-event';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

import { ChatService } from '../shared/chat.service';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-chat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(
          ':enter',
          stagger('300ms', [
            animate(
              '300ms ease-in',
              keyframes([
                style({ opacity: 0, transform: 'translateX(75%)', offset: 0 }),
                style({ opacity: 0.5, transform: 'translateX(-15px)', offset: 0.3 }),
                style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
              ])
            )
          ]),
          { optional: true }
        )
      ])
    ])
  ]
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('chatInput') chatInput: ElementRef;
  @ViewChild('wrapper') container: ElementRef;

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
      //TODO: waiting for add element to DOM
      setTimeout(() => {
        this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight - 360;
      }, 50);
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
