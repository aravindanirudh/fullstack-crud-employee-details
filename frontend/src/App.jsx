import React, { useState } from 'react';
import { Button, VStack } from '@chakra-ui/react';
import EmployeeTable from './components/ui/EmployeeTable';
import { useQuery } from '@tanstack/react-query';
import baseUrl from '../constants/global-variables.js';
import InputEmployee from './components/ui/InputEmployee.jsx';

const App = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [dialogMode, setDialogMode] = useState('add');

  async function fetchEmployeeDetails() {
    const res = await fetch(baseUrl);
    const data = await res.json();
    if(!res.ok) {
      throw new Error(data.error);
    }
    return data;
  }

  const {isPending, isError, data, error} = useQuery({
    queryKey: ['employee_details'],
    queryFn: fetchEmployeeDetails
  });

  const handleAddClick = () => {
    setDialogMode('add');
    setSelectedEmployee(null);
    setDialogOpen(true);
  };

  const handleEditClick = (employee) => {
    setDialogMode('update');
    setSelectedEmployee(employee);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedEmployee(null);
  };

  if(isPending) { return "Loading"; }
  if(isError) { return error.message; }

  return (
    <VStack gap={6} align="flex-start">
      <Button variant="outline" onClick={handleAddClick}>
        Add Employee
      </Button>
      <InputEmployee 
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        type={dialogMode}
        data={selectedEmployee}
      />
      <EmployeeTable data={data} onEditClick={handleEditClick}/>
    </VStack>
  )
}

export default App