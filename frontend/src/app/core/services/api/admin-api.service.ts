import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../../constants/api.constants';
import { MessageStatus } from '@core/enums';
import { Client, ContactMessage, DashboardStats } from '@core/models';

@Injectable({ providedIn: 'root' })
export class AdminApiService {
	private readonly http = inject(HttpClient);

	getDashboard(): Observable<DashboardStats> {
		return this.http.get<DashboardStats>(API_ENDPOINTS.admin.dashboard);
	}

	getClients(): Observable<Client[]> {
		return this.http.get<Client[]>(API_ENDPOINTS.admin.clients);
	}

	getClientById(id: number): Observable<Client> {
		return this.http.get<Client>(API_ENDPOINTS.admin.clientById(id));
	}

	deleteClient(id: number): Observable<void> {
		return this.http.delete<void>(API_ENDPOINTS.admin.clientById(id));
	}

	getMessages(): Observable<ContactMessage[]> {
		return this.http.get<ContactMessage[]>(API_ENDPOINTS.admin.messages);
	}

	getMessageById(id: number): Observable<ContactMessage> {
		return this.http.get<ContactMessage>(API_ENDPOINTS.admin.messageById(id));
	}

	getMessagesByStatus(estado: MessageStatus): Observable<ContactMessage[]> {
		return this.http.get<ContactMessage[]>(API_ENDPOINTS.admin.messagesByStatus(estado));
	}

	updateMessageStatus(id: number, estado: MessageStatus): Observable<ContactMessage> {
		return this.http.patch<ContactMessage>(API_ENDPOINTS.admin.updateMessageStatus(id), { estado });
	}

	deleteMessage(id: number): Observable<void> {
		return this.http.delete<void>(API_ENDPOINTS.admin.messageById(id));
	}
}
