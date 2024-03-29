import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, App, PopoverController } from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import * as moment from "moment";

import { PopoverPage } from '../popover/popover';

@Component({
  selector: 'page-workload',
  templateUrl: 'workload.html'
})
export class WorkloadPage {

http: Http;
start: String = moment().subtract(1,"days").format("YYYY-MM-DDTHH:mm");
lastStart: String = moment().subtract(1,"days").format("YYYY-MM-DDTHH:mm");
end: String = moment().subtract(1,"days").format("YYYY-MM-DDTHH:mm");
lastEnd: String = moment().subtract(1,"days").format("YYYY-MM-DDTHH:mm");
contentHeader: Headers = new Headers({"Content-Type": "application/json"});
data : Array<any> = [];

color : String = 'rgb(255,255,255)';

r: Number = 255;
g:Number = 255;
b: Number = 255;

public url:String = "https://watson-advisor.mybluemix.net/";

//local: Storage = new Storage();

loading: boolean = false;

user:any = {};
client:any = {};

selectedCheck =[];
selected = [];

lastSelected = [];

servers = [];

server = "^.*";

lastServer = "^.*";

  constructor(private _app: App, public navCtrl: NavController, http: Http, public alertCtrl: AlertController, public toastCtrl: ToastController, public popoverCtrl: PopoverController,public loadingCtrl: LoadingController) {
    this.http = http;
/*
        this.local.get('user').then(token => {
      if(token){
        this.user = token;
      }
    }).catch(error => {
      console.log(error);
    });

        this.local.get('client').then(token => {
      if(token){
        this.client = token;

        for(let elem of this.client.sids){
          this.selectedCheck.push({selected:true,sid:elem});
        };

        this.selected = this.client.sids;

        this.color = 'rgb('+ token.r +','+token.g+','+token.b+')';
        this.r = token.r;
        this.g = token.g;
        this.b = token.b;

        this.updateServers();

        this.updateChart();
      }
    }).catch(error => {
      console.log(error);
    });
*/
  }

  // Line chart

  public lineChartOptions:any={
    responsive: true,
              tooltips : {
            displayColors:false
          }
  };

  public lineChartLabels:string[] = ["Date1", "Date2", "Date3","Date4","Date5","Date6","Date7","Date8","Date9","Date10"];
  public lineChartType:string = "line";
  public lineChartLegend:boolean = false;
  public lineChartData:any[] = [
    {data:[10,10,10,10,10,10,10,10,10,10], label: "Value"}
  ];

  public lineChartColors:Array<any> = [
    { 
      backgroundColor: 'rgba('+this.r+','+this.g+','+this.b+',0.2)',
      borderColor: 'rgba('+this.r+','+this.g+','+this.b+',1)',
      pointBackgroundColor: 'rgba('+this.r+','+this.g+','+this.b+',1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba('+this.r+','+this.g+','+this.b+',0.8)'
    }
  ];

