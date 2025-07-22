import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import styled from 'styled-components';
import * as Yup from 'yup';

import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { AppButton } from '../../../components/button';
import { useThemeMode as useCustomTheme } from '../../../context';
import { useTaskStore } from '../../../store/store';

const TaskSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title too long")
    .required("Title is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description too long")
    .required("Description is required"),
  dueDate: Yup.date()
    .min(new Date(), "Due date must be in the future")
    .required("Due date is required"),
  priority: Yup.string()
    .oneOf(["low", "medium", "high"], "Invalid priority")
    .required("Priority is required"),
});

export const CreateTask = () => {
  const navigate = useNavigate();
  const addTask = useTaskStore((state) => state.addTask);
  const { darkMode } = useCustomTheme();

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    try {
      addTask({
        title: values.title,
        description: values.description,
        dueDate: new Date(values.dueDate).toISOString().split("T")[0],
        priority: values.priority,
      });

      toast.success("Task created successfully!");
      navigate("/tasks");
    } catch (error) {
      toast.error("Failed to create task");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageContainer $darkMode={darkMode}>
      <FormContainer $darkMode={darkMode}>
        <Title $darkMode={darkMode}>Create New Task</Title>

        <Formik
          initialValues={{
            title: "",
            description: "",
            dueDate: "",
            priority: "medium",
          }}
          validationSchema={TaskSchema}
          onSubmit={handleSubmit}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <StyledForm>
              <FormGroup>
                <TextField
                  fullWidth
                  name="title"
                  label="Title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter task title"
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  variant="outlined"
                  margin="normal"
                />
              </FormGroup>

              <FormGroup>
                <TextField
                  fullWidth
                  name="description"
                  label="Description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter task description"
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={5}
                />
              </FormGroup>

              <FormRow>
                <FormGroup style={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    name="dueDate"
                    label="Due Date"
                    type="date"
                    value={values.dueDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.dueDate && Boolean(errors.dueDate)}
                    helperText={touched.dueDate && errors.dueDate}
                    variant="outlined"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormGroup>

                <FormGroup style={{ flex: 1 }}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Priority</InputLabel>
                    <Select
                      name="priority"
                      value={values.priority}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Priority"
                      error={touched.priority && Boolean(errors.priority)}>
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                    </Select>
                    {touched.priority && errors.priority && (
                      <ErrorText>{errors.priority}</ErrorText>
                    )}
                  </FormControl>
                </FormGroup>
              </FormRow>

              <ButtonGroup>
                <AppButton
                  type="button"
                  variant="SecondaryOutline"
                  click={() => navigate("/tasks")}>
                  Cancel
                </AppButton>
                <AppButton
                  type="submit"
                  variant="Primary"
                  isDisabled={isSubmitting}
                  loading={isSubmitting}>
                  Create Task
                </AppButton>
              </ButtonGroup>
            </StyledForm>
          )}
        </Formik>
      </FormContainer>
    </PageContainer>
  );
};

// Styled Components
interface DarkModeProps {
  $darkMode: boolean;
}

const PageContainer = styled.div<DarkModeProps>`
  min-height: 100vh;
  display: flex;
  //   justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
    align-items: flex-start;
  }
`;

const FormContainer = styled.div<DarkModeProps>`
  width: 100%;
  max-width: 600px;
  padding: 2.5rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h1<DarkModeProps>`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${({ theme, $darkMode }) =>
    $darkMode ? theme.colors.text : theme.colors.primary};
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
