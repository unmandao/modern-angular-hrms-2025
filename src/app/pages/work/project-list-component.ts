import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProjectCardComponent } from '../../shared/components/project-card-component';
import { ProjectService } from '../../services/project-service';

@Component({
    selector: 'app-project-list',
    template: `
        <div class="row">            
            @for (project of (projects$ | async); track project.id) {
               <app-project-card [projectId]="project.id"/>
            }
        </div>
    `,
    standalone: true,
    imports: [ProjectCardComponent, AsyncPipe],
})
export class ProjectListComponent {
    private readonly projectService = inject(ProjectService);
    projects$ = this.projectService.getProjects();
}