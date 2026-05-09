import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../../constants/api.constants';
import { ContactMessage, ContactMessageRequest, ContactStats } from '@core/models';
import { MessageStatus } from '@core/enums';

@Injectable({ providedIn: 'root' })
export class ContactApiService {
  private readonly http = inject(HttpClient);

  send(request: ContactMessageRequest): Observable<ContactMessage> {
    return this.http.post<ContactMessage>(API_ENDPOINTS.contact.base, request);
  }

  findAll(): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>(API_ENDPOINTS.contact.base);
  }

  findByStatus(estado: MessageStatus): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>(API_ENDPOINTS.contact.byStatus(estado));
  }

  updateStatus(id: number, estado: MessageStatus): Observable<ContactMessage> {
    return this.http.patch<ContactMessage>(API_ENDPOINTS.contact.updateStatus(id), { estado });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(API_ENDPOINTS.contact.byId(id));
  }

  getStats(): Observable<ContactStats> {
    return this.http.get<ContactStats>(API_ENDPOINTS.contact.stats);
  }

  // Compatibilidad con llamadas existentes
  sendMessage(request: ContactMessageRequest): Observable<ContactMessage> {
    return this.send(request);
  }
}
