import { Component, ElementRef, ViewChild } from '@angular/core';
import {Chart} from 'chart.js';
import { ChartService } from '../ChartServ/chart.service';

@Component({
  selector: 'app-my-chart3',
  templateUrl: './my-chart3.component.html',
  styleUrl: './my-chart3.component.scss'
})
export class MyChart3Component {

  @ViewChild('chartCanvas3') chartCanvas3!: ElementRef;
  
  chartData3: any[] = [];
  
  constructor(private chartService: ChartService) { }


  
   
  ngOnInit(): void {
    this.chartService.getClientDatda().subscribe((data) => {
      console.log(data);
      this.chartData3 = data;
      this.createChart3(data);
    });
    
}

createChart3(data : any []): void {
  console.log(this.chartData3);
  const labels = data.map((item) => item[0]); //  // Extract designation
  const values = data.map((item) => item[1]); //   // Extract count


  const ctx = document.getElementById('myChart2') as HTMLCanvasElement;
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{ 
        data: values,
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',  // Light Teal
          'rgba(255, 193, 7, 0.7)',   // Light Yellow
          'rgba(255, 105, 180, 0.7)', // Light Pink
          'rgba(173, 216, 230, 0.7)', // Light Sky Blue
          'rgba(144, 238, 144, 0.7)', // Light Green
        ],
        borderColor: [
          '#ff69b4',
          '#ffd700',
          '#4682b4',
        ],
        borderWidth: 1,
       }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


} 

