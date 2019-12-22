import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import {Todo} from '../../models/Todo'
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  animations: [
    trigger('fade', [      
      transition('void => *', [
        style({opacity: 0}),
        animate(1000, style({opacity: 1}))
      ]),
      transition('* => void', [
        animate(1000, style({opacity: 0}))
      ])

    ])
    
]
})
export class TodosComponent implements OnInit {
  todos:Todo[];
  constructor(private todoService:TodoService) {
   }

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos=> { this.todos = todos});
  }
  deleteTodo(todo:Todo){
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.todoService.deleteTodo(todo).subscribe();
  }
  addTodo(todo:Todo){
    this.todoService.addTodo(todo).subscribe(todo=>{
      this.todos.push(todo);

    })
  }
}
