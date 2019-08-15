import { ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

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

  public isChanged: boolean;

  constructor(
    private readonly todoService: TodoService,
    private readonly route: ActivatedRoute,
    public confirmationService: ConfirmationService,
    private readonly cdr: ChangeDetectorRef
    ) {
    this.id = this.route.snapshot.params.id;
    this.list = new TodoList('New Todo List', ['todo 1', 'todo 2', 'todo 3'], String(new Date().getTime()));
   }

  ngOnInit() {
    this.todoService.updateList(this.id, this.list);
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
      if (list) {
        this.isChanged = this.list.changed <= list.changed;
        this.list = list;
      }
  });
  }

  public addTodo(event: Event): void {
    event.preventDefault();
    this.list.todos.push('');
  }



public save(): void {
  if (this.isChanged) {
    this.confirmSave();
  } else {
    this.list.changed = String(new Date().getTime());
    this.todoService.updateList(this.id, this.list);
  }

}

public confirmSave() {
  this.confirmationService.confirm({
      message: 'There were changes made to this list in another session. Whould you like to save it anyway?',
      acceptLabel: 'Yes, overwrite previous changes',
      rejectLabel: 'No, get the current value from the server',
      accept: () => {
        this.list.changed = String(new Date().getTime());
        this.todoService.updateList(this.id, this.list);
      },
      reject: () => {
        this.getList();
      }
  });
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
