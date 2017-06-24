import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {
    class ContactForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                inputVal: '',
                tasks: [
                    {
                        name: 'Element do zrobienia',
                        done: false
                    },
                    {
                        name: 'Element 2 do zrobienia',
                        done: false
                    },
                    {
                        name: 'Element 3 do zrobienia',
                        done: false
                    },
                    {
                        name: 'Element 4 do zrobienia',
                        done: false
                    },
                ]
            }
        }


        handleInputValue = event => {
            this.setState({
                inputVal: event.target.value,
            });
        };

        handleTaskAdd = event => {

            const tasksCopy = this.state.tasks.slice();
            const newTask = {
                name: this.state.inputVal,
                done: false,
            };
            tasksCopy.push(newTask);
            this.setState({
                tasks: tasksCopy,
            });

        };


        handleTaskDone = (task, i) => {
            const tasksCopy = this.state.tasks.slice();
            const doneTask = {
                name: this.state.tasks[i].name,
                done: !this.state.tasks[i].done,
            };

            tasksCopy[i] = doneTask;

            this.setState({
                tasks: tasksCopy,
            });
        };


        render() {
            // Tworzenie aktualnej listy zadań
            const tasksList = this.state.tasks.map((task, i) => <li
                key={i}
                className={this.state.tasks[i].done ? "checked" : ''}>
                {task.name}
                <button onClick={(e) => this.handleTaskDone(task, i)}>Done</button>
            </li>);

            return <div className="toDoList">
                <div className="header">
                    <h2>Lista rzeczy do zrobienia</h2>
                    <input value={this.state.tasks.name} onChange={this.handleInputValue} type="text"/>
                    <button className="addBtn" onClick={this.handleTaskAdd}>Dodaj</button>
                </div>

                <ul>
                    {tasksList}
                </ul>
            </div>
        }
    }


    ReactDOM.render(
        <ContactForm/>,
        document.querySelector('#app')
    );
});
