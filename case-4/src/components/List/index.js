import React from "react";

import Card from "../Card";
import { Container, Header} from "./style";
import { Droppable } from "react-beautiful-dnd";


export default function List({ column, handleAddTask, handleCardClick, refreshTaskList }) {
  return (
    <Droppable droppableId={column.id} >
      {(provided) => (

        <Container ref={provided.innerRef} {...provided.droppableProps}>
          <Header>
            <h2>{column.title}</h2>
            

             <>{(column.id === "1") && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={(e) => handleAddTask(column.id, e)}>Добавить задачу</button>}</> 
            
          </Header>

          {column.cards.map((card, index) => (
            <Card index={index} key={card.id} card={card} columnId={column.id} handleCardClick={handleCardClick} refreshTaskList={refreshTaskList} />
          ))}

          {provided.placeholder}
        </Container>
      )
      }
    </Droppable >
  );
}
