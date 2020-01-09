import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter(); 
  @Output() completedToggled : EventEmitter<Todo> = new EventEmitter();
  
  setClasses(){
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    }

    return classes
  }
  onToggle(todo) {
    todo.completed = !todo.completed;
    this.completedToggled.emit(todo);
  }
  onDelete(todo){
    this.deleteTodo.emit(todo);
  }
  constructor() { }

  ngOnInit() {
  }

}
