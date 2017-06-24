import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

document.addEventListener('DOMContentLoaded', () => {

    const Container = styled.div`
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;
`;

    const Li = styled.li`
    margin: 10px 0;
    font-size: 17px;
      &.checked {
        color: green;
      }
      &:first-child {
      margin-top: 20px;
      }
`;

    const Input = styled.input`
    width: 50%;
    min-height: 50px;
    font-size: 32px;
    padding: 5px 11px;
    box-sizing: border-box;
    min-width: 350px;
    &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        color: pink;
        font-weight: light;
    }
    `;


    const Button = styled.button`
      border-radius: 3px;
      margin: 0 0 0 10px;
      background: transparent;
      transition: all 0.2s ease-in-out;
      color: palevioletred;
      border: ${props => props.small ? '1px solid palevioletred' : '2px solid palevioletred'};
      padding: ${props => props.small ? '0.15em 0.6em' : '5px 27px;'};
      color: palevioletred;
      cursor: pointer;
      &.mainButton {
        min-height: 50px;
        font-size: 32px;
        box-sizing: border-box;
        margin: 0 0 0 13px;
      }
      &:hover {
        background: pink;
      }
`;


    class TODOList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                inputVal: '',
                validationText: '',
                validation: null,
                tasks: [
                    {
                        name: 'Example thing to do...',
                        done: false
                    },
                    {
                        name: '2nd Example thing to do...',
                        done: false
                    },
                    {
                        name: '3rd Example thing to do...',
                        done: false
                    },
                    {
                        name: '4th Example thing to do...',
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
            if (this.state.inputVal.length > 0) {
                this.setState({
                    tasks: tasksCopy,
                    validation: null,
                    validationText: null,
                    inputVal: '',
                });
            } else {
                this.setState({
                    validation: false,
                    validationText: 'Name your task first.',
                });
            }


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

        handleTaskRemove = (task, i) => {
            const tasksCopy = this.state.tasks.slice();

            tasksCopy.splice(i, 1);

            this.setState({
                tasks: tasksCopy,
            });
        };

        render() {
            // Tworzenie aktualnej listy zadań
            const tasksList = this.state.tasks.map((task, i) => <Li
                key={i}
                className={this.state.tasks[i].done ? "checked" : ''}>
                {task.name}
                <Button small onClick={(e) => this.handleTaskDone(task, i)}>Done</Button>
                <Button small onClick={(e) => this.handleTaskRemove(task, i)}>Remove</Button>
            </Li>);

            return <Container>
                <div className="header">
                    <h2>Things to be done:</h2>
                    <div style={{
                        color: this.state.validation ? 'green' : 'red',
                        marginBottom : '5px',
                    }}>
                        {this.state.validationText}
                    </div>
                    <Input placeholder="Type your task name" value={this.state.inputVal} onChange={this.handleInputValue}
                           type="text"/>
                    <Button className="mainButton" onClick={this.handleTaskAdd}>Add task</Button>
                </div>

                <ul>
                    {tasksList}
                </ul>
            </Container>
        }
    }


    ReactDOM.render(
        <TODOList/>,
        document.querySelector('#app')
    );
});