  updateChart():void {

    this.loading = true;

    // Check if there is something selected
    this.selected = [];
    var coun = 0;

    this.selectedCheck.forEach(function(elem){
      if(elem.selected){coun ++}
    });

// Add sids

    if(coun > 0){

          for(let elem of this.selectedCheck){
      if(elem.selected){this.selected.push(elem.sid)}
    };

    }else{
             for(let elem of this.selectedCheck){
          elem.selected = true;
          this.selected.push(elem.sid);
    };
  }

    this.lastSelected = this.selected.slice();

    this.lastServer = this.server.slice();
  

    this.start = moment(this.start).utc().startOf('day').format();
    this.lastStart = moment(this.start).utc().startOf('day').format();
    this.end = moment(this.end).utc().endOf('day').format();
    this.lastEnd = moment(this.end).utc().startOf('day').format();
    
    var link = this.url+'workloadchart';
    var da = JSON.stringify({start: this.start, end:this.end, client:this.client.name, sids:this.selected, instance:this.server});
        
        this.http.post(link, da, { headers: this.contentHeader })
        .subscribe(dat => {
         console.log(dat.json());         

         var datt = dat.json().items;

         var itt;

         for(var i = 0; i < datt.length; i ++){
          itt = datt[i].value;

          itt.steps = Number(itt.steps).toLocaleString('de-DE', { maximumFractionDigits: 0 });
          itt.time  = Number(itt.time).toLocaleString('de-DE', { maximumFractionDigits: 1 });
          itt.avg_proc_time = Number(itt.avg_proc_time).toLocaleString('de-DE', { maximumFractionDigits: 1 });
          itt.cpu_time = Number(itt.cpu_time).toLocaleString('de-DE', { maximumFractionDigits: 1 });
          itt.db_time = Number(itt.db_time).toLocaleString('de-DE', { maximumFractionDigits: 1 });
          itt.time2 = Number(itt.time2).toLocaleString('de-DE', { maximumFractionDigits: 1 });
          itt.wait_time = Number(itt.wait_time).toLocaleString('de-DE', { maximumFractionDigits: 1 });
          itt.rol_in = Number(itt.rol_in).toLocaleString('de-DE', { maximumFractionDigits: 1 });
          itt.roll_wait_time = Number(itt.roll_wait_time).toLocaleString('de-DE', { maximumFractionDigits: 1 });
          itt.load_gen_time = Number(itt.load_gen_time).toLocaleString('de-DE', { maximumFractionDigits: 1 });
          itt.lock_time = Number(itt.lock_time).toLocaleString('de-DE', { maximumFractionDigits: 1 });
          itt["CPIC/RFC"] = Number(itt["CPIC/RFC"]).toLocaleString('de-DE', { maximumFractionDigits: 1 });
          itt.time3 = Number(itt.time3).toLocaleString('de-DE', { maximumFractionDigits: 1 });
          itt.gui_time = Number(itt.gui_time).toLocaleString('de-DE', { maximumFractionDigits: 1 });
          itt.trips = Number(itt.trips).toLocaleString('de-DE', { maximumFractionDigits: 0 });
          itt.kb = Number(itt.kb).toLocaleString('de-DE', { maximumFractionDigits: 1 });
          itt.vmc_calls = Number(itt.vmc_calls).toLocaleString('de-DE', { maximumFractionDigits: 0 });
          itt.t_vmc_cpu = Number(itt.t_vmc_cpu).toLocaleString('de-DE', { maximumFractionDigits: 0 });
          itt.t_vmcelaps = Number(itt.t_vmcelaps).toLocaleString('de-DE', { maximumFractionDigits: 0 });
          itt.avgvmc_cpu = Number(itt.avgvmc_cpu).toLocaleString('de-DE', { maximumFractionDigits: 1 });
          itt.avgvmcelap = Number(itt.avgvmcelap).toLocaleString('de-DE', { maximumFractionDigits: 1 });
         }

         this.loading = false;

         this.data = datt;

        }, error => {
            console.log("Oooops!");
        });

        // Clean linechart

        this.lineChartLabels = ["Date1", "Date2", "Date3","Date4","Date5","Date6","Date7","Date8","Date9","Date10"];
         setTimeout(()=>{this.lineChartData = [
        {data:[10,10,10,10,10,10,10,10,10,10], label: ""}
         ]}, 1000);


  }

  updateLineChart(item, task):void {

    this.loading = true;
    
    var link = this.url+'workloadchart2';
    var da = JSON.stringify({start: this.lastStart, end:this.lastEnd, client:this.client.name, sids:this.lastSelected, item:item, task:task, instance:this.lastServer});
        
        this.http.post(link, da, { headers: this.contentHeader })
        .subscribe(dat => {
        console.log(dat.json());

         var items = dat.json().items;

         this.loading = false;

         if(items.length > 0){

         var ar1 = [];
         var ar2 = [];

         items.forEach(function(item){
            ar1.push((Number(item.value).toLocaleString('en-IN', { maximumFractionDigits: 1 })).replace(',',''));
            ar2.push(moment(item._id).add(1,"day").format("D/M/YYYY"));
         });

         
         this.lineChartLabels = ar2;
         setTimeout(()=>{this.lineChartData = [{data: ar1, label: ""}]
      }, 1000);

         }else{
          this.lineChartLabels = ["Date1", "Date2", "Date3","Date4","Date5","Date6","Date7","Date8","Date9","Date10"];
         setTimeout(()=>{this.lineChartData = [
    {data:[10,10,10,10,10,10,10,10,10,10], label: ""}
         ]}, 1000);
        }

        }, error => {
            console.log("Oooops!");
        });

  }

    updateServers():void {

    //this.loading = true;
    
    var link = this.url+'workloadchart3';
    var da = JSON.stringify({client:this.client.name, sids:this.selected});
        
        this.http.post(link, da, { headers: this.contentHeader })
        .subscribe(dat => {
        console.log(dat.json());

         var items = dat.json().items;

         //this.loading = false;

         if(items.length > 0){

          this.servers = items;

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
