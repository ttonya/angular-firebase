import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';

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
  public todos$: AngularFireList<TodoList[]>;

  constructor(private readonly todoService: TodoService) { }

  /**
   * Current Todo List
   */
  public list: TodoList;

  ngOnInit() {
    // this.todoService.readList('1').subscribe((list) => {
    //   this.list = list;
    //   console.log(this.list);
    // });
    this.getLists();
  }

  /**
   * Get all lists from the database
   */
  public getLists(): void {
    this.todos$ = this.todoService.getAllLists();
    console.log(this.todos$);
  }
}
