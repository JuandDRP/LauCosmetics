import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

export interface RequestOptions {
    headers?: Record<string, string>;
    queryParams?: Record<string, unknown>;
}

@Injectable({
    providedIn: 'root'
})
export class ApiClientService {
    private readonly BASE_URL = environment.apiUrl;

    constructor(private http: HttpClient) {}

    get<T>(path: string, options?: RequestOptions): Observable<T> {
        return this.http.get<T>(`${this.BASE_URL}/${path}`, this.buildOptions(options));
    }

    post<T, B>(path: string, body: B, options?: RequestOptions): Observable<T> {
        return this.http.post<T>(`${this.BASE_URL}/${path}`, body, this.buildOptions(options));
    }

    put<T, B>(path: string, body: B, options?: RequestOptions): Observable<T> {
        return this.http.put<T>(`${this.BASE_URL}/${path}`, body, this.buildOptions(options));
    }

    delete<T>(path: string, options?: RequestOptions): Observable<T> {
        return this.http.delete<T>(`${this.BASE_URL}/${path}`, this.buildOptions(options));
    }

    private buildOptions(options?: RequestOptions) {
        return {
            headers: this.buildHeaders(options?.headers),
            params: this.buildQueryParams(options?.queryParams)
        }
    }

    private buildQueryParams(queryParams?: Record<string, unknown>): HttpParams {
        let params = new HttpParams();

        if(queryParams) {
            Object.entries(queryParams).forEach(([key, value]) => {
                if(Array.isArray(value)){
                    value.forEach(v => {
                        params = params.append(key, String(v));
                    })
                }
                else {
                    params = params.set(key, String(value));
                }
            });
        }

        return params;
    }

    private buildHeaders(headers?: Record<string, string>): HttpHeaders {
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
        })

        if(headers) {
            Object.entries(headers).forEach(([key, value]) => {
                httpHeaders = httpHeaders.set(key, value);
            });
        }

        return httpHeaders;
    }
}