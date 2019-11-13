import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  newTask: any;
  tasks: [];
  task: any;
  onCreateErrors: any;
  onUpdateErrors: any;
  toUpdateTask: boolean = false;
  editTask: any;
  parentShowTask: any;
  oneTask;
  constructor(private _httpService: HttpService) {}
  ngOnInit(){
    this.getTasksFromService();
    this.newTask = { title: "", description: ""}
  }

  getTasksFromService(){
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log("Got our tasks!", data)
      this.tasks = data['allTasks'];
      console.log(`Click event is working all tasks being fetched: ${this.tasks}`);
    });
  }

  onSubmit(){
    console.log("in Angular onSubmit")
    this._httpService.createTask(this.newTask).subscribe(data => {
      console.log(data);
      if(data['status']) {
        //successfully added a new task
        this.onCreateErrors = undefined;
        this.ngOnInit();
      } else {
        // display the error messages
        this.onCreateErrors = data["errors"];
      }
    })
    this.newTask = { title: "", description: "" }
  }

  editTaskForm (id: string) {
    this.toUpdateTask = true;
    console.log(`selected task id is ${id}`);
    this._httpService.getOneTask(id).subscribe(responseFromHTTPService => {
      console.log(responseFromHTTPService);
      this.editTask = responseFromHTTPService["oneTask"];
    })
  }

  updateTask(id){
    console.log(id)
    this._httpService.editTask(id, this.editTask).subscribe(responseFromService => {
      console.log(responseFromService);
      if(responseFromService['status']) {
        this.getTasksFromService();
        this.onUpdateErrors = undefined;
        this.toUpdateTask = false;
      } else {
        //display the error message
        this.onUpdateErrors = responseFromService["errors"];
      }
      this.getTasksFromService();
    })
  }

  deleteTask(id: String) {
    this._httpService.deleteTask(id).subscribe(responseFromService => {
      console.log(responseFromService);
      if(responseFromService['status']) {
        this.getTasksFromService();
      } else {
        //display the error message
        console.log(responseFromService["errors"]);
      }
    })
  }

  getTask(id: String) {
    this._httpService.getOneTask(id).subscribe(responseFromService => {
      if(responseFromService['status']) {
        this.parentShowTask = responseFromService['task'];
        console.log(this.parentShowTask);
      }
    })
  }

  getOneTask(_id: String) {
    console.log(_id)
    let taskByID = this._httpService.getOneTask(_id);
    taskByID.subscribe(data => {
      console.log("Got your task!", data)
      this.oneTask = data['oneTask'];
    })
    console.log(`Click event is working task details being fetched: ${this.tasks[0].description}`)
  }

   // getAllTasks(event: any): void {
  //   this.getTasksFromService();
  // }

}
