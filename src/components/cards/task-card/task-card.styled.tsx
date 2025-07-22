import styled, { css } from 'styled-components';

import type { TTaskPriority, TTaskStatus } from "../../../types";

export const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
  transition: background-color 0.3s ease, color 0.3s ease;
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  max-width: 400px;

  @media (max-width: 500px) {
    padding: 0.75rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

export const Status = styled.span<{ status: TTaskStatus }>`
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
  color: white;

  ${({ status }) =>
    status === "pending" &&
    css`
      background-color: #ffb703;
    `}
  ${({ status }) =>
    status === "completed" &&
    css`
      background-color: #219ebc;
    `}
`;

export const Description = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.4;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
`;

export const DueDate = styled.span`
  opacity: 0.8;
`;

export const Priority = styled.span<{ priority: TTaskPriority }>`
  font-weight: 600;
  text-transform: capitalize;

  ${({ priority }) =>
    priority === "low" &&
    css`
      color: green;
    `}
  ${({ priority }) =>
    priority === "medium" &&
    css`
      color: orange;
    `}
  ${({ priority }) =>
    priority === "high" &&
    css`
      color: red;
    `}
`;
