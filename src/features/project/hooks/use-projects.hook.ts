import { readProjects, writeProjects } from "@/features/project/storage/project.storage"
import type { ProjectSummary } from "@/features/project/types/project.type"
import { useCallback, useState } from "react"

type UseProjectsResult = Readonly<{
  projects: readonly ProjectSummary[]
  createProject: (name: string) => ProjectSummary
}>

export function useProjects(): UseProjectsResult {
  const [projects, setProjects] = useState<readonly ProjectSummary[]>(readProjects)

  const createProject = useCallback((name: string): ProjectSummary => {
    const timestamp = new Date().toISOString()
    const project: ProjectSummary = {
      id: crypto.randomUUID(),
      name: name.trim(),
      createdAt: timestamp,
      updatedAt: timestamp,
    }

    const nextProjects = [...projects, project]
    writeProjects(nextProjects)
    setProjects(nextProjects)

    return project
  }, [projects])

  return { projects, createProject }
}
