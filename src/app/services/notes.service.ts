import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, take } from 'rxjs';
import { INote } from '../models/INote.interface';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private notesUrl = '/api/notes';
  private sendToTopUrl = '/api/notes/send-to-top';
  public updateNotes$ = new Subject<void>();


  constructor(private http: HttpClient) { }

  public getNotes$(): Observable<INote[]> { 
    return this.http.get<INote[]>(this.notesUrl); 
  }

  public add(text: string): void {
    this.http.post<INote[]>(this.notesUrl, {
      text: text,
    })
      .pipe(take(1))
      .subscribe(() => {
        this.updateNotes$.next();
      });
  }

  public remove(note: INote): void {
    this.http.delete(this.notesUrl, {
      body: note,
    })
      .pipe(take(1))
      .subscribe(() => {
        this.updateNotes$.next();
      });
  }

  public sendToTop(idx: number): void {
    this.http.post(this.sendToTopUrl, {idx})
      .pipe(take(1))
      .subscribe(() => {
        this.updateNotes$.next();
      });
  }
}


