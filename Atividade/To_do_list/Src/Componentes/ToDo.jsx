import React from 'react';

const ToDo = ({ todo, removeTodo, completeTodo, toggleImportant }) => {
  return (
    <div className='todo' style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
      <div className='content'>
        <p>{todo.text}</p>
        <p className='category'>({todo.category})</p>
      </div>
      <div>
        <button className='complete' onClick={() => completeTodo(todo.id)}>
          Completar
        </button>
        <button className='remove' onClick={() => removeTodo(todo.id)}>
          x
        </button>
        <button className='important' onClick={() => toggleImportant(todo.id)}>
          {todo.isImportant ? 'Desmarcar' : 'Importante'}
        </button>
      </div>
    </div>
  );
};

export default ToDo;
