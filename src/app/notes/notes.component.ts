import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { INote } from '../models/INote.interface';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, AfterViewInit {

  public notes$: Observable<INote[]>;
  public text: string = ''; 
  
  constructor(private notesService: NotesService) {} 

  public ngOnInit(): void {
    this.notes$ = this.notesService.updateNotes$
    .pipe(
      switchMap(() => {
        return this.notesService.getNotes$();
      })
    );
  }

  public ngAfterViewInit(): void {
    this.notesService.updateNotes$.next();
  }

  public add(): void {
    if (this.text !== "") {
      this.notesService.add(this.text);
      this.text = "";
    }
  }

  public remove(note: INote): void { 
    this.notesService.remove(note);
  }

  public sendToTop(i: number): void {
    this.notesService.sendToTop(i);
  }
}


