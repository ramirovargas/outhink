import { Component } from '@angular/core';

import { NavController, AlertController, ToastController, App, PopoverController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import * as moment from "moment";

import { PopoverPage } from '../popover/popover';

import { ServicesProvider } from '../../providers/services/services';

import { Push } from '@ionic/cloud-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  http: Http;
  start: String = moment().subtract(1, "days").format("YYYY-MM-DDTHH:mm");
  end: String = moment().subtract(1, "days").format("YYYY-MM-DDTHH:mm");
  contentHeader: Headers = new Headers({ "Content-Type": "application/json" });
  data: Array<any> = [];
  logData: Array<any> = [];
  initial: String = new Date().toISOString();

  color: String = 'rgb(255,255,255)';

  r: Number = 255;
  g: Number = 255;
  b: Number = 255;

  public url: String = "https://watson-advisor.mybluemix.net/";

  public totalCancelled = '0';

  loading: boolean = false;

  user: any = {};
  client: any = {};

  selectedCheck = [];
  selected = [];


  constructor(public services: ServicesProvider, public push: Push, private _app: App, public navCtrl: NavController, http: Http, public alertCtrl: AlertController, public toastCtrl: ToastController, public popoverCtrl: PopoverController, public loadingCtrl: LoadingController) {
    this.http = http;

    this.user = this.services.getUser();

    this.client = this.services.getCustomer();

    for (let elem of this.client.sids) {
      this.selectedCheck.push({ selected: true, sid: elem });
    };

    this.color = 'rgb(' + this.client.r + ',' + this.client.g + ',' + this.client.b + ')';
    this.r = this.client.r;
    this.g = this.client.g;
    this.b = this.client.b;

    this.updateChart();

    // Handle push notifications

    this.push.rx.notification()
      .subscribe((msg) => {
        alert(msg.title + ': ' + msg.text);
      });

  }

  //LineChart
  public lineChartOptions: any = {
    responsive: true,
    tooltips: {
      displayColors: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toLocaleString('de-DE') + ' Jobs';
        }
      }
    }
  };

  public lineChartLabels: string[] = ["Date1", "Date2", "Date3", "Date4", "Date5", "Date6", "Date7", "Date8", "Date9", "Date10"];
  public lineChartType: string = "line";
  public lineChartLegend: boolean = false;
  public lineChartData: any[] = [
    { data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10], label: "Cancelled jobs" }
  ];

  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',0.2)',
      borderColor: 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',1)',
      pointBackgroundColor: 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',0.8)'
    }
  ];
  //BarChart
  public chartOptions: any = {
    responsive: true,

    tooltips: {
      displayColors: false,
      titleFontSize: 0,
      callbacks: {
        label: function (tooltipItems, data) {
          return tooltipItems.xLabel.toLocaleString('de-DE', { maximumFractionDigits: 1 }) + ' ms';
        }
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function (label, index, labels) {
            return label + ' ms';
          }
        },
        scaleLabel: {
          display: false,
          labelString: 'Duration'
        }
      }],
      yAxes: [{
        stacked: true
      }]
    }
  };

  public chartLabels: string[] = ["Job1", "Job2", "Job3"];
  public chartType: string = "horizontalBar";
  public chartLegend: boolean = false;
  public chartData: any[] = [
    { data: [10, 10, 10], label: "Total duration (ms)" }
  ];

  public barChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(' + this.client.r + ',' + this.client.g + ',' + this.client.b + ',0.6)',
      borderColor: 'rgba(' + this.client.r + ',' + this.client.g + ',' + this.client.b + ',1)'
    }
  ];

  // pieChart
  public pieChartData: number[] = [1, 1, 1, 1, 1];
  public pieChartLabels: string[] = ["User1", "User2", "User3", "User4", "User5"];
  public pieChartOptions: any = {
    responsive: true,
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {

          return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toLocaleString('de-DE') + " Jobs";
        }
      }
    }

  };

  public pieChartLegend: boolean = true;
  public pieChartType: string = 'pie';

  // donChart
  public donChartData: number[] = [1, 1, 1, 1, 1];
  public donChartLabels: string[] = ["Job1", "Job2", "Job3", "Job4", "Job5"];
  public donChartOptions: any = {
    responsive: true,
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {

          return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toLocaleString('de-DE') + " Jobs";
        }
      }
    }

  };

  public donChartLegend: boolean = true;
  public donChartType: string = 'doughnut';

  // Color
  public colors: Array<any> = [
    {
      backgroundColor: this.client.colors
    }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);

    let clicked = e.active[0];

    if (clicked != null) {
      let da = this.data[clicked._index];
      if (da != null) {
        this.logData = da.log;
      }
    }

  }

  public chartHovered(e: any): void {
    //console.log(e);
  }

  public updateChart(): void {



    this.loading = true;

    // Check if there is something selected
    this.selected = [];
    var coun = 0;

    this.selectedCheck.forEach(function (elem) {
      if (elem.selected) { coun++ }
    });

    // Add sids

    if (coun > 0) {

      for (let elem of this.selectedCheck) {
        if (elem.selected) { this.selected.push(elem.sid) }
      };

    } else {
      for (let elem of this.selectedCheck) {
        elem.selected = true;
        this.selected.push(elem.sid);
      };
    }

    this.start = moment(this.start).utc().startOf('day').format();
    this.end = moment(this.end).utc().endOf('day').format();

    this.updateBar();
    this.updatePie();
    this.updateDon();
    this.updateLine();
  }

  updateBar(): void {

    var link = this.url + 'jobchart';
    var data = JSON.stringify({ start: this.start, end: this.end, client: this.client.name, sids: this.selected });

    this.http.post(link, data, { headers: this.contentHeader })
      .subscribe(data => {
        console.log(data.json());

        this.data = data.json().data;

        if (this.data.length > 0) {

          var ar1 = [];
          var ar2 = [];

          this.data.forEach(function (job) {
            ar1.push(job.duration);
            ar2.push(job.job_name);
          });


          this.chartLabels = ar2;
          setTimeout(() => { this.chartData = [{ data: ar1, label: "Total duration (ms)" }]; }, 1000);

        } else {
          this.chartLabels = ["Job1", "Job2", "Job3"];
          setTimeout(() => { this.chartData = [{ data: [10, 10, 10], label: "Total duration (ms)" }]; }, 1000);
        }

        this.logData = [];

      }, error => {
        console.log("Oooops!");
      });


  }

  updatePie(): void {

    var link = this.url + 'jobchart2';
    var data = JSON.stringify({ start: this.start, end: this.end, client: this.client.name, sids: this.selected });

    this.http.post(link, data, { headers: this.contentHeader })
      .subscribe(data => {
        console.log(data.json());

        var jobx = data.json().data;

        if (jobx.length > 0) {

          var ar1 = [];
          var ar2 = [];

          jobx.forEach(function (job) {
            ar1.push(job.value);
            ar2.push(job._id);
          });


          this.pieChartLabels = ar2;
          setTimeout(() => { this.pieChartData = ar1; }, 1000);

        } else {
          this.pieChartLabels = ["User1", "User2", "User3", "User4", "User5"];
          setTimeout(() => { this.pieChartData = [1, 1, 1, 1, 1] }, 1000);
        }
      }, error => {
        console.log("Oooops!");
      });




  }

  updateDon(): void {

    var link = this.url + 'jobchart3';
    var data = JSON.stringify({ start: this.start, end: this.end, client: this.client.name, sids: this.selected });

    this.http.post(link, data, { headers: this.contentHeader })
      .subscribe(data => {
        console.log(data.json());

        var jobx = data.json().data;

        if (jobx.length > 0) {

          var ar1 = [];
          var ar2 = [];

          jobx.forEach(function (job) {
            ar1.push(job.value);
            ar2.push(job._id);
          });


          this.donChartLabels = ar2;
          setTimeout(() => { this.donChartData = ar1; }, 1000);

        } else {
          this.donChartLabels = ["Job1", "Job2", "Job3", "Job4", "Job5"];
          setTimeout(() => { this.donChartData = [1, 1, 1, 1, 1] }, 1000);
        }
      }, error => {
        console.log("Oooops!");
      });




  }

  updateLine(): void {

    var link = this.url + 'jobchart4';
    var data = JSON.stringify({ start: this.start, end: this.end, client: this.client.name, sids: this.selected });

    this.http.post(link, data, { headers: this.contentHeader })
      .subscribe(data => {
        console.log(data.json());

        var jobx = data.json().data;

        this.loading = false;

        if (jobx.length > 0) {

          var ar1 = [];
          var ar2 = [];
          var tot = 0;

          jobx.forEach(function (job) {
            ar1.push(job.value);
            ar2.push(moment(job._id).add(1, "day").format("D/M/YYYY"));
            tot += job.value;
          });

          this.totalCancelled = tot.toLocaleString('de-DE');


          this.lineChartLabels = ar2;
          setTimeout(() => {
            this.lineChartData = [{ data: ar1, label: "Cancelled jobs" }]

          }, 1000);

        } else {
          this.lineChartLabels = ["Date1", "Date2", "Date3", "Date4", "Date5", "Date6", "Date7", "Date8", "Date9", "Date10"];
          setTimeout(() => {
            this.lineChartData = [
              { data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10], label: "Cancelled jobs" }
            ]
          }, 1000);

          this.totalCancelled = '0';
        }
      }, error => {
        console.log("Oooops!");
      });





  }

  // display menu
  displayMenu(event) {

    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: event
    });
  }


}
