import React, { useState, useEffect } from 'react';
import { onValue, ref, remove, set, query, orderByKey } from 'firebase/database';
import GlobaStyle from '../../services/global_style'
import { uid } from 'uid';
import Header from '../../components/Header'
import Board from '../../components/Board'
import { db } from '../../firebase'
import data from "../../data.json"

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(0);

 const generateBaseTable = async () => {
      set(ref(db, `/`), {
        Tasks: data.Tasks
      })
  }

  const handleAddTask = (id, e) => {
    const uuid = uid();

    set(ref(db, `/Tasks/${id}/cards/${uuid}`), {
      id: uuid,
      title: "Task Title ...",
      content: "detail ...",
      dueAt: " ",
      status: "pending",
      labels: [""],
      createdAt: Date(),
    })
    setPage(page + 1);
  }

  const fetchAllTask = () => {
    const tasks_id = ["1", "2", "3"]
    setTasks([]);
    var withdrawRef = query();

    tasks_id.forEach(id => {
      withdrawRef = query(ref(db, `/Tasks/${id}`), orderByKey());
      onValue(withdrawRef, snapshot => {
        const data = snapshot.val();
        if (data !== null) {
          filterData(data)
        } else {
          generateBaseTable()
        }

      });

    });
  }

  function filterData(data) {
    var tempCards = [];
    for (var key in data.cards) {
      tempCards.push(data.cards[key]);
    }
    data.cards = tempCards;
    setTasks(oldArray => [...oldArray, data]);

  }

  function swipCardFirebase(source, destination, card) {
    set(ref(db, `/Tasks/${destination}/cards/${card.id}`), card)
    remove(ref(db, `/Tasks/${source}/cards/${card.id}`));
    setPage(page + 1);
  }

  const pageRefresh = () => {
    setPage(page + 1);
  }

  useEffect(() => {
    fetchAllTask();
  }, [page]);


  return (
    <>
      <GlobaStyle />

      <Header />
      <>
        {(tasks.length === 3) && <Board data={tasks} handleAddTask={handleAddTask} swipCardFirebase={swipCardFirebase} refreshTaskList={pageRefresh} />}
      </>

    </>
  );
}

export default Dashboard;
