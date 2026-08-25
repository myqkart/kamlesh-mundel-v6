"use client";

import type { Project } from "@/data/projects";
import { ProjectVisual } from "@/components/sections/featured-work/ProjectVisual";

type ArchivePreviewProps = {
  project: Project | null;
  x: number;
  y: number;
};

export function ArchivePreview({ project, x, y }: ArchivePreviewProps) {
  if (!project?.visual) return null;

  return (
    <div
      aria-hidden="true"
      className="archive-preview is-active"
      style={{ left: x, top: y }}
    >
      <div className="overflow-hidden bg-off-white ring-1 ring-teal-900/15">
        <ProjectVisual visual={project.visual} title={project.title} delay="0ms" />
      </div>
    </div>
  );
}
