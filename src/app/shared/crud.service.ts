import { Injectable } from '@angular/core';
import { Todo } from './todo';  // todo data type interface class
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CrudService {
  todosRef: AngularFireList<any>;    // Reference to todo data list, its an Observable
  todoRef: AngularFireObject<any>;   // Reference to todo object, its an Observable too
  user: Observable<firebase.User>;
  items: AngularFireList<any[]>;
  msgVal: string = '';

  // Inject AngularFireDatabase Dependency in Constructor
  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.user = this.afAuth.authState;
   }

   login() {
    this.afAuth.auth.signInAnonymously();
}

logout() {
    this.afAuth.auth.signOut();
}

Send(desc: string) {
    this.items.push({ message: desc});
    this.msgVal = '';
}

  // Create todo
  Addtodo(todo: Todo) {
    this.todosRef.push({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      editing: todo.editing
    })
  }

  // Fetch Single todo Object
  Gettodo(id: string) {
    this.todoRef = this.db.object('todos-list/' + id);
    return this.todoRef;
  }

  // Fetch todos List
  GettodosList() {
    this.todosRef = this.db.list('todos-list');
    return this.todosRef;
  } 

  // Update todo Object
  Updatetodo(todo: Todo) {
    this.todoRef.update({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      editing: todo.editing
    })
  }  

  // Delete todo Object
  Deletetodo(id: string) { 
    this.todoRef = this.db.object('todos-list/'+id);
    this.todoRef.remove();
  }
}