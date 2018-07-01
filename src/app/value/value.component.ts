import { Component, OnInit } from '@angular/core';
import { ValueService } from './value.service';
import { Observable } from 'rxjs/Observable';
import { IValues } from './values';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
  public values$: Observable<IValues>;

  constructor(private valueService: ValueService) { }

  ngOnInit() {
    this.values$ = this.valueService.getValues();
  }

}
