import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../../constants/api.constants';
import { Client, ClientRequest } from '@core/models';

@Injectable({ providedIn: 'root' })
export class ClientApiService {
	private readonly http = inject(HttpClient);

	create(request: ClientRequest): Observable<Client> {
		return this.http.post<Client>(API_ENDPOINTS.clients.base, request);
	}

	findAll(): Observable<Client[]> {
		return this.http.get<Client[]>(API_ENDPOINTS.clients.base);
	}

	findById(id: number): Observable<Client> {
		return this.http.get<Client>(API_ENDPOINTS.clients.byId(id));
	}

	// Compatibilidad con llamadas existentes
	getAll(): Observable<Client[]> {
		return this.findAll();
	}

	getById(id: number): Observable<Client> {
		return this.findById(id);
	}

	delete(id: number): Observable<void> {
		return this.http.delete<void>(API_ENDPOINTS.clients.byId(id));
	}
}
