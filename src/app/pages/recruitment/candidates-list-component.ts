import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CandidateService } from '../../services/candidate-service';
import { createSearch } from '../../shared/functions/create-search';

@Component({
  selector: 'app-candidates-list',
  template: `
    <h2>Candidates list</h2>
    <table>
      <caption>Search: <input [formControl]="searchControl"/></caption>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>Position</th>
        </tr>
      </thead>
      <tbody>
        @for (candidate of candidates$ | async; track candidate.id) {
          <tr>
            <td>
              <a [routerLink]="[candidate.id]">{{ candidate.firstName }} {{ candidate.lastName }}</a>
            </td>
            <td>{{ candidate.email }}</td>
            <td>{{ candidate.position }}</td>
          </tr>
        }
      </tbody>
    </table>
  `,
  standalone: true,
  imports: [AsyncPipe, RouterLink, ReactiveFormsModule],
})
export class CandidatesListComponent implements OnInit {
  private readonly candidateService = inject(CandidateService);
  candidates$ = this.candidateService.getCandidates();
  searchControl = new FormControl('');  
  search$ = createSearch(this.searchControl);

  ngOnInit(): void {
    this.search$.subscribe((value) => {
      if (value) {
        this.candidates$ = this.candidateService.getCandidatesByName(value);
      } else {
        this.candidates$ = this.candidateService.getCandidates();
      }
    });
  }

}