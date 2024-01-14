import React, { useEffect, useState } from 'react';
import { ref, update, query, orderByKey, onValue } from 'firebase/database';
import dateFormat from 'dateformat';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import refreshImg from './refresh.png'
import add from "./add.png"
import { db } from '../../firebase'
import { TaskDetailContainer } from "./style";

const TaskDetail = ({ card, columnId, refreshTaskList }) => {
    const [task, setTask] = useState(card);
    const [detail, setDetail] = useState(card.content);
    const [title, setTitle] = useState(card.title);
    const [dueAt, setDueDate] = useState(new Date(card.dueAt === " " ? Date() : card.dueAt));
    const [isCalenderOpen, setIsCalaenderOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [open, setOpen] = React.useState(false);
    
    const isObjectEmpty = (objectName) => {
        return JSON.stringify(objectName) === "{}";
    };

    var [mainUser, setMainUser] = useState(((card?.assign_to === undefined) ? "" : (isObjectEmpty(card.assign_to) ? "" : Object.values(card.assign_to)[0].name)));


    const handleUpdateTask = (e) => {
        console.log("handleUpdateTask");
        update(ref(db, `/Tasks/${columnId}/cards/${task.id}`), task);
        refreshTaskList();
    }

    const handleOnChangeDetail = (e) => {
        task.content = e.target.value;
        setDetail(e.target.value);
    }

    const handleOnChangeTitle = (e) => {
        task.title = e.target.value;
        setTitle(e.target.value);
    }

    const onDateChange = (date) => {
        setIsCalaenderOpen(!isCalenderOpen);
        date.setTime(date.getTime() + (30 * 60 * 1000));
        setDueDate(new Date(date.toString()));
        task.dueAt = date.toString()

    };

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleListItemClick = (user) => {
        setTask(addIFKeyNotExist(task, "assign_to"));
        
        if (mainUser === "") {
            setMainUser(user.name);
        }
        
        setTask(current => {
            const copy = { ...current };
            copy.assign_to[user.id] = user
            return copy;
        })
        
        removeFromUsers(user)
        setOpen(false);
    };

    function addIFKeyNotExist(task, key) {

        if (task[key] === undefined) {
            task[key] = {};
        }
        return task;
    }

    const fetchUser = () => {

        var withdrawRef = query(ref(db, `/Users/`), orderByKey());
        onValue(withdrawRef, snapshot => {
            const data = snapshot.val();
            if (data !== null) {
                setUsers([])
                Object.values(data).map(user => {
                    if (mainUser === "" ) {
                        setUsers(oldArray => [...oldArray, user])
                    } else {
                        const found = Object.values(task.assign_to).find(element => element.id === user.id);
                        if (!found) {
                            setUsers(oldArray => [...oldArray, user])
                        }
                    }

                })
            }
        });
    }

    function removeFromUsers(user) {
        var myArray = users.filter(function (obj) {
            return obj.id !== user.id;
        });
        setUsers(myArray);

    }

    function addBackToUsers(user) {
        setUsers(oldArray => [...oldArray, user])
    }

    const handleDeleteUserFromTask = (user) => {

        setTask(current => {
            const copy = { ...current };
            var deleteUser = task.assign_to[user.id];
            delete task.assign_to[user.id];
            handleMainUserVariable(user);
            addBackToUsers(deleteUser);
            return copy;
        })
    }

    const handleMainUserVariable = (user) => {
        if (!isObjectEmpty(task.assign_to)) {
            setMainUser(Object.values(task.assign_to)[0].name)
        } else {
            setMainUser("")
        }
    }


    useEffect(() => {
        fetchUser();
    }, [mainUser]);

    useEffect(() => {
        
    }, [task]);

    return (
        <TaskDetailContainer>
            <div className="column">
                <div className="row">
                    <input className='title' type="text" value={title} onChange={handleOnChangeTitle} />
                </div>
                <div className="row user-info">
                    <img src="https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI" alt="" />
                    <p className='userName'>{mainUser}</p>
                    <p>|</p>
                    <div className='clander-row' >
                        <img src={refreshImg} alt="" />
                        <p className='dueDate' onClick={() => { setIsCalaenderOpen(!isCalenderOpen) }} >{dateFormat(dueAt, "mmmm dS, yyyy")}</p>
                        {isCalenderOpen && <Calendar className='calander' onChange={onDateChange} value={dueAt} />}
                    </div>
                </div>

                <div className='row'>
                    {
                        (mainUser !== "") &&
                        <div>
                            {
                                Object.values(task.assign_to).map((user, index) => (
                                    <span key={index} className="tag" onClick={() => { handleDeleteUserFromTask(user) }}>{user.name}</span>
                                ))
                            }
                        </div>}
                </div>

                <div className="row">
                    <textarea value={detail} onChange={handleOnChangeDetail}></textarea>
                </div>

                <div className='row'>
                    <p className='createdAt'>Created at: {dateFormat(task.createdAt, "mmmm dS, yyyy")}</p>
                </div>

                <button className='submitBtn' onClick={(e) => { handleUpdateTask(e) }}>Update</button>

                <div className='row'>
                    <div className='add-user'>
                        <p>Add Assignee: </p>
                        <button className='add-btn' onClick={handleOpen}><img className='add-img' src={add} alt="" /></button>
                    </div>
                </div>

                <div className='user-list'>
                    {open ? (
                        users.map((user, index) => (
                            <ul key={user.id} className="menu">
                                <li className="menu-item">
                                    <button onClick={() => { handleListItemClick(user) }}>{user.name}</button>
                                </li>
                            </ul>

                        ))
                    ) : null}
                </div>

            </div>
        </TaskDetailContainer>
    )
}

export default TaskDetail;