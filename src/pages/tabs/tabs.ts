import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { ChatPage } from '../chat/chat';
import { WorkloadPage } from '../workload/workload';
//import { AvailabilityPage } from '../availability/availability';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;
  //tab4Root: any = AvailabilityPage;
  tab5Root: any = ChatPage;
  tab6Root: any = WorkloadPage;

  constructor() {

  }
}
