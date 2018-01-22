import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Client} from '../models/client';
import {catchError, tap} from 'rxjs/operators';
import { Constants } from '../Constants';

import { HandleErrorService} from './handle-error.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ClientsService {

  private clientsUrl = Constants.API_URL + 'clients';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private handleErrorService: HandleErrorService,
    ) { }

  /** GET clients from the server */
  getClients (): Observable<Client[]> {
    return this.http.get<Client[]>(this.clientsUrl)
      .pipe(
        tap(clients => this.handleErrorService.log(`ClientService: fetched clients`)),
        catchError(this.handleErrorService.handleError('getClients', []))
      );
  }


}