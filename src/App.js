import React, { useState } from 'react';
import TaskModal from './TaskModal';
import { ToastContainer, toast } from 'react-toastify';
import { Navbar, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle , faBars, faPenToSquare, faCircleXmark} from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  const handleAddTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), isComplete: false }]);
    setShowModal(false);
  };

  const handleUpdateTask = (task) => {
    setTasks(tasks.map(t => t.id === task.id ? {...t, ...task} : t));
    setCurrentTask(null);
    setShowModal(false);
  }

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast.success("Task deleted successfully!");
  };

  const openTaskModal = (task) => {
    setCurrentTask(task);
    setShowModal(true);
  };

  const editedDate = (dateVal) => {
    const dateParts = dateVal.split('-');
    const yearTwoDigits = dateParts[0].slice(-2);
    return `${dateParts[1]}/${dateParts[2]}/${yearTwoDigits}`;
  };

  return (
    <div className="container-fluid">
        <ToastContainer position="bottom-right"/>
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
                <p className="mx-auto"><FontAwesomeIcon icon={faBars}/> FRAMEWORKS</p>
                <Button className="mx-right" variant="outline-light" onClick={() => openTaskModal(null)}><FontAwesomeIcon icon={faPlusCircle}/> ADD</Button>
            </Container>
        </Navbar>

        <table className="table table-bordered mt-4">
            <thead className="thead-dark">
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Deadline</th>
                <th>Priority</th>
                <th>Is Complete</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
                {tasks.map((task) => (
                    <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{editedDate(task.deadline)}</td>
                    <td>{task.priority}</td>
                    <td>
                        <input
                        type="checkbox"
                        checked={task.isComplete}
                        onChange={() => toggleTaskCompletion(task.id)}
                        />
                    </td>
                    <td>
                        <div className="vertical-buttons">
                            {!task.isComplete && (
                              <button className="btn btn-primary" onClick={() => openTaskModal(task)}><FontAwesomeIcon icon={faPenToSquare}/> Update</button>
                            )}
                            <button className="btn btn-danger" onClick={() => deleteTask(task.id)}><FontAwesomeIcon icon={faCircleXmark}/> Delete</button>
                        </div>
                    </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <TaskModal showModal={showModal} closeModal={() => setShowModal(false)} addTask={handleAddTask} updateTask={handleUpdateTask} currentTask={currentTask} tasks={tasks}/>
    </div>
  );
};

export default App;
