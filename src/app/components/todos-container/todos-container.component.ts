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
    this.todosService.getTodoList().subscribe((todos: Todo[])=> { this.todoList = this.sortTodoListByCompletion(todos)});
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
  private sortTodoByCompletion(todo:Todo){
    this.deleteTodoFromList(todo);
    let indexOfTodoInsert:number = this.todoList.findIndex(todo => todo.completed === true);
    setTimeout(()=>{
      this.addTodoToList(todo, indexOfTodoInsert);
    }, 200);
  }
  private addTodoToList(todo:Todo, indexOfInsert?:number){
    this.todoList.splice((indexOfInsert == undefined ? 0 : indexOfInsert),0,todo);
  }
  private addTodoToDb(todo:Todo){
    this.todosService.addTodoItem(todo).subscribe()
  }
  private deleteTodoFromList(todo: Todo){
    this.todoList.splice(this.todoList.indexOf(todo), 1);
  }
  private deleteTodoFromDb(todo:Todo){
    this.todosService.deleteTodoItem(todo).subscribe();
  }
  private updateCompletedInDb(todo: Todo){
    this.todosService.todoItemCompletedToggled(todo).subscribe();
  }
  deleteTodo(todo:Todo){
    this.deleteTodoFromList(todo);
    this.deleteTodoFromDb(todo);
  }
  addTodo(todo:Todo){
    this.addTodoToDb(todo);
    this.addTodoToList(todo);
  }
  completedToggled(todo:Todo){
    this.updateCompletedInDb(todo);
    this.sortTodoByCompletion(todo);
  }
}
