import { Component, inject, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  imports: [],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private homeService = inject(HomeService);

  public ngOnInit(): void {
    this.homeService.getGames().subscribe({
      next: (result) => console.log(result),
      error: (error) => console.error(error)
    });
  }
}
