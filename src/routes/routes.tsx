import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppLayout } from '../components';
import { CreateTask, Dashboard, EditTask, PageNotFound, TasksPage } from '../pages';

const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <React.Fragment>
          <Route path={"/"} element={<Dashboard />} />
          <Route path={"/tasks"} element={<TasksPage />} />
          <Route path={"/tasks/create"} element={<CreateTask />} />
          <Route path={"/tasks/edit/:id"} element={<EditTask />} />
        </React.Fragment>
      </Route>

      <Route path={"*"} element={<PageNotFound />} />
    </Routes>
  );
};
export default MainRoutes;