import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import {Todo} from '../../models/Todo'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos:Todo[];
  constructor(private todoService:TodoService) {
   }

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos=> { this.todos = todos});
  }

}
