import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppLayout } from '../components';
import { CreateTask, Dashboard, TasksPage } from '../pages';

export const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <React.Fragment>
          <Route path={"/"} element={<Dashboard />} />
          <Route path={"/tasks"} element={<TasksPage />} />
          <Route path={"/tasks/create"} element={<CreateTask />} />
        </React.Fragment>
      </Route>

      {/* <Route path="*" element={<PageNotFound />} /> */}
    </Routes>
  );
};
