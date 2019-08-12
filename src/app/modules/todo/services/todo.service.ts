import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { TodoList } from '../models/todo-list';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
  public createList(list: TodoList) {
    return this.db.list('lists').push(list);
  }

  /**
   * Read TODO List
   * @param id List id
   */
  public readList(id: string): any {
   return this.db.object(`/lists/${id}`).valueChanges();
  }

  /**
   * Update TODO List
   * @param id List id
   */
  public updateList(id: string, key: string, value: string) {
    return this.db.list(`/list/${id}`).update(key, value);
  }
}
