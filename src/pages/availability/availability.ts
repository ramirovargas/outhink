import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, App, PopoverController } from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { PopoverPage } from '../popover/popover';

import { Storage } from '@ionic/storage';

/*
  Generated class for the Availability page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-availability',
  templateUrl: 'availability.html'
})
export class AvailabilityPage {

  http: Http;
  public url:String = "https://watson-advisor.mybluemix.net/";
  contentHeader: Headers = new Headers({"Content-Type": "application/json"});

local: Storage = new Storage();

table = {"success":true,"red":0,"blue":0,"green":37,"black":37,"rows":[{"st":"green","type":"ABAP","system":"CRM Productivo NCCRM013","log:":"Last verification: 2017-02-23 15:34:31SAP System ID: CRP SAP System Number: 00 Partner Host: NCCRMNODO1 Own Host: sap-rhel.co.ibm.com Partner System Release: 731 Partner Kernel Release: 722 Own Release: 720 Partner Codepage: 4102 Own Codepage: 4103 User: IBM_MON Client: 000 Language: E","bck":"Currently configuration: Sunday - 00:00:00 Type : Periodic Maintenance (BACKUP) Duration : 02:30:00 Next start: 2017-02-26 00:00:00 Next end : 2017-02-26 02:30:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 10:00:00 Started : 2017-02-12 00:00:00 Finalized: 2017-02-12 10:00:00 Description: contacto Nro. 1564418Set by : LVALLEJO_2017-02-12_08:53:05"},{"st":"green","type":"ABAP","system":"NW Gateway Productivo","log:":"Last verification: 2017-02-23 15:34:31SAP System ID: NGP SAP System Number: 00 Partner Host: NCNG013 Own Host: sap-rhel.co.ibm.com Partner System Release: 740 Partner Kernel Release: 745 Own Release: 720 Partner Codepage: 4102 Own Codepage: 4103 User: IBM_MON Client: 000 Language: E","bck":"Currently configuration: Sunday - 00:00:00 Type : Periodic Maintenance (BACKUP) Duration : 03:00:00 Next start: 2017-02-26 00:00:00 Next end : 2017-02-26 03:00:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 01:00:00 Started : 2017-01-20 22:00:00 Finalized: 2017-01-20 23:00:00 Description: Motivo:Kernel UpgradeSet by : lvallejo_2017-01-20_14:53:13"},{"st":"green","type":"URL","system":"GRC Desarrollo","log:":"Last verification: 2017-02-23 15:34:30200 - OK - The request was fulfilled.","bck":"Currently configuration: Monday - 03:00:00 Type : Periodic Maintenance (BACKUP) Duration : 01:00:00 Next start: 2017-02-27 03:00:00 Next end : 2017-02-27 04:00:00 Description: Backup Offline","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 03:00:00 Started : 2017-01-06 09:00:00 Finalized: 2017-01-06 12:00:00 Description: CH197197Set by : jlizarazo_2017-01-06_08:56:28"},{"st":"green","type":"ABAP","system":"CRM Desarrollo NCCRM011","log:":"Last verification: 2017-02-23 15:34:30SAP System ID: CRD SAP System Number: 00 Partner Host: nccrm011 Own Host: sap-rhel.co.ibm.com Partner System Release: 731 Partner Kernel Release: 722 Own Release: 720 Partner Codepage: 4102 Own Codepage: 4103 User: IBM_MON Client: 000 Language: E","bck":"Currently configuration: Saturday - 19:00:00 Type : Periodic Maintenance (BACKUP) Duration : 02:00:00 Next start: 2017-02-25 19:00:00 Next end : 2017-02-25 21:00:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 04:30:00 Started : 2016-12-15 18:00:00 Finalized: 2016-12-15 22:30:00 Description: CH195441 Fixpack DB2 V10.5.0.7 SAP2 CRM Desarrollo NCCRM011Set by : LVALLEJO_2016-12-15_17:27:16"},{"st":"green","type":"ABAP","system":"NW Gateway Desarrollo","log:":"Last verification: 2017-02-23 15:34:30SAP System ID: NGD SAP System Number: 00 Partner Host: NCNG011 Own Host: sap-rhel.co.ibm.com Partner System Release: 740 Partner Kernel Release: 745 Own Release: 720 Partner Codepage: 4102 Own Codepage: 4103 User: IBM_MON Client: 000 Language: E","bck":"Currently configuration: Saturday - 00:00:00 Type : Periodic Maintenance (BACKUP) Duration : 03:00:00 Next start: 2017-02-25 00:00:00 Next end : 2017-02-25 03:00:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 03:00:00 Started : 2017-01-20 09:00:00 Finalized: 2017-01-20 12:00:00 Description: CH198719 Upgrade de Kernel 745 - Gateway DEVSet by : jlizarazo_2017-01-20_09:15:05"},{"st":"green","type":"URL","system":"GRC Productivo","log:":"Last verification: 2017-02-23 15:34:28200 - OK - The request was fulfilled.","bck":"Currently configuration: Sunday - 14:00:00 Type : Periodic Maintenance (BACKUP) Duration : 01:00:00 Next start: 2017-02-26 14:00:00 Next end : 2017-02-26 15:00:00 Description: Backup Offline","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 01:00:00 Started : 2017-01-26 18:30:00 Finalized: 2017-01-26 19:30:00 Description: Revision Scrip de BackupSet by : lvallejo_2017-01-26_18:32:00"},{"st":"green","type":"ABAP","system":"SMD SOLMAN 7.1 ncsol011","log:":"Last verification: 2017-02-23 15:34:24SAP System ID: SMD SAP System Number: 00 Partner Host: ncsol011 Own Host: sap-rhel.co.ibm.com Partner System Release: 702 Partner Kernel Release: 722 Own Release: 720 Partner Codepage: 4102 Own Codepage: 4103 User: IBM_MON Client: 000 Language: E","bck":"Currently configuration: Saturday - 05:00:00 Type : Periodic Maintenance (BACKUP) Duration : 02:30:00 Next start: 2017-02-25 05:00:00 Next end : 2017-02-25 07:30:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 02:30:00 Started : 2017-01-26 14:30:00 Finalized: 2017-01-26 17:00:00 Description: CH199496	Update Kernel SMD 7.21 de Patch 500 a 7.22 Patch 200 25/01 17:00Set by : jsierraj_2017-01-26_14:27:53"},{"st":"green","type":"URL","system":"JAVA EPD Portal Desarrollo NCPOR011","log:":"Last verification: 2017-02-23 15:34:23200 - OK - The request was fulfilled.","bck":"Currently configuration: Saturday - 18:00:00 Type : Periodic Maintenance (BACKUP) Duration : 07:00:00 Next start: 2017-02-25 18:00:00 Next end : 2017-02-26 01:00:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 01:00:00 Started : 2017-01-30 08:31:00 Finalized: 2017-01-30 09:31:00 Description: CAMBIO = Reinicio solicitado por cliente 1558362Set by : jsierraj_2017-01-30_08:30:14"},{"st":"green","type":"URL","system":"JAVA EPP Portal Productivo 00 NCPOR023","log:":"Last verification: 2017-02-23 15:34:23200 - OK - The request was fulfilled.","bck":"Currently configuration: Monday - 00:30:00 Type : Periodic Maintenance (BACKUP) Duration : 01:00:00 Next start: 2017-02-27 00:30:00 Next end : 2017-02-27 01:30:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 03:00:00 Started : 2017-02-19 00:00:00 Finalized: 2017-02-19 03:00:00 Description: Motivo: CI Reinicio solicitado por el clienteSet by : LVALLEJO_2017-02-19_00:11:26"},{"st":"green","type":"URL","system":"JAVA EPP Portal Productivo 01 NCPOR013","log:":"Last verification: 2017-02-23 15:34:23200 - OK - The request was fulfilled.","bck":"Currently configuration: Monday - 00:30:00 Type : Periodic Maintenance (BACKUP) Duration : 01:00:00 Next start: 2017-02-27 00:30:00 Next end : 2017-02-27 01:30:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 03:00:00 Started : 2017-02-19 00:00:00 Finalized: 2017-02-19 03:00:00 Description: Motivo: CI Reinicio solicitado por el clienteSet by : LVALLEJO_2017-02-19_00:12:18"},{"st":"green","type":"URL","system":"JAVA EPP Portal Productivo 02 NCPOR033","log:":"Last verification: 2017-02-23 15:34:23200 - OK - The request was fulfilled.","bck":"Currently configuration: Monday - 00:30:00 Type : Periodic Maintenance (BACKUP) Duration : 01:00:00 Next start: 2017-02-27 00:30:00 Next end : 2017-02-27 01:30:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 03:00:00 Started : 2017-02-19 00:00:00 Finalized: 2017-02-19 03:00:00 Description: Reinicio Portal por erroes en sincronizacion,Set by : LVALLEJO_2017-02-19_00:03:20"},{"st":"green","type":"URL","system":"JAVA EPQ Portal Calidad NCPOR063","log:":"Last verification: 2017-02-23 15:34:23200 - OK - The request was fulfilled.","bck":"Currently configuration: Sunday - 21:00:00 Type : Periodic Maintenance (BACKUP) Duration : 01:10:00 Next start: 2017-02-26 21:00:00 Next end : 2017-02-26 22:10:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 04:00:00 Started : 2017-01-26 18:00:00 Finalized: 2017-01-26 22:00:00 Description: CH: Fix pack DB2Set by : lvallejo_2017-01-26_17:55:24"},{"st":"green","type":"URL","system":"JAVA PPM Calidad Nutresa","log:":"Last verification: 2017-02-23 15:34:23200 - OK - The request was fulfilled.","bck":"Currently configuration: Saturday - 07:00:00 Type : Periodic Maintenance (BACKUP) Duration : 01:00:00 Next start: 2017-02-25 07:00:00 Next end : 2017-02-25 08:00:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 01:00:00 Started : 2016-11-25 20:00:00 Finalized: 2016-11-25 21:00:00 Description: Kernel PPQSet by : LVALLEJO_2016-11-25_19:59:39"},{"st":"green","type":"URL","system":"JAVA PPM Desarrollo Nutresa","log:":"Last verification: 2017-02-23 15:34:23200 - OK - The request was fulfilled.","bck":"Currently configuration: Sunday - 05:00:00 Type : Periodic Maintenance (BACKUP) Duration : 03:00:00 Next start: 2017-02-26 05:00:00 Next end : 2017-02-26 08:00:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 01:00:00 Started : 2016-11-25 19:20:00 Finalized: 2016-11-25 20:20:00 Description: Kernel PPDSet by : LVALLEJO_2016-11-25_19:18:56"},{"st":"green","type":"URL","system":"JAVA PPM Prod Nutresa","log:":"Last verification: 2017-02-23 15:34:23200 - OK - The request was fulfilled.","bck":"Currently configuration: Sunday - 05:00:00 Type : Periodic Maintenance (BACKUP) Duration : 02:00:00 Next start: 2017-02-26 05:00:00 Next end : 2017-02-26 07:00:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 03:00:00 Started : 2017-01-14 17:00:00 Finalized: 2017-01-14 20:00:00 Description: Migracion a P8Set by : LVALLEJO_2017-01-13_12:23:37"},{"st":"green","type":"ABAP","system":"BIP Produccion ncbi013","log:":"Last verification: 2017-02-23 15:34:22SAP System ID: BIP SAP System Number: 01 Partner Host: ncbi013 Own Host: sap-rhel.co.ibm.com Partner System Release: 740 Partner Kernel Release: 742 Own Release: 720 Partner Codepage: 4102 Own Codepage: 4103 User: IBM_MON Client: 000 Language: E","bck":"Currently configuration: Saturday - 22:00:00 Type : Periodic Maintenance (BACKUP) Duration : 01:00:00 Next start: 2017-02-25 22:00:00 Next end : 2017-02-25 23:00:00 Description: BACKUP Periodico","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 12:00:00 Started : 2017-02-18 12:00:00 Finalized: 2017-02-19 00:00:00 Description: CH201682 Actualizacion BIP SPS Netweaver 740Set by : lvallejo_2017-02-16_10:14:32"},{"st":"green","type":"ABAP","system":"BWD Desarrollo ncbi014","log:":"Last verification: 2017-02-23 15:34:22SAP System ID: BWD SAP System Number: 00 Partner Host: ncbi014 Own Host: sap-rhel.co.ibm.com Partner System Release: 740 Partner Kernel Release: 742 Own Release: 720 Partner Codepage: 4102 Own Codepage: 4103 User: IBM_MON Client: 000 Language: E","bck":"Currently configuration: Friday - 22:00:00 Type : Periodic Maintenance (BACKUP) Duration : 02:00:00 Next start: 2017-02-24 22:00:00 Next end : 2017-02-25 00:00:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 12:00:00 Started : 2017-02-11 19:00:00 Finalized: 2017-02-12 07:00:00 Description: CH200961: Upgrade BWDSet by : lvallejo_2017-02-11_19:38:08"},{"st":"green","type":"ABAP","system":"ERP APPL ncerp093","log:":"Last verification: 2017-02-23 15:34:22SAP System ID: ERP SAP System Number: 00 Partner Host: ncerp093 Own Host: sap-rhel.co.ibm.com Partner System Release: 731 Partner Kernel Release: 722 Own Release: 720 Partner Codepage: 4102 Own Codepage: 4103 User: IBM_MON Client: 000 Language: E","bck":"Currently configuration: Sunday - 01:30:00 Type : Periodic Maintenance (BACKUP) Duration : 01:00:00 Next start: 2017-02-26 01:30:00 Next end : 2017-02-26 02:30:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 08:00:00 Started : 2017-02-19 00:00:00 Finalized: 2017-02-19 08:00:00 Description: CH201706 Fixpack DB2 V10.5.0.7 SAP2 ERP Produccion NCERPNODO2Set by : LVALLEJO_2017-02-18_22:09:59"},{"st":"green","type":"ABAP","system":"NPP Produccion ncnpd013","log:":"Last verification: 2017-02-23 15:34:22SAP System ID: NPP SAP System Number: 00 Partner Host: ncnpd013 Own Host: sap-rhel.co.ibm.com Partner System Release: 702 Partner Kernel Release: 722 Own Release: 720 Partner Codepage: 4102 Own Codepage: 4103 User: IBM_MON Client: 000 Language: E","bck":"Currently configuration: Sunday - 05:00:00 Type : Periodic Maintenance (BACKUP) Duration : 01:30:00 Next start: 2017-02-26 05:00:00 Next end : 2017-02-26 06:30:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 03:00:00 Started : 2017-01-14 17:00:00 Finalized: 2017-01-14 20:00:00 Description: Migracion P8Set by : LVALLEJO_2017-01-14_17:25:57"},{"st":"green","type":"ABAP","system":"NPQ Calidad ncnpd012","log:":"Last verification: 2017-02-23 15:34:22SAP System ID: NPQ SAP System Number: 00 Partner Host: ncnpd012 Own Host: sap-rhel.co.ibm.com Partner System Release: 702 Partner Kernel Release: 722 Own Release: 720 Partner Codepage: 4102 Own Codepage: 4103 User: IBM_MON Client: 000 Language: E","bck":"Currently configuration: Saturday - 07:00:00 Type : Periodic Maintenance (BACKUP) Duration : 01:30:00 Next start: 2017-02-25 07:00:00 Next end : 2017-02-25 08:30:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 01:00:00 Started : 2016-11-25 20:00:00 Finalized: 2016-11-25 21:00:00 Description: Kernel PPQSet by : LVALLEJO_2016-11-25_19:59:14"},{"st":"green","type":"ABAP","system":"PID Desarrollo 7.3 ncpi011","log:":"Last verification: 2017-02-23 15:34:22SAP System ID: PID SAP System Number: 00 Partner Host: NCPI011 Own Host: sap-rhel.co.ibm.com Partner System Release: 731 Partner Kernel Release: 722 Own Release: 720 Partner Codepage: 4102 Own Codepage: 4103 User: IBM_MON Client: 000 Language: E","bck":"Currently configuration: Sunday - 05:00:00 Type : Periodic Maintenance (BACKUP) Duration : 01:00:00 Next start: 2017-02-26 05:00:00 Next end : 2017-02-26 06:00:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 02:00:00 Started : 2017-02-21 19:50:00 Finalized: 2017-02-21 21:50:00 Description: Motivo: CI Reinicio solicitado por el clienteSet by : LVALLEJO_2017-02-21_19:54:18"},{"st":"green","type":"ABAP","system":"PIP Produccion 7.3 ncpi033","log:":"Last verification: 2017-02-23 15:34:22SAP System ID: PIP SAP System Number: 00 Partner Host: ncpi033 Own Host: sap-rhel.co.ibm.com Partner System Release: 731 Partner Kernel Release: 722 Own Release: 720 Partner Codepage: 4102 Own Codepage: 4103 User: IBM_MON Client: 000 Language: E","bck":"Currently configuration: Sunday - 00:00:00 Type : Periodic Maintenance (BACKUP) Duration : 01:30:00 Next start: 2017-02-26 00:00:00 Next end : 2017-02-26 01:30:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 08:00:00 Started : 2017-02-19 00:00:00 Finalized: 2017-02-19 08:00:00 Description: CH201706 Fixpack DB2 V10.5.0.7 SAP2 ERP Produccion NCERPNODO2Set by : LVALLEJO_2017-02-18_22:10:30"},{"st":"green","type":"ABAP","system":"PPD Desarrollo ncppm011","log:":"Last verification: 2017-02-23 15:34:22SAP System ID: PPD SAP System Number: 00 Partner Host: ncppm011 Own Host: sap-rhel.co.ibm.com Partner System Release: 702 Partner Kernel Release: 722 Own Release: 720 Partner Codepage: 4102 Own Codepage: 4103 User: IBM_MON Client: 000 Language: E","bck":"Currently configuration: Sunday - 05:00:00 Type : Periodic Maintenance (BACKUP) Duration : 03:00:00 Next start: 2017-02-26 05:00:00 Next end : 2017-02-26 08:00:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 01:00:00 Started : 2016-11-25 19:20:00 Finalized: 2016-11-25 20:20:00 Description: Kernel PPDSet by : LVALLEJO_2016-11-25_19:19:23"},{"st":"green","type":"ABAP","system":"SCQ Calidad ncscm012","log:":"Last verification: 2017-02-23 15:34:22SAP System ID: SCQ SAP System Number: 01 Partner Host: ncscm012 Own Host: sap-rhel.co.ibm.com Partner System Release: 731 Partner Kernel Release: 722 Own Release: 720 Partner Codepage: 4102 Own Codepage: 4103 User: IBM_MON Client: 000 Language: E","bck":"Currently configuration: Sunday - 03:00:00 Type : Periodic Maintenance (BACKUP) Duration : 03:00:00 Next start: 2017-02-26 03:00:00 Next end : 2017-02-26 06:00:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 03:00:00 Started : 2017-02-16 18:00:00 Finalized: 2017-02-16 21:00:00 Description: CH201699 Upgrade y Config Agentes SCMSet by : LVALLEJO_2017-02-16_16:42:15"},{"st":"green","type":"ABAP","system":"SMP SOLMAN 7.1 ncsol013","log:":"Last verification: 2017-02-23 15:34:22SAP System ID: SMP SAP System Number: 00 Partner Host: ncsol013 Own Host: sap-rhel.co.ibm.com Partner System Release: 702 Partner Kernel Release: 722 Own Release: 720 Partner Codepage: 4102 Own Codepage: 4103 User: IBM_MON Client: 000 Language: E","bck":"Currently configuration: Saturday - 19:00:00 Type : Periodic Maintenance (BACKUP) Duration : 05:00:00 Next start: 2017-02-25 19:00:00 Next end : 2017-02-26 00:00:00 Description: BACKUP...","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 01:00:00 Started : 2017-01-29 22:00:00 Finalized: 2017-01-29 23:00:00 Description: CH CH199499 Kernel Solman PRDSet by : JLIZARAZO_2017-01-29_22:05:08"},{"st":"green","type":"BO","system":"BO Produccion_Nodo1","log:":"Last verification: 2017-02-23 15:34:21Conexion EXITOSA a sistema BO !!!","bck":"Currently configuration: Saturday - 23:00:00 Type : Periodic Maintenance (BACKUP) Duration : 09:00:00 Next start: 2017-02-25 23:00:00 Next end : 2017-02-26 08:00:00 Description: BACKUP","MNT":""},{"st":"green","type":"BO","system":"BO Produccion_Nodo2","log:":"Last verification: 2017-02-23 15:34:21Conexion EXITOSA a sistema BO !!!","bck":"Currently configuration: Saturday - 23:00:00 Type : Periodic Maintenance (BACKUP) Duration : 09:00:00 Next start: 2017-02-25 23:00:00 Next end : 2017-02-26 08:00:00 Description: BACKUP.....","MNT":""},{"st":"green","type":"ABAP","system":"ERP APPL ncerp033","log:":"Last verification: 2017-02-23 15:34:20SAP System ID: ERP SAP System Number: 00 Partner Host: ncerp033 Own Host: sap-rhel.co.ibm.com Partner System Release: 731 Partner Kernel Release: 722 Own Release: 720 Partner Codepage: 4102 Own Codepage: 4103 User: IBM_MON Client: 000 Language: E","bck":"Currently configuration: Sunday - 01:30:00 Type : Periodic Maintenance (BACKUP) Duration : 01:00:00 Next start: 2017-02-26 01:30:00 Next end : 2017-02-26 02:30:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 08:00:00 Started : 2017-02-19 00:00:00 Finalized: 2017-02-19 08:00:00 Description: CH201706 Fixpack DB2 V10.5.0.7 SAP2 ERP Produccion NCERPNODO2Set by : LVALLEJO_2017-02-18_22:08:11"},{"st":"green","type":"ABAP","system":"ERP APPL ncerp043","log:":"Last verification: 2017-02-23 15:34:20SAP System ID: ERP SAP System Number: 00 Partner Host: ncerp043 Own Host: sap-rhel.co.ibm.com Partner System Release: 731 Partner Kernel Release: 722 Own Release: 720 Partner Codepage: 4102 Own Codepage: 4103 User: IBM_MON Client: 000 Language: E","bck":"Currently configuration: Sunday - 01:30:00 Type : Periodic Maintenance (BACKUP) Duration : 01:00:00 Next start: 2017-02-26 01:30:00 Next end : 2017-02-26 02:30:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 08:00:00 Started : 2017-02-19 00:00:00 Finalized: 2017-02-19 08:00:00 Description: CH201706 Fixpack DB2 V10.5.0.7 SAP2 ERP Produccion NCERPNODO2Set by : LVALLEJO_2017-02-18_22:08:34"},{"st":"green","type":"ABAP","system":"ERP APPL ncerp063","log:":"Last verification: 2017-02-23 15:34:20SAP System ID: ERP SAP System Number: 00 Partner Host: ncerp063 Own Host: sap-rhel.co.ibm.com Partner System Release: 731 Partner Kernel Release: 722 Own Release: 720 Partner Codepage: 4102 Own Codepage: 4103 User: IBM_MON Client: 000 Language: E","bck":"Currently configuration: Sunday - 01:30:00 Type : Periodic Maintenance (BACKUP) Duration : 01:00:00 Next start: 2017-02-26 01:30:00 Next end : 2017-02-26 02:30:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 08:00:00 Started : 2017-02-19 00:00:00 Finalized: 2017-02-19 08:00:00 Description: CH201706 Fixpack DB2 V10.5.0.7 SAP2 ERP Produccion NCERPNODO2Set by : LVALLEJO_2017-02-18_22:08:54"},{"st":"green","type":"ABAP","system":"ERP APPL ncerp073","log:":"Last verification: 2017-02-23 15:34:20SAP System ID: ERP SAP System Number: 00 Partner Host: ncerp073 Own Host: sap-rhel.co.ibm.com Partner System Release: 731 Partner Kernel Release: 722 Own Release: 720 Partner Codepage: 4102 Own Codepage: 4103 User: IBM_MON Client: 000 Language: E","bck":"Currently configuration: Sunday - 01:30:00 Type : Periodic Maintenance (BACKUP) Duration : 01:00:00 Next start: 2017-02-26 01:30:00 Next end : 2017-02-26 02:30:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 08:00:00 Started : 2017-02-19 00:00:00 Finalized: 2017-02-19 08:00:00 Description: CH201706 Fixpack DB2 V10.5.0.7 SAP2 ERP Produccion NCERPNODO2Set by : LVALLEJO_2017-02-18_22:09:22"},{"st":"green","type":"ABAP","system":"ERP APPL ncerp083","log:":"Last verification: 2017-02-23 15:34:20SAP System ID: ERP SAP System Number: 00 Partner Host: ncerp083 Own Host: sap-rhel.co.ibm.com Partner System Release: 731 Partner Kernel Release: 722 Own Release: 720 Partner Codepage: 4102 Own Codepage: 4103 User: IBM_MON Client: 000 Language: E","bck":"Currently configuration: Sunday - 01:30:00 Type : Periodic Maintenance (BACKUP) Duration : 01:00:00 Next start: 2017-02-26 01:30:00 Next end : 2017-02-26 02:30:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 08:00:00 Started : 2017-02-19 00:00:00 Finalized: 2017-02-19 08:00:00 Description: CH201706 Fixpack DB2 V10.5.0.7 SAP2 ERP Produccion NCERPNODO2Set by : LVALLEJO_2017-02-18_22:09:42"},{"st":"green","type":"ABAP","system":"ERP Calidad ncerp012","log:":"Last verification: 2017-02-23 15:34:20SAP System ID: ERQ SAP System Number: 01 Partner Host: ncerp012 Own Host: sap-rhel.co.ibm.com Partner System Release: 731 Partner Kernel Release: 722 Own Release: 720 Partner Codepage: 4102 Own Codepage: 4103 User: IBM_MON Client: 000 Language: E","bck":"Currently configuration: Sunday - 23:00:00 Type : Periodic Maintenance (BACKUP) Duration : 04:30:30 Next start: 2017-02-26 23:00:00 Next end : 2017-02-27 03:30:30 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 05:00:00 Started : 2017-02-10 18:00:00 Finalized: 2017-02-10 23:00:00 Description: CH200981 Fixpack DB2 V10.5.0.7 SAP2 ERP Calidad NCERP012Set by : LVALLEJO_2017-02-09_15:48:35"},{"st":"green","type":"ABAP","system":"ERP Desarrollo ncerp011","log:":"Last verification: 2017-02-23 15:34:20SAP System ID: ERD SAP System Number: 01 Partner Host: NCERP011 Own Host: sap-rhel.co.ibm.com Partner System Release: 731 Partner Kernel Release: 722 Own Release: 720 Partner Codepage: 4102 Own Codepage: 4103 User: IBM_MON Client: 000 Language: E","bck":"Currently configuration: Saturday - 00:00:00 Type : Periodic Maintenance (BACKUP) Duration : 04:00:00 Next start: 2017-02-25 00:00:00 Next end : 2017-02-25 04:00:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 04:00:00 Started : 2017-02-03 18:00:00 Finalized: 2017-02-03 22:00:00 Description: Fixpack DB2 V10.5.0.7 SAP2 ERP Desarrollo NCERP011Set by : LVALLEJO_2017-02-01_10:22:30"},{"st":"green","type":"ABAP","system":"ERP Produccion ncerp013","log:":"Last verification: 2017-02-23 15:34:20SAP System ID: ERP SAP System Number: 01 Partner Host: ncerp013 Own Host: sap-rhel.co.ibm.com Partner System Release: 731 Partner Kernel Release: 722 Own Release: 720 Partner Codepage: 4102 Own Codepage: 4103 User: IBM_MON Client: 000 Language: E","bck":"Currently configuration: Sunday - 04:00:00 Type : Periodic Maintenance (BACKUP) Duration : 01:00:00 Next start: 2017-02-26 04:00:00 Next end : 2017-02-26 05:00:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 08:00:00 Started : 2017-02-19 00:00:00 Finalized: 2017-02-19 08:00:00 Description: mantenimiento ERP Produccion NCERPNODO2 05022017Set by : LVALLEJO_2017-02-18_23:22:35"},{"st":"green","type":"ABAP","system":"SCD Desarrollo ncscm011","log:":"Last verification: 2017-02-23 15:34:20SAP System ID: SCD SAP System Number: 01 Partner Host: ncscm011 Own Host: sap-rhel.co.ibm.com Partner System Release: 731 Partner Kernel Release: 722 Own Release: 720 Partner Codepage: 4102 Own Codepage: 4103 User: IBM_MON Client: 000 Language: E","bck":"Currently configuration: Saturday - 02:00:00 Type : Periodic Maintenance (BACKUP) Duration : 04:01:40 Next start: 2017-02-25 02:00:00 Next end : 2017-02-25 06:01:40 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 03:00:00 Started : 2017-02-16 18:00:00 Finalized: 2017-02-16 21:00:00 Description: CH201699 Upgrade y Config Agentes SCMSet by : LVALLEJO_2017-02-16_16:41:44"},{"st":"green","type":"ABAP","system":"SCP Produccion ncscm013","log:":"Last verification: 2017-02-23 15:34:20SAP System ID: SCP SAP System Number: 01 Partner Host: ncscm013 Own Host: sap-rhel.co.ibm.com Partner System Release: 731 Partner Kernel Release: 722 Own Release: 720 Partner Codepage: 4102 Own Codepage: 4103 User: IBM_MON Client: 000 Language: E","bck":"Currently configuration: Saturday - 21:00:00 Type : Periodic Maintenance (BACKUP) Duration : 05:00:00 Next start: 2017-02-25 21:00:00 Next end : 2017-02-26 02:00:00 Description: BACKUP","MNT":"Currently Status, Inactive. Type : Temporary Maintenance (WINDOW) Duration : 03:00:00 Started : 2017-02-19 00:00:00 Finalized: 2017-02-19 03:00:00 Description: Motivo: CI Reinicio solicitado por el clienteSet by : LVALLEJO_2017-02-18_23:52:52"}]};


user:any = {};
client:any = {};

  constructor(private _app: App, public navCtrl: NavController, http: Http, public alertCtrl: AlertController, public toastCtrl: ToastController, public popoverCtrl: PopoverController,public loadingCtrl: LoadingController) {

    this.http = http;
    

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
      }
    }).catch(error => {
      console.log(error);
    });

    this.getInfo();

  }


    getInfo():void {
    
    var link = 'https://coemart.mybluemix.net/api2/nutresa';
        
        this.http.get(link, { headers: this.contentHeader })
        .subscribe(data => {
         console.log(data.json());


        }, error => {
            console.log("Oooops!");
        });
        

  }

  // display menu
  displayMenu(event) {
/*
let ev = {
  target : {
    getBoundingClientRect : () => {
      return {
        right:'0',
        bottom:'0'
      };
    }
  }
};
*/
        let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: event
    });
}

}
