import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Reserve } from 'src/app/Models/Reserve';
import { Table } from 'src/app/Models/Table';
import { Time } from './Models/Time';
import { FormService } from './Services/form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appForm';

  constructor(private formservice:FormService){

  }


  ngOnInit(): void {

    setInterval(() => {

      this.formservice.getTable().subscribe(data => { this.tables = data });
      this.formservice.getTime().subscribe(data => { this.times = data });
      this.formservice.getForm().subscribe(data=> {this.reservs=data});

    }, 1000);
  }

  reservs: Reserve[] = [];
  tables: Table[] = [];
  times:Time[]=[];



reservationform = new FormGroup({

  date: new FormControl("",[Validators.required]),
  time: new FormControl("1",[Validators.required]),
  table: new FormControl("1",[Validators.required]),
  smoking:new FormControl("",[Validators.required]),
  name:new FormControl("",[Validators.required, Validators.minLength(1)]),
  email:new FormControl("",[Validators.required, Validators.minLength(1)]),
  phone:new FormControl("",[Validators.required, Validators.minLength(1)]),
  note:new FormControl("",[Validators.required, Validators.minLength(1)]),


});


isFormValid() : boolean {
  return this.reservationform.disabled ? true : this.reservationform.valid
}

reservation()
{

  const form = {

    date: this.reservationform.value.date,
    timeId: this.reservationform.value.time,
    tableId:this.reservationform.value.table,
    smoking:this.reservationform.value.smoking,
    name:this.reservationform.value.name,
    email:this.reservationform.value.email,
    phone:this.reservationform.value.phone,
    note:this.reservationform.value.note,
  }

  this.formservice.postForm(form).subscribe(data =>{console.log(data)});


}

}
