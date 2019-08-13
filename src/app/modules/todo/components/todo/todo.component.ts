import { ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import { AngularFireObject } from '@angular/fire/database';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { TodoService } from '../../services/todo.service';
import { TodoList } from '../../models/todo-list';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input() public id: string;

  public form: FormGroup;
  /**
   * Todo Lists
   */
  public lists$: any;

  /**
   * Current Todo List
   */
  public list: TodoList;

  public startedChanging: Date;

  constructor(
    private readonly todoService: TodoService,
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef
    ) {
    this.id = this.route.snapshot.params.id;
   }

  ngOnInit() {
    this.startedChanging = new Date();
    this.list = new TodoList('', [], this.startedChanging);
    this.getList();
  }

  /**
   * Get all lists from the database
   */
  public getLists(): void {
   this.todoService.getAllLists().subscribe((lists) => {
      this.lists$ = lists;
    });
  }

  public getList() {
    this.todoService.readList(this.id).subscribe((list) => {
      this.list = list ? list : new TodoList('', [], this.startedChanging);
      // this.cdr.detectChanges();
  });
  }

  public addTodo(): void {
    this.list.todos.push('');
  }



public save(): void {
 if (this.list.changed < this.startedChanging ) {
  this.list.changed = new Date();
  this.todoService.updateList(this.id, this.list);
  console.log('success');
 } else {
   console.log('error');
 }

}

/**
 * Fixes focus loosing issue
 * whith ngModel Binding
 * @param index Index
 */
  public track(index: number): number {
    return index;
  }
}
