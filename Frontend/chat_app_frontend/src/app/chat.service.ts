import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private apiUrl = 'http://localhost:8000/api/chat/';

  constructor(private http: HttpClient) {}

  getChats(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  sendChat(name: string, message: string): Observable<any> {
    return this.http.post(this.apiUrl, { name, message });
  }
}