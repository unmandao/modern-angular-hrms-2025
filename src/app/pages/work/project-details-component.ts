import { AsyncPipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, inject, numberAttribute } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../infrastructure/types/project';
import { ProjectService } from '../../services/project-service';
import { ProjectCardComponent } from '../../shared/components/project-card-component';


@Component({
  selector: 'app-project-details',
  template: `
    <div class="project-details">
      <h3>Project Details</h3>
      @if (project$ | async; as project) {
        <div>
            <span>Project Name: {{ project.name }}</span>
            <span>Project Description: {{ project.description }}</span>
            <span>Logo: {{ project.image }}</span>
            <div class="subprojects">
            <span>Subprojects:</span>
            @for (subProjectId of project.subProjectIds; track subProjectId) {
                <app-project-card                    
                    [projectId]="subProjectId"
                >
                </app-project-card>
            }
            </div>
        </div>
      }
    </div>
  `,
  imports: [AsyncPipe, ProjectCardComponent],
})
export class ProjectDetailsComponent implements OnChanges {
  @Input({transform: numberAttribute}) id!: number;
  private readonly projectService = inject(ProjectService);
  project$: Observable<Project> | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      this.project$ = this.projectService.getProject(this.id);
    }
  }
}