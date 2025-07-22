import { Form } from 'formik';
import styled, { css } from 'styled-components';

import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import type { IAppTheme } from '../../../styles';
interface ThemedProps {
  theme: IAppTheme;
}

export const PageContainer = styled.div<ThemedProps>`
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    align-items: flex-start;
    padding-top: 2rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

export const FormContainer = styled.div<ThemedProps>`
  width: 100%;
  max-width: 650px;
  background: ${({ theme }) => theme.colors.card};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${({ theme }) =>
    theme.mode === "dark" &&
    css`
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3),
        0 10px 10px -5px rgba(0, 0, 0, 0.2);
      border-color: ${theme.colors.border};
    `}

  @media (max-width: 768px) {
    border-radius: 16px;
    margin: 0;
  }

  @media (max-width: 480px) {
    border-radius: 12px;
  }
`;

export const Header = styled.div`
  padding: 2.5rem 2.5rem 1rem 2.5rem;
  text-align: center;
  border-bottom: 1px solid ${({ theme }: ThemedProps) => theme.colors.border};
  background: ${({ theme }: ThemedProps) => theme.colors.background};

  @media (max-width: 768px) {
    padding: 2rem 1.5rem 1rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem 0.75rem 1rem;
  }
`;

export const Title = styled.h1<ThemedProps>`
  font-size: 2.25rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: ${({ theme }) => theme.colors.primary};
  background-clip: text;
  letter-spacing: -0.025em;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.875rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const Subtitle = styled.p<ThemedProps>`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
  font-weight: 400;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

export const StyledForm = styled(Form)<ThemedProps>`
  padding: 2rem 2.5rem 2.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    gap: 1.25rem;
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
`;

export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: start;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

export const StyledTextField = styled(TextField)<ThemedProps>`
  .MuiOutlinedInput-root {
    background: ${({ theme }) => theme.colors.background};
    border-radius: 12px;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 0.95rem;

    &:hover {
      background: ${({ theme }) => theme.colors.surface};
    }

    &.Mui-focused {
      background: ${({ theme }) => theme.colors.card};
    }

    .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.colors.border};
      border-width: 1.5px;
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.colors.primary};
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.colors.primary};
      border-width: 2px;
    }

    .MuiInputBase-input {
      color: ${({ theme }) => theme.colors.text};
      padding: 14px 16px;

      &::placeholder {
        color: ${({ theme }) => theme.colors.muted};
        opacity: 0.8;
      }
    }
  }

  .MuiInputLabel-root {
    color: ${({ theme }) => theme.colors.muted};
    font-weight: 500;

    &.Mui-focused {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  .MuiFormHelperText-root {
    margin-left: 4px;
    margin-top: 6px;
    font-size: 0.75rem;

    &.Mui-error {
      color: ${({ theme }) => theme.colors.danger};
    }
  }
`;

export const StyledFormControl = styled(FormControl)<ThemedProps>`
  .MuiOutlinedInput-root {
    background: ${({ theme }) => theme.colors.background};
    border-radius: 12px;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      background: ${({ theme }) => theme.colors.surface};
    }

    &.Mui-focused {
      background: ${({ theme }) => theme.colors.card};
    }

    .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.colors.border};
      border-width: 1.5px;
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.colors.primary};
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.colors.primary};
      border-width: 2px;
    }
  }
`;

export const StyledInputLabel = styled(InputLabel)<ThemedProps>`
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 500;

  &.Mui-focused {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StyledSelect = styled(Select)<ThemedProps>`
  color: ${({ theme }) => theme.colors.text};

  .MuiSelect-select {
    padding: 14px 16px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .MuiSelect-icon {
    color: ${({ theme }) => theme.colors.muted};
  }
`;

export const StyledMenuItem = styled(MenuItem)<ThemedProps>`
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 12px 16px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }

  &.Mui-selected {
    background-color: ${({ theme }) => theme.colors.primary}20;
    color: ${({ theme }) => theme.colors.primary};

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary}30;
    }
  }
`;

export const PriorityIndicator = styled.div<ThemedProps & { priority: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ priority, theme }) => {
    switch (priority) {
      case "high":
        return theme.colors.danger;
      case "medium":
        return theme.colors.warning;
      case "low":
        return theme.colors.success;
      default:
        return theme.colors.muted;
    }
  }};
  box-shadow: 0 0 0 2px
    ${({ priority, theme }) => {
      switch (priority) {
        case "high":
          return theme.colors.danger + "40";
        case "medium":
          return theme.colors.warning + "40";
        case "low":
          return theme.colors.success + "40";
        default:
          return theme.colors.muted + "40";
      }
    }};
`;

export const ErrorText = styled.div<ThemedProps>`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.75rem;
  margin-top: 0.5rem;
  margin-left: 4px;
  font-weight: 500;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 0.5rem;

  @media (max-width: 640px) {
    flex-direction: column-reverse;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    flex-direction: column-reverse;
    gap: 0.5rem;
  }
`;

export const HeaderButtonWrapper = styled.div`
  position: absolute;
  left: 1.5rem;
  top: 1.5rem;

  @media (max-width: 768px) {
    left: 1rem;
    top: 1rem;
  }
`;