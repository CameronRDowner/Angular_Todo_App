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
        animate(200, style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate(200, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class TodosContainerComponent implements OnInit {
  todoList:Todo[];
  constructor(private todosService:TodosService) {
   }

  ngOnInit() {
    this.todosService.getTodos().subscribe((todos: Todo[])=> { this.todoList = this.sortTodoListByCompletion(todos)});
  }
  private sortTodoListByCompletion(unsortedTodos:Todo[]){
    return unsortedTodos.sort((a, b) => {
      if (a.completed === b.completed) {
         return 0;
      }
   
      if (a.completed) {
         return 1;
      }
   
      if (b.completed) {
         return -1;
      }
   });
  }
  sortTodoByCompletion(todo:Todo){
    this.deleteTodoFromList(todo);
    let indexOfTodoInsert:number = this.todoList.findIndex(todo => todo.completed === true);
    setTimeout(()=>{
      this.addTodoToList(todo, indexOfTodoInsert);
    }, 200);
  }
  private addTodoToList(todo:Todo, indexOfInsert?:number){
    this.todoList.splice((indexOfInsert == undefined ? 0 : indexOfInsert),0,todo);
  }
  private deleteTodoFromList(todo: Todo){
    this.todoList.splice(this.todoList.indexOf(todo), 1);
  }
  deleteTodo(todo:Todo){
    this.deleteTodoFromList(todo);
    this.todosService.deleteTodo(todo).subscribe();
  }
  addTodo(todo:Todo){
    this.todosService.addTodo(todo).subscribe(todo=>{
    this.addTodoToList(todo);

    })
  }
}
