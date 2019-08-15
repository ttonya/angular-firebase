import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { TodoComponent } from './components/todo/todo.component';
import { environment } from '../../../environments/environment';
import { TodoRoutingModule } from './todo-routing.module';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [TodoComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    FormsModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [ConfirmationService],
  exports: [TodoComponent]
})
export class TodoModule { }
