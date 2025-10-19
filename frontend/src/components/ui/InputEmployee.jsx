import React from "react";
import {
  Button,
  CloseButton,
  Dialog,
  For,
  HStack,
  Input,
  Portal,
  VStack,
} from "@chakra-ui/react";
import { Field } from "./field.jsx";
import SelectRole from "./SelectRole.jsx";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import baseUrl from "../../../constants/global-variables.js";
import { queryClient } from "../../../utils/queryClient.js";

const InputEmployee = ({ open, onOpenChange, type = "add", data }) => {
  const defaultValues = {
    name: "",
    email: "",
    age: "",
    salary: "",
    role: "",
  };

  const [info, setInfo] = useState(defaultValues);
  
  useEffect(() => {
    setInfo(type === "add" ? defaultValues : { ...data });
  }, [type, data, open]);

  function handleChange(e) {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const addEmployeeMutation = useMutation({
    mutationFn: async (info) => {
      const response = await fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      return data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success("Employee added successfully!");
      queryClient.invalidateQueries({ queryKey: ["employee_details"] });
      onOpenChange && onOpenChange({ open: false });
    },
  });

  
  const updateMutation = useMutation({
    mutationFn: async (info) => {
      const response = await fetch(baseUrl + '/' + info.id, {
        method: "PUT",
        body: JSON.stringify(info),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      return data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success("Employee updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["employee_details"] });
      onOpenChange && onOpenChange({ open: false });
    },
  });

  const requiredFields = ["name", "age", "salary", "email"];
  function handleSubmit() {
    for (const key of requiredFields) {
      if (!info[key].toString().trim()) {
        toast.error(`Missing fields!`);
        return;
      }
    }
    const infoUpdated = { ...info, role: info.role || null };
    if(type === "add") {
        addEmployeeMutation.mutate(infoUpdated);
    } 
    else {
        updateMutation.mutate(infoUpdated);
    }
  }

  return (
    <Dialog.Root
      placement="center"
      motionPreset="slide-in-bottom"
      open={open}
      onOpenChange={(e) => {
        onOpenChange && onOpenChange(e);
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                {type === "add" ? "Add Employee" : "Update Employee"}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <VStack gap="4" align-items="flex-start">
                <Field label="Username" required>
                  <Input
                    name="name"
                    placeholder="Enter username"
                    value={info.name}
                    onChange={handleChange}
                  />
                </Field>
                <Field label="Email" required>
                  <Input
                    name="email"
                    placeholder="Enter email"
                    value={info.email}
                    onChange={handleChange}
                  />
                </Field>
                <Field label="Age" required>
                  <Input
                    name="age"
                    placeholder="Enter age"
                    type="number"
                    value={info.age}
                    onChange={handleChange}
                  />
                </Field>
                <Field label="Salary" required>
                  <Input
                    name="salary"
                    placeholder="Enter salary"
                    value={info.salary}
                    onChange={handleChange}
                  />
                </Field>
                <Field>
                  <SelectRole setInfo={setInfo} />
                </Field>
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button onClick={handleSubmit}>
                {type === "add" ? "Add" : "Update"}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default InputEmployee;
