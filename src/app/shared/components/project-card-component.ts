import { AsyncPipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectService } from '../../services/project-service';
import { Project } from '../../infrastructure/types/project';

@Component({
    selector: 'app-project-card',
    template: `
        @if (project$ | async; as project) {
            <div class="card">
                <img [src]="project.image"/>
                <div class="card-body">
                    {{ project.name }}
                </div>
            </div>
        }
    `,
    imports: [AsyncPipe],
})
export class ProjectCardComponent implements OnChanges {
    private readonly projectService = inject(ProjectService);

    @Input({required: true}) projectId!: number;
    project$: Observable<Project> | null = null;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['projectId']) {
            this.project$ = this.projectService.getProject(this.projectId);
        }
    }
}