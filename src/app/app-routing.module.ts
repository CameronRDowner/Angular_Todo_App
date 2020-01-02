import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosContainerComponent } from './components/todos-container/todos-container.component';
import { AboutComponent } from './components/pages/about/about.component';

const routes: Routes = [
  {path: '', component: TodosContainerComponent},
  {path: 'about', component: AboutComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
