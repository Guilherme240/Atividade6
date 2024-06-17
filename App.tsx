import React, { useState, useEffect } from 'react';
import { Box, Heading, List, ListItem, ListIcon, Spinner } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import TaskInput from './TaskInput';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://workshop-node-ts-intro-exemplo1.onrender.com/task');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTask.trim()) return;

    const task = {
      title: newTask,
      completed: false,
    };

    try {
      const response = await fetch('https://workshop-node-ts-intro-exemplo1.onrender.com/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      setTasks((prevTasks) => [...prevTasks, data]);
      setNewTask('');
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={6}>Lista de Tarefas</Heading>
      <TaskInput value={newTask} onChange={(e) => setNewTask(e.target.value)} onAdd={handleAddTask} />
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <List spacing={3} mt={6}>
          {tasks.map((task) => (
            <ListItem key={task.id}>
              <ListIcon as={CheckCircleIcon} color={task.completed ? 'green.500' : 'gray.500'} />
              {task.title}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default App;

