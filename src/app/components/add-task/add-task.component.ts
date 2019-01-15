import { Component, OnInit } from '@angular/core';
import { Todo } from '../../shared/todo'
import { trigger, style, animate, transition } from '@angular/animations';
import { CrudService } from '../../shared/crud.service';
import { NotifierService } from 'angular-notifier';
import { AngularFireDatabaseModule, AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  animations: [
    trigger('fade',[
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(30px)'}),
        animate(400, style ({opacity:1, transform:
           'translateY(0px)'}))
      ]),

      transition(':leave', [
        animate(1000, style ({opacity:0, transform:
          'translateY(30px)'}))
      ]),
      
    ])

  ]
})
export class AddTaskComponent implements OnInit {
  todos: Todo[];
  todoTitle: string;
  idForTodo: number;
  beforeEditCache: string;
  filter: string;
  private readonly notifier: NotifierService;
  private readonly crudService: CrudService;

  constructor(private crudServiceInject: CrudService, notifierService: NotifierService) { 
    this.notifier = notifierService;
    this.crudService = crudServiceInject;
  }

  ngOnInit() {
    this.idForTodo = 4;
    this.todoTitle = '';
    this.beforeEditCache = '';
    this.filter = 'all';

    //lifecycle hook that gets called when component is initialized
    this.todos = [
      {
        'id': 1,
        'title': 'Finish ANgula',
        'completed': false,
        'editing': false,
      },
      {
        'id': 2,
        'title': 'Take over world',
        'completed': false,
        'editing': false,
      },
      {
        'id': 3,
        'title': 'One more thing',
        'completed': false,
        'editing': false,
      }
    ];
  }

  
  addTodoToDatabase() {
    this.notifier.notify( 'success', 'You are awesome! I mean it!' );
    this.crudService.Addtodo(this.todos[1]);
  }

  addTodo() {
    if (this.todoTitle.trim().length == 0) {
      return;
    }
    this.todos.push({
      id: this.idForTodo,
      title: this.todoTitle,
      completed: false,
      editing: false
    })

    this.todoTitle = '';
    this.idForTodo++;
  }

  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }

  doneEdit(todo: Todo): void {
    if (todo.title.trim().length == 0) {
      todo.title = this.beforeEditCache;
    }
    todo.editing = false;
  }


  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }

  deleteTodo(id): void {
    this.todos = this.todos.filter(todo => todo.id != id);
  }

  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  atleastOneCompleted(): boolean {
    return this.todos.filter(todo => todo.completed).length > 0;
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed)
  }

  checkAllTodos(): void {
    this.todos.forEach(todo => todo.completed = (<HTMLInputElement>event.target).checked)
  }

  todosFiltered(): Todo[] {
    if (this.filter == 'all') {
      return this.todos;
    } else if (this.filter == 'active') {
      return this.todos.filter(todo => !todo.completed)
    } else if (this.filter =='completed') {
      return this.todos.filter (todo => todo.completed)
    }

    return this.todos;
  }
}

