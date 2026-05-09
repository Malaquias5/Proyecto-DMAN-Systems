import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../../constants/api.constants';
import { ServiceItem, ServiceItemRequest } from '@core/models';

@Injectable({ providedIn: 'root' })
export class ServiceCatalogApiService {
	private readonly http = inject(HttpClient);

	findAllActive(): Observable<ServiceItem[]> {
		return this.http.get<ServiceItem[]>(API_ENDPOINTS.services.base);
	}

	findAll(): Observable<ServiceItem[]> {
		return this.http.get<ServiceItem[]>(API_ENDPOINTS.services.all);
	}

	findById(id: number): Observable<ServiceItem> {
		return this.http.get<ServiceItem>(API_ENDPOINTS.services.byId(id));
	}

	create(request: ServiceItemRequest): Observable<ServiceItem> {
		return this.http.post<ServiceItem>(API_ENDPOINTS.services.base, request);
	}

	update(id: number, request: ServiceItemRequest): Observable<ServiceItem> {
		return this.http.put<ServiceItem>(API_ENDPOINTS.services.byId(id), request);
	}

	delete(id: number): Observable<void> {
		return this.http.delete<void>(API_ENDPOINTS.services.byId(id));
	}

	// Compatibilidad con llamadas existentes
	getAllActive(): Observable<ServiceItem[]> {
		return this.findAllActive();
	}

	getAll(): Observable<ServiceItem[]> {
		return this.findAll();
	}

	getById(id: number): Observable<ServiceItem> {
		return this.findById(id);
	}
}
