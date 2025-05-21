import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular15-demo';
  data: any;
  metadata: any;
  isLoading = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Load data when component initializes
    this.loadData();
    this.loadMetadata();
  }

  loadData(): void {
    this.getData().subscribe({
      next: (response) => {
        this.data = response;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load data: ' + err.message;
        this.isLoading = false;
        console.error('Error loading data:', err);
      }
    });
  }

  loadMetadata(): void {
    this.getMetadata().subscribe({
      next: (response) => {
        this.metadata = response;
      },
      error: (err) => {
        console.error('Error loading metadata:', err);
      }
    });
  }

  getData(): Observable<any> {
    return this.http.get('/api/get_data');
  }

  getMetadata(): Observable<any> {
    return this.http.get('/api/get_metadata');
  }
}
