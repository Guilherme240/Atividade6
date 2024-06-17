import React from 'react';
import { Input, Button, Stack } from '@chakra-ui/react';

interface TaskInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ value, onChange, onAdd }) => {
  return (
    <Stack direction="row" spacing={4} mt={4}>
      <Input 
        placeholder="Adicionar nova tarefa" 
        value={value} 
        onChange={onChange} 
      />
      <Button colorScheme="teal" onClick={onAdd}>
        Adicionar
      </Button>
    </Stack>
  );
};

export default TaskInput;
