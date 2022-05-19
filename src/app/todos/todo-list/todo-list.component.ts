import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { TodoActions } from 'src/app/state/todos/actions';
import { Todo } from '../todo.model';

@Component({
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];
  newTodo: string = "";

  todoForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store<AppState>
  ) {
    this.todoForm = this.fb.group({
      title: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    });
  }

  ngOnInit(): void {
    // Subscribe to the stream of Todos
    this.store.select('todos')
      .subscribe({
        next: (state) => {
          this.todos = state.items.slice();
        },
      });

    // Dispatch a request to fetch a list of Todos
    this.store.dispatch(TodoActions.fetchTodos());
  }

  addTodo() {
    const title = this.todoForm.controls['title'].value;
    if(!title) {
      alert('Please specifiy a title for the new todo!');
      return;
    }

    console.log("[TodoList Form] About to store the value:", title, " as title...");

    this.store.dispatch(TodoActions.addTodo({ title: title }));
  }

  toggle(id: string) {
    this.store.dispatch(TodoActions.toggleTodoCompletion({ id: id }));
  }

  updateTodo(id: string) {
    const todo = this.todos.find(e => e.id === id);
    if(!todo) {
      throw Error('Invalid Operation!');
    }

    const result = prompt('Updated Title: ', todo.title) ?? todo.title;
    this.store.dispatch(TodoActions.updateTodo({ id: id, title: result }));
  }

  deleteTodo(id: string) {
    const result = confirm('Are you sure you want to delete?');
    if(!result) {
      return;
    }
    this.store.dispatch(TodoActions.deleteTodo({ id }));
  }

}
