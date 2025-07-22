import { BookCheck, Calendar, Clock, Edit, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';

import { useTaskStore } from '../../../store/store';
import { AppButton } from '../../button';
import {
    ActionButton, ActionsContainer, CardContainer, DateInfo, DateItem, Description, DueDate, Footer,
    Header, Priority, Status, Title
} from './task-card.styled';

import type { ITask, TTaskStatus } from "../../../types";
interface IProps {
  task: ITask;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = date.getTime() - now.getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Tomorrow";
  if (diffInDays === -1) return "Yesterday";
  if (diffInDays > 0) return `In ${diffInDays} days`;
  return `${Math.abs(diffInDays)} days ago`;
};

const isOverdue = (dueDateString: string, status: TTaskStatus): boolean => {
  if (status === "completed") return false;
  const dueDate = new Date(dueDateString);
  const now = new Date();
  return dueDate < now;
};

export const TaskCard: React.FC<IProps> = ({ task }) => {
  const navigate = useNavigate();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [toggleConfirmOpen, setToggleConfirmOpen] = useState(false);

  const taskIsOverdue = isOverdue(task.dueDate, task.status);
  const { deleteTask, toggleComplete } = useTaskStore();

  const handleDelete = () => {
    setDeleteConfirmOpen(true);
  };

  const handleToggle = () => {
    setToggleConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteTask(task.id);
    setDeleteConfirmOpen(false);
    toast.success(`Task "${task.title}" deleted successfully.`);
  };

  const handleToggleCompletionConfirm = () => {
    toggleComplete(task.id);
    setToggleConfirmOpen(false);
    toast.info(
      `Task "${task.title}" marked as ${
        task.status === "completed" ? "pending" : "completed"
      } successfully.`
    );
  };

  return (
    <CardContainer>
      <Header>
        <Title>{task.title}</Title>
        <Status status={task.status}>{task.status}</Status>
      </Header>

      <Description>{task.description}</Description>

      <Footer>
        <DateInfo>
          <DueDate isOverdue={taskIsOverdue}>
            <Calendar />
            <span>Due: {formatDate(task.dueDate)}</span>
          </DueDate>
          <DateItem>
            <Clock />
            <span>Created: {formatRelativeDate(task.createdAt)}</span>
          </DateItem>
        </DateInfo>

        <Priority priority={task.priority}>{task.priority} priority</Priority>
      </Footer>

      <ActionsContainer>
        <ActionButton
          $variant="edit"
          onClick={() => navigate("/tasks/edit/" + task.id)}
          aria-label="Edit task">
          <Edit size={16} />
        </ActionButton>

        <ActionButton
          $variant="delete"
          onClick={handleDelete}
          aria-label="Delete task">
          <Trash2 size={16} />
        </ActionButton>

        <ActionButton
          $variant="delete"
          onClick={handleToggle}
          aria-label="Toggle task completion">
          <BookCheck
            size={16}
            color={task.status === "completed" ? "#22c55e " : "#f97316 "}
          />
        </ActionButton>
      </ActionsContainer>

      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete "{task.title}"? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteConfirmOpen(false)}
            style={{ textTransform: "none" }}>
            Cancel
          </Button>
          <AppButton click={handleDeleteConfirm}>Delete</AppButton>
        </DialogActions>
      </Dialog>

      <Dialog
        open={toggleConfirmOpen}
        onClose={() => setToggleConfirmOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          Mark task as{" "}
          {task.status === "completed" ? "uncompleted" : "completed"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to mark task as{" "}
            {task.status === "completed" ? "uncompleted" : "completed"} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setToggleConfirmOpen(false)}
            style={{ textTransform: "none" }}>
            No
          </Button>
          <AppButton click={handleToggleCompletionConfirm}>Yes</AppButton>
        </DialogActions>
      </Dialog>
    </CardContainer>
  );
};
