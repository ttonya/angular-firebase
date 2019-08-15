import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/operators';

import { TodoList } from '../models/todo-list';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to manage Todo lists
 */
export class TodoService {

  constructor(
    public db: AngularFireDatabase) { }

  /**
   * Create and update TODO List
   * @param list Model
   */
  public updateList(id: string, list: TodoList) {
    return this.db.list('lists').set(id, list);
  }

  /**
   * Get changing value of TODO List
   * @param id List id
   */
  public readList(id: string): any {
   return this.db.object(`/lists/${id}`).valueChanges();
  }

  /**
   * Read TODO List once
   * @param id List id
   */
  public getList(id: string): any {
   return this.db.object(`/lists/${id}`).valueChanges().pipe(take(1));
   }
}
