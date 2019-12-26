import { Component } from '@angular/core';
import { style, state, trigger, transition, animate} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slideInDown', [
      state('void', style({transform: 'translateY(-1000px)', opacity: 0})),
      state('inDom', style({transform: 'translateY(0px)', opacity: 1})),
      transition('void => *', [
        animate('500ms ease-in')
      ])

    ])
  ]
})
export class AppComponent {
  name:string = 'Cameron';
}
