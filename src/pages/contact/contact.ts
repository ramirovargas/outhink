import { Component } from '@angular/core';

import { NavController, App, PopoverController } from 'ionic-angular';

import { Http, Headers } from '@angular/http';
import { PopoverPage } from '../popover/popover';

import { ServicesProvider } from '../../providers/services/services';
import 'rxjs/add/operator/map';
import * as moment from "moment";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  http: Http;
  start: String = moment().subtract(1, "days").utc().format();
  end: String = moment().subtract(1, "days").utc().format();
  contentHeader: Headers = new Headers({ "Content-Type": "application/json" });
  data: Array<any> = [];
  errorData: Array<any> = [];
  initial: String = new Date().toISOString();

  color: String = 'rgb(255,255,255)';

  r: Number = 255;
  g: Number = 255;
  b: Number = 255;


  loading: boolean = false;

  user: any = {};
  client: any = {};

  selectedCheck = [];
  selected = [];

  public totalDumps = '0';

  public url: String = "https://watson-advisor.mybluemix.net/";


  constructor(public services: ServicesProvider, private _app: App, public navCtrl: NavController, http: Http, public popoverCtrl: PopoverController) {
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

  }

  //LineChart
  public lineChartOptions: any = {
    responsive: true,
    tooltips: {
      displayColors: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toLocaleString('de-DE') + ' Dumps';
        }
      }
    }
  };

  public lineChartLabels: string[] = ["Date1", "Date2", "Date3", "Date4", "Date5", "Date6", "Date7", "Date8", "Date9", "Date10"];
  public lineChartType: string = "line";
  public lineChartLegend: boolean = false;
  public lineChartData: any[] = [
    { data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10], label: "Number of Dumps" }
  ];

  public lineChartColors: Array<any> = [
    { // green
      backgroundColor: 'rgba(34,139,34,0.2)',
      borderColor: 'rgba(34,139,34,1)',
      pointBackgroundColor: 'rgba(34,139,34,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(34,139,34,0.8)'
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
          return tooltipItems.xLabel.toLocaleString('de-DE') + ' Dumps';
        }
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function (label, index, labels) {
            return label + '';
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

  public chartLabels: string[] = ["Program1", "Program2", "Program3", "Program4", "Program5"];
  public chartType: string = "horizontalBar";
  public chartLegend: boolean = false;
  public chartData: any[] = [
    { data: [10, 10, 10, 10, 10], label: "Number of Dumps" }
  ];

  public barChartColors: Array<any> = [
    { // green
      backgroundColor: 'rgba(34,139,34,0.6)',
      borderColor: 'rgba(34,139,34,1)'
    }
  ];

  //BarChart2

  public chartLabels2: string[] = ["Error1", "Error2", "Error3", "Error4", "Error5"];
  public chartData2: any[] = [
    { data: [10, 10, 10, 10, 10], label: "Number of Dumps" }
  ];


  // events
  public chartClicked(e: any): void {
    console.log(e);

    let clicked = e.active[0];

    if (clicked != null) {
      let da = this.data[clicked._index];
      if (da != null) {
        this.errorData = da;
      }
    }

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
    this.updateBar2();
    this.updateLine();
  }

  updateBar(): void {

    var link = this.url + 'dumpchart';
    var data = JSON.stringify({ start: this.start, end: this.end, client: this.client.name, sids: this.selected });

    this.http.post(link, data, { headers: this.contentHeader })
      .subscribe(data => {
        console.log(data.json());

        var dat = data.json().data;

        if (dat.length > 0) {

          var ar1 = [];
          var ar2 = [];

          dat.forEach(function (job) {
            ar1.push(job.value);
            ar2.push(job._id);
          });


          this.chartLabels = ar2;
          setTimeout(() => { this.chartData = [{ data: ar1, label: "Number of Dumps" }]; }, 1000);

        } else {
          this.chartLabels = ["Program1", "Program2", "Program3", "Program4", "Program5"];
          setTimeout(() => { this.chartData = [{ data: [10, 10, 10, 10, 10], label: "Number of Dumps" }]; }, 1000);
        }

      }, error => {
        console.log("Oooops!");
      });


  }

  updateBar2(): void {

    var link = this.url + 'dumpchart2';
    var data = JSON.stringify({ start: this.start, end: this.end, client: this.client.name, sids: this.selected });

    this.http.post(link, data, { headers: this.contentHeader })
      .subscribe(data => {
        console.log(data.json());

        var dat = data.json().data;

        if (dat.length > 0) {

          var ar1 = [];
          var ar2 = [];

          this.data = [];

          let t = this;

          var cou = 0;

          dat.forEach(function (job) {
            ar1.push(job.value);
            ar2.push(job._id);

            //if(cou ==0){
            t.updateTable(job._id, cou);
            //}
            cou += 1;
          });


          this.chartLabels2 = ar2;
          setTimeout(() => { this.chartData2 = [{ data: ar1, label: "Number of Dumps" }]; }, 1000);

        } else {
          this.chartLabels2 = ["Error1", "Error2", "Error3", "Error4", "Error5"];
          setTimeout(() => { this.chartData2 = [{ data: [10, 10, 10, 10, 10], label: "Number of Dumps" }]; }, 1000);
        }

        this.errorData = [];

      }, error => {
        console.log("Oooops!");
      });


  }

  updateLine(): void {

    var link = this.url + 'dumpchart3';
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

          this.totalDumps = tot.toLocaleString('de-DE');


          this.lineChartLabels = ar2;
          setTimeout(() => { this.lineChartData = [{ data: ar1, label: "Number of Dumps" }] }, 1000);

        } else {
          this.lineChartLabels = ["Date1", "Date2", "Date3", "Date4", "Date5", "Date6", "Date7", "Date8", "Date9", "Date10"];
          setTimeout(() => {
          this.lineChartData = [
            { data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10], label: "Number of Dumps" }
          ]
          }, 1000);

          this.totalDumps = '0';
        }
      }, error => {
        console.log("Oooops!");
      });



  }

  updateTable(err, index): void {

    var link = this.url + 'dumpchart4';
    var data = JSON.stringify({ start: this.start, end: this.end, error: err, client: this.client.name, sids: this.selected });

    this.http.post(link, data, { headers: this.contentHeader })
      .subscribe(data => {
        console.log(data.json());

        var dat = data.json().data;

        dat.forEach(function (item) {
          var da = moment(item._id).add(1, "day").format("D/M/YYYY");
          item._id = da;

          item.value = item.value.toLocaleString('de-DE');
        });

        this.data[index] = { error: err, data: dat };


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