import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.page.html',
  styleUrls: ['./payroll.page.scss'],
})
export class PayrollPage implements OnInit {
  public employees = [
    {
      image: '../../assets/employee1.png',
      name: 'Diya U.',
      amount: '$54',
      hourly: '$15'
    },
    {
      image: '../../assets/e4.png',
      name: 'Brian T.',
      amount: '$75',
      hourly: '$15'
    },
    {
      image: '../../assets/e2.png',
      name: 'Michele J.',
      amount: '$43',
      hourly: '$15'
    },
    {
      image: '../../assets/e3.png',
      name: 'Karen R.',
      amount: '$32',
      hourly: '$15'
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
