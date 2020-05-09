import React, { Component } from 'react';

/// Modifica el componente para que se puedan agregar tareas, tachar y destacharlas y error de validacion en el input

class App extends Component {
  constructor() {
    super()
    this.state = {
      tasks: [
        { id: 1, name: "Sacar la ropa", done: false },
        { id: 2, name: "Hacer la cama", done: true },
        { id: 3, name: "Leer un rato", done: false }
      ],
      newTask: '',
      newTaskId: 4,
      redBorder: ""
    }
  }

  updateTask = (event) => {
    this.setState({
      newTask: event.target.value,
      redBorder: ""
    });    
  }

  keyPress = (event) => {     
    event.preventDefault();

    if(!this.state.newTask){
      this.setState({
        redBorder: "error"
      })    

    }else{
      let oldTasks = this.state.tasks

      this.setState({
        tasks: [...oldTasks, {
          id: this.state.newTaskId,
          name: this.state.newTask,
          done: false
        }],
        newTask: '', 
        newTaskId: this.state.newTaskId + 1       
      })      
    }     
  } 

  doneTask = (id) => {

    this.setState(prevState => {

      const newState = {...prevState};

      newState.tasks = newState.tasks.map(item => {
        if(item.id === id){
          return {
            ...item,
            done: !item.done
          };
        }else{
          return item
        }
      });
      return newState
    });    
  };  

  render() {
    return (
      <div className="wrapper">
        <div className="list">
          <h3>Por hacer:</h3>
          <ul className="todo">
            {this.state.tasks.map((task, index) => <li key={task.id} className={task.done ? "done" : ""} onClick={() => this.doneTask(task.id)}>{task.name}</li>)}
          </ul>
          <form onSubmit={this.keyPress}>
            <input type="text" id="new-task" className={this.state.redBorder} onChange={this.updateTask} value={this.state.newTask} placeholder="Ingresa una tarea y oprime Enter"/>
          </form>
        </div>
      </div>
    )
  }
}

export default App;
