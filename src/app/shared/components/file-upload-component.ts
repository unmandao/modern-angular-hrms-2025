import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-file-upload',
    template: `
        <div class="file-upload">
            <label for="upload">{{ label }}</label>
            <input type="file" id="upload" (change)="onFileSelected($event)" />
            @if (errorMessage) {
                <span class="error">
                    {{ errorMessage }} 
                    Only following file types are permitted: 
                    <ul>
                        @for (type of acceptArray; track type) {
                            <li>
                                {{ type }}
                            </li>
                        }
                    </ul>
                </span>
            }
        </div>
    `,
})
export class FileUploadComponent {
    @Input({required: true}) label!: string;    
    @Input() accept: string = '';
    @Output() selected = new EventEmitter<FileList>();
    errorMessage = '';

    get acceptArray(): string[] {
        return this.accept.split(',');
    }

    onFileSelected(event: any) {
        const files: FileList = event.target.files;
        this.errorMessage = Array.from(files)
            .every(f => this.accept.includes(f.type)) 
            ? '' : 'Invalid file type';

        if (this.errorMessage === '') {
            this.selected.emit(files);
        }
    }
}