import { AppLayout } from "@/core/layout/app.layout";
import { ProjectDetailsPage } from "@/features/project/pages/project-details.page";
import { ProjectListPage } from "@/features/project/pages/project-list.page";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/projects" replace />} />
          <Route path="projects" element={<ProjectListPage />} />
          <Route path="projects/:projectId" element={<ProjectDetailsPage />} />
          <Route path="*" element={<Navigate to="/projects" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
