import { Component, OnInit } from '@angular/core';
import { AngularFireObject } from '@angular/fire/database';

import { TodoService } from '../../services/todo.service';
import { TodoList } from '../../models/todo-list';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  /**
   * Todo Lists
   */
  public lists$: any;

  public list$: AngularFireObject<TodoList>;

  constructor(private readonly todoService: TodoService) { }

  /**
   * Current Todo List
   */
  public list: TodoList;

  ngOnInit() {
    this.getLists();
    this.getList('first');
  }

  /**
   * Get all lists from the database
   */
  public getLists(): void {
   this.todoService.getAllLists().subscribe((lists) => {
      this.lists$ = lists;
    });
  }

  public getList(listId: string) {
    this.list$ = this.todoService.readList(listId).subscribe((list) => {
      this.list$ = list;
    });
  }
}
