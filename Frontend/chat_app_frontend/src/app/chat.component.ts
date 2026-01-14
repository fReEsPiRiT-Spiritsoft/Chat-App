import { Component, OnInit, signal } from '@angular/core';
import { ChatService } from './chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chats = signal<any[]>([]);
  name = signal('');
  message = signal('');

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.loadChats();
  }

  loadChats() {
    this.chatService.getChats().subscribe(data => this.chats.set(data));
  }

  sendChat() {
    if (this.name() && this.message()) {
      this.chatService.sendChat(this.name(), this.message()).subscribe(() => {
        this.message.set('');
        this.loadChats();
      });
    }
  }
}