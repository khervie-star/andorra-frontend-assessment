import { Formik } from 'formik';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import * as Yup from 'yup';

import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel,
    IconButton, Switch
} from '@mui/material';

import { AppButton } from '../../../components/button';
import { useThemeMode as useCustomTheme } from '../../../context';
import { useTaskStore } from '../../../store/store';
import { darkTheme, lightTheme } from '../../../styles';
import {
    ButtonGroup, ErrorText, FieldGroup, FieldRow, FormContainer, Header, HeaderButtonWrapper,
    PageContainer, PriorityIndicator, StyledForm, StyledFormControl, StyledInputLabel,
    StyledMenuItem, StyledSelect, StyledTextField, Subtitle, Title
} from '../styles/task.styles';

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

export const EditTask = () => {
  const { id: taskId } = useParams();
  const navigate = useNavigate();
  const { tasks, editTask, deleteTask } = useTaskStore();
  const { darkMode } = useCustomTheme();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const theme = darkMode ? darkTheme : lightTheme;

  const taskToEdit = tasks.find((task) => task.id === taskId);

  if (!taskToEdit) {
    toast.error("Task not found");
    navigate("/tasks");
    return null;
  }

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    try {
      editTask({
        ...taskToEdit,
        title: values.title,
        description: values.description,
        dueDate: new Date(values.dueDate).toISOString().split("T")[0],
        priority: values.priority,
        status: values.status === true ? "completed" : "pending",
      });

      toast.success("Task updated successfully!");
      navigate("/tasks");
    } catch (error) {
      toast.error("Failed to update task");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = () => {
    try {
      deleteTask(taskId!);
      toast.success("Task deleted successfully!");
      navigate("/tasks");
    } catch (error) {
      toast.error("Failed to delete task");
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  return (
    <PageContainer theme={theme}>
      <FormContainer theme={theme}>
        <Header>
          <HeaderButtonWrapper>
            <IconButton onClick={() => navigate("/tasks")}>
              <ArrowLeft />
            </IconButton>
          </HeaderButtonWrapper>
          <Title theme={theme}>Edit Task</Title>
          <Subtitle theme={theme}>
            Update the details below to modify your task
          </Subtitle>
        </Header>

        <Formik
          initialValues={{
            title: taskToEdit.title,
            description: taskToEdit.description,
            dueDate: taskToEdit.dueDate,
            priority: taskToEdit.priority,
            status: taskToEdit.status === "completed",
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
            <StyledForm theme={theme}>
              <FieldGroup>
                <StyledTextField
                  fullWidth
                  name="title"
                  label="Task Title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter a descriptive title for your task"
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  variant="outlined"
                  theme={theme}
                />
              </FieldGroup>

              <FieldGroup>
                <StyledTextField
                  fullWidth
                  name="description"
                  label="Description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Provide detailed information about the task"
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  variant="outlined"
                  multiline
                  rows={4}
                  minRows={4}
                  maxRows={8}
                  theme={theme}
                />
              </FieldGroup>

              <FieldRow>
                <FieldGroup>
                  <StyledTextField
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
                    theme={theme}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      min: new Date().toISOString().split("T")[0],
                    }}
                  />
                </FieldGroup>

                <FieldGroup>
                  <StyledFormControl fullWidth theme={theme}>
                    <StyledInputLabel theme={theme}>Priority</StyledInputLabel>
                    <StyledSelect
                      name="priority"
                      value={values.priority}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Priority"
                      error={touched.priority && Boolean(errors.priority)}
                      theme={theme}>
                      <StyledMenuItem value="low" theme={theme}>
                        <PriorityIndicator priority="low" theme={theme} />
                        Low Priority
                      </StyledMenuItem>
                      <StyledMenuItem value="medium" theme={theme}>
                        <PriorityIndicator priority="medium" theme={theme} />
                        Medium Priority
                      </StyledMenuItem>
                      <StyledMenuItem value="high" theme={theme}>
                        <PriorityIndicator priority="high" theme={theme} />
                        High Priority
                      </StyledMenuItem>
                    </StyledSelect>
                    {touched.priority && errors.priority && (
                      <ErrorText theme={theme}>{errors.priority}</ErrorText>
                    )}
                  </StyledFormControl>
                </FieldGroup>
              </FieldRow>

              <FieldGroup>
                <FormControlLabel
                  control={
                    <Switch
                      name="status"
                      checked={values.status}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label="Completed"
                  sx={{
                    color: theme.colors.text,
                    marginLeft: 0,
                    marginRight: 0,
                    width: "100%",
                  }}
                />
              </FieldGroup>

              <ButtonGroup>
                <AppButton
                  type="button"
                  style={{ backgroundColor: "red", borderColor: "red" }}
                  click={() => setOpenDeleteDialog(true)}
                  isDisabled={isSubmitting}>
                  Delete Task
                </AppButton>
                <AppButton
                  type="submit"
                  variant="Primary"
                  isDisabled={isSubmitting}
                  loading={isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update Task"}
                </AppButton>
              </ButtonGroup>
            </StyledForm>
          )}
        </Formik>
      </FormContainer>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        PaperProps={{
          style: {
            backgroundColor: theme.colors.card,
            color: theme.colors.text,
            borderRadius: "12px",
            padding: "1rem",
          },
        }}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: theme.colors.text }}>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <AppButton
            variant="SecondaryOutline"
            click={() => setOpenDeleteDialog(false)}>
            Cancel
          </AppButton>
          <AppButton click={handleDelete}>Delete</AppButton>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};
