import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ChartsService } from '../charts.service';

@Component({
  selector: 'ngx-chartjs-pie-dynamic',
  template: `
    <chart type="pie" [data]="data" [options]="options"></chart>
  `,
  providers: [ChartsService],
})
export class ChartjsDynamicPieComponent implements OnDestroy {
  data: {};
  options: {};
  themeSubscription: any;

  constructor(private theme: NbThemeService, private chartsService:ChartsService) {

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
      console.log('chartjs dynamic color ' + colors.primaryLight);
      console.log('chartjs dynamic color ' + colors.infoLight);
      console.log('chartjs dynamic color ' + colors.successLight);
      console.log('chartjs dynamic color ' + chartjs.textColor);

      this.chartsService.getPieChart().subscribe(resp => {
        this.data = resp.data;
        this.options = resp.options;
      });

      /*this.data = {
        labels: ['Download Sales', 'In-Store Sales', 'Mail Sales'],
        datasets: [{
          data: [300, 500, 100],
          // backgroundColor: [colors.primaryLight, colors.infoLight, colors.successLight],
          backgroundColor: ["#598bff","#42aaff","#2ce69b"],
        }],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };*/
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
