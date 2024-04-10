import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle , faPenToSquare, faBan} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const TaskModal = ({ showModal, closeModal, addTask, updateTask, currentTask, tasks}) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'med',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
    if (showModal) {
      if (currentTask) {
        setTask(currentTask);
      } else {
        setTask({
          title: '',
          description: '',
          deadline: '',
          priority: 'med',
        });
      }
    }
  }, [currentTask, showModal]);

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!task.title && !currentTask) {
        formIsValid = false;
        errors['title'] = 'Title is Required!';
    }
    if (!task.description) {
        formIsValid = false;
        errors['description'] = 'Description is Required!';
    }
    if (!task.deadline) {
        formIsValid = false;
        errors['deadline'] = 'Deadline is Required!';
    }
    if (!currentTask && tasks.some(t => t.title.toLowerCase() === task.title.toLowerCase())) {
        formIsValid = false;
        errors['title'] = 'Task with this title already exists!';
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (currentTask) {
        updateTask({...task, id: currentTask.id});
      } else {
        addTask(task);
      }
      closeModal();
      toast.success(`Task ${currentTask ? 'updated' : 'added'} successfully!`);
    }
  };

  return (
    <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-primary">
            <h5 className="modal-title">
                {currentTask ? <><FontAwesomeIcon icon={faPenToSquare}/> Edit Task</> : <><FontAwesomeIcon icon={faPlusCircle}/> Add Task</>}
            </h5>
          </div>
          <div className="modal-body panel-body">
            <form>
                {!currentTask && (
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" className={`form-control ${errors.title ? 'is-invalid' : ''}`} name="title" id="title" placeholder="Title" value={task.title} required onChange={handleChange}/>
                        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                    </div>
                )}
              <div className="form-group">
                <label>Description</label>
                <textarea className={`form-control ${errors.description ? 'is-invalid' : ''}`} name="description" placeholder="Description" value={task.description} required onChange={handleChange}></textarea>
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
              </div>
              <div className="form-group">
                <label>Deadline</label>
                <input type="date" className={`form-control ${errors.deadline ? 'is-invalid' : ''}`} name="deadline" value={task.deadline} required onChange={handleChange}/>
                {errors.deadline && <div className="invalid-feedback">{errors.deadline}</div>}
              </div>
              <div className="form-group">
                <label>Priority</label>
                <div id="radioButtons">
                    <div className="form-check addspace">
                        <input type="radio" className="form-check-input" name="priority" id="priorityLow" value="low" checked={task.priority === 'low'} required onChange={handleChange}/>
                        <label className="form-check-label">Low</label>
                    </div>
                    <div className="form-check addspace">
                        <input type="radio" className="form-check-input" name="priority" id="priorityMed" value="med" checked={task.priority === 'med'} required onChange={handleChange}/>
                        <label className="form-check-label">Med</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" className="form-check-input" name="priority" id="priorityHigh" value="high" checked={task.priority === 'high'} required onChange={handleChange}/>
                        <label className="form-check-label">High</label>
                    </div>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>{currentTask ? <><FontAwesomeIcon icon={faPenToSquare}/> EDIT</> : <><FontAwesomeIcon icon={faPlusCircle}/> ADD</>}</button>
            <button type="button" className="btn btn-danger" onClick={closeModal}><FontAwesomeIcon icon={faBan}/> Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
