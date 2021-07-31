import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { YoutubeResponse } from '../models/youtube.models';
import { map } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apikey = '***********************************';
  private playlist = '**********************************';
  private nextPageToken = '';

  constructor(private http:HttpClient) {}

  getVideos(){

    const url = `${ this.youtubeUrl }/playlistItems`;
    const params = new HttpParams()
      .set('part', 'snippet',)
      .set('maxResults', '10')
      .set('playlistId', this.playlist)
      .set('key', this.apikey)
      .set('pageToken', this.nextPageToken)

    return this.http.get<YoutubeResponse>(url, { params })
      .pipe(
        map(resp => {
          this.nextPageToken = resp.nextPageToken;   // Extraemos el nextPageToken de la resp
          return resp.items                          // Primer filtrado de la resp, items de tipo item[]
        }),
        map( items => {
          return items.map( video => video.snippet)  // 2º filtrado de item[], snippet de tipo video
        })
      )
  
  }
}
