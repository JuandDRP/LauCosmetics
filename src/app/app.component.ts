import { Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/components/toast/toast.component';
import { PrimeNG } from 'primeng/config';
import { primengES } from './core/i18n/primeng-es';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    ToastComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})



export class AppComponent implements OnInit {
  
  constructor(private primengConfig: PrimeNG) {}

  ngOnInit() {
    this.primengConfig.setTranslation(primengES);
  }

}
