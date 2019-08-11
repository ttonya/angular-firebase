import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { TodoList } from '../models/todo-list';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    public db: AngularFireDatabase) { }

  /**
   * Get all lists
   */
  getAllLists(): AngularFireList<TodoList[]> {
    return this.db.list('/list');
  }

  /**
   * Create TODO List
   * @param list Model
   */
  createList(list: TodoList) {
    return this.db.list('list');
  }

  /**
   * Read TODO List
   * @param id List id
   */
  readList(id: string): any {
    
  }

  /**
   * Update TODO List
   * @param list Model
   */
  updateList(list: TodoList) {
    return this.db.list('list').set(list);
  }
}
