import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ToDo from './components/ToDo';
import ToDoForm from './components/ToDoForm';
import Search from './components/Search';
import Filter from './components/Filter';

function App() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Ascendente');

  const addTodo = async (text, category) => {
    const newTodo = {
      id: Math.floor(Math.random() * 10000),
      text,
      category,
      isCompleted: false,
      isImportant: false
    };

    try {
      await axios.post('http://localhost:3000/todos', newTodo);
      const response = await axios.get('http://localhost:3000/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  const removeTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      const response = await axios.get('http://localhost:3000/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Erro ao remover tarefa:', error);
    }
  };

  const completeTodo = async (id) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      await axios.patch(`http://localhost:3000/todos/${id}`, {
        isCompleted: !todo.isCompleted
      });
      const response = await axios.get('http://localhost:3000/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Erro ao completar tarefa:', error);
    }
  };

  const toggleImportant = async (id) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      await axios.patch(`http://localhost:3000/todos/${id}`, {
        isImportant: !todo.isImportant
      });
      const response = await axios.get('http://localhost:3000/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Erro ao alterar a importância da tarefa:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/todos');
        setTodos(response.data);
      } catch (error) {
        console.error('Erro ao buscar as tarefas:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <h1>Lista de tarefas</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
      <div className="todo-list">
        {todos
          .filter((todo) => {
            if (filter === 'All') {
              return true;
            } else if (filter === 'Completed') {
              return todo.isCompleted;
            } else if (filter === 'Incomplete') {
              return !todo.isCompleted;
            } else if (filter === 'Important') {
              return todo.isImportant;
            }
          })
          .sort((a, b) => {
            if (sort === 'Ascendente') {
              return a.text.localeCompare(b.text);
            } else if (sort === 'Descendente') {
              return b.text.localeCompare(a.text);
            }
          })
          .filter((todo) =>
            todo.text.toLowerCase().includes(search.toLowerCase())
          )
          .map((todo) => (
            <ToDo
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              completeTodo={completeTodo}
              toggleImportant={toggleImportant}
            />
          ))}
      </div>
      <ToDoForm addTodo={addTodo} />
    </div>
  );
}

export default App;
