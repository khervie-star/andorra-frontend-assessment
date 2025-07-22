import { Calendar, Clock } from 'lucide-react';
import React from 'react';
import styled, { css } from 'styled-components';

import type { ITask, TTaskPriority, TTaskStatus } from "../../../types";

interface IProps {
  task: ITask;
}

const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-family: "Outfit", sans-serif;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
    transform: scaleY(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border-color: ${({ theme }) => theme.colors.primary}40;

    &::before {
      transform: scaleY(1);
    }
  }

  @media (max-width: 500px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
`;

const Status = styled.span<{ status: TTaskStatus }>`
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  letter-spacing: 0.025em;

  ${({ status, theme }) =>
    status === "pending" &&
    css`
      background-color: ${theme.colors.warning}20;
      color: ${theme.colors.warning};
      border: 1px solid ${theme.colors.warning}40;
    `}
  ${({ status, theme }) =>
    status === "completed" &&
    css`
      background-color: ${theme.colors.success}20;
      color: ${theme.colors.success};
      border: 1px solid ${theme.colors.success}40;
    `}
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: auto;
`;

const DateInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.75rem;
`;

const DateItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: ${({ theme }) => theme.colors.muted};

  svg {
    width: 0.75rem;
    height: 0.75rem;
    opacity: 0.7;
  }
`;

const DueDate = styled(DateItem)<{ isOverdue?: boolean }>`
  ${({ isOverdue, theme }) =>
    isOverdue &&
    css`
      color: ${theme.colors.danger};
      font-weight: 500;
    `}
`;

const Priority = styled.span<{ priority: TTaskPriority }>`
  font-weight: 600;
  text-transform: capitalize;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  letter-spacing: 0.025em;

  ${({ priority, theme }) =>
    priority === "low" &&
    css`
      background-color: ${theme.colors.success}15;
      color: ${theme.colors.success};
      border: 1px solid ${theme.colors.success}30;
    `}
  ${({ priority, theme }) =>
    priority === "medium" &&
    css`
      background-color: ${theme.colors.warning}15;
      color: ${theme.colors.warning};
      border: 1px solid ${theme.colors.warning}30;
    `}
  ${({ priority, theme }) =>
    priority === "high" &&
    css`
      background-color: ${theme.colors.danger}15;
      color: ${theme.colors.danger};
      border: 1px solid ${theme.colors.danger}30;
    `}
`;

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
  const taskIsOverdue = isOverdue(task.dueDate, task.status);

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
    </CardContainer>
  );
};
