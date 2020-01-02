import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import {Todo} from '../../models/Todo'
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-todos-container',
  templateUrl: './todos-container.component.html',
  styleUrls: ['./todos-container.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class TodosContainerComponent implements OnInit {
  todos:Todo[];
  constructor(private todosService:TodosService) {
   }

  ngOnInit() {
    this.todosService.getTodos().subscribe(todos=> { this.todos = todos});
  }
  deleteTodo(todo:Todo){
      this.todos.splice(this.todos.indexOf(todo), 1);
    this.todosService.deleteTodo(todo).subscribe();
  }
  addTodo(todo:Todo){
    this.todosService.addTodo(todo).subscribe(todo=>{
      this.todos.push(todo);

    })
  }
}
