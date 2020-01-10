import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  title:string;
  constructor() { }
  @Output() addTodoEvent: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  onSubmit(){
    const todo = {
      title: this.title,
      completed: false
    }
    this.addTodoEvent.emit(todo);
  }

}
