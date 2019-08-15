import { Component, OnInit, Input } from '@angular/core';
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

/**
 * Todo List view and edit component
 */
export class TodoComponent implements OnInit {
  /**
   * List id
   */
  @Input() public id: string;

  /**
   * Form for editing and saving list
   */
  public form: FormGroup;

  /**
   * Current Todo List
   */
  public list: TodoList;

  /**
   * Timestamp for detecting whether a
   * list has changed since uploading data
   */
  public startedChanging: number;

  /**
   * Check if a list has chnaged
   */
  public isChanged: boolean;

  /**
   * Is it new list
   * or list already exists
   */
  public isNew: boolean;

  constructor(
    private readonly todoService: TodoService,
    private readonly route: ActivatedRoute,
    public confirmationService: ConfirmationService
    ) {
    this.list = new TodoList('New Todo List', ['todo 1', 'todo 2', 'todo 3'], new Date().getTime());
    this.id = this.route.snapshot.params.id;
    this.todoService.readList(this.id).subscribe((list) => {
      this.isNew = !list;
      if (this.isNew) {
        this.todoService.updateList(this.id, this.list);
      }
      if (list) {
        this.isChanged = this.startedChanging ? this.startedChanging <= list.changed : false;
      }
    });

   }

  public ngOnInit(): void {
    this.readList();
  }

  /**
   * Adds an additional blank todo field
   * @param event Event
   */
  public addTodo(event: Event): void {
    event.preventDefault();
    this.list.todos.push('');
  }

  /**
   * Reading value once
   */
  public readList(): void {
    this.startedChanging = new Date().getTime();
    this.todoService.getList(this.id).subscribe((list) => {
      if (list) {
        this.list = list;
      }
    });
  }

  /**
   * Saving Todo List
   */
  public save(): void {
    if (this.isChanged) {
      this.confirmSave();
    } else {
      this.list.changed = new Date().getTime();
      this.todoService.updateList(this.id, this.list);
      this.readList();
    }
  }

  /**
   * Confirmation dialog settings
   * Fires when a list is being changed in another session
   */
  public confirmSave() {
    this.confirmationService.confirm({
        message: 'There were changes made to this list in another session. Whould you like to save it anyway?',
        acceptLabel: 'Yes, overwrite previous changes',
        rejectLabel: 'No, get the current value from the server',
        accept: () => {
          this.list.changed = new Date().getTime();
          this.todoService.updateList(this.id, this.list);
          this.startedChanging = new Date().getTime();
        },
        reject: () => {
          this.readList();
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
