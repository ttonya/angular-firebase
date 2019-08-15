import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { TodoList } from '../models/todo-list';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    public db: AngularFireDatabase,
    private afs: AngularFirestore) { }

  /**
   * Get all lists
   */
  public getAllLists(): any {
    return this.db.list('lists').valueChanges();
  }

  /**
   * Create TODO List
   * @param list Model
   */
  public updateList(id: string, list: TodoList) {
    return this.db.list('lists').set(id, list);
  }

  /**
   * Read TODO List
   * @param id List id
   */
  public readList(id: string): any {
   return this.db.object(`/lists/${id}`).valueChanges();
  }

  /**
   * Read TODO List
   * @param id List id
   */
  public getList(id: string): any {
   return this.afs.collection(`/lists/${id}`).valueChanges().pipe(take(1));
   }
}
