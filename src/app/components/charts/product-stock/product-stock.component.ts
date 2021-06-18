import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/EntityServices/product.service';

@Component({
  selector: 'app-product-stock',
  templateUrl: './product-stock.component.html',
  styleUrls: ['./product-stock.component.scss'],
})
export class ProductStockComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            max: 5,
          },
        },
      ],
    },
  };
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins: any = [];

  public barChartData: ChartDataSets[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAll().subscribe((res: Product[]) => {
      this.barChartLabels = [];
      let data: number[] = [];
      let label: string[] = [];

      res.forEach((product) => {
        this.barChartLabels.push(product.name);
        data.push(product.stock);
        label.push(product.name);
      });

      this.barChartData = [{ data: data, label: 'Stock' }];
    });
  }
}
