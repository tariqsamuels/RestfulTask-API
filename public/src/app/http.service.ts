import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) { 
  }
  getTasks() {
    return this._http.get('/tasks');
  }

  createTask(newTask){
    console.log("In the service create a new task.")
    return this._http.post('/tasks', newTask)
  }

  getOneTask(id: String){
   return this._http.get(`/tasks/${id}`);
  }


  editTask(id: String, upTask){
    console.log("This should be updating my task.")
    return this._http.put(`/tasks/${id}`, upTask);
  }
  deleteTask(id){
    return this._http.delete(`/tasks/${id}`);
  }
}

