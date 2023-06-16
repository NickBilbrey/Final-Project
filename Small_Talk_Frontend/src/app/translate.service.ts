import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Translation } from './translation';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private http: HttpClient) { }

  private url: string = 'https://api.cognitive.microsofttranslator.com'
  private key: string = '8175ed87c33343d884c749f498e164bd'
  private location: string = 'East US'



  
}
