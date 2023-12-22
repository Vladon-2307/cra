import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  inp: FormGroup = new FormGroup({
    ix: new FormControl('',Validators.required),
    iy: new FormControl('',Validators.required),
  });

  add(){
    if(this.inp.valid){
      this.x.push(this.inp.value.ix)
      this.y.push(this.inp.value.iy)
      localStorage.setItem('x', this.x.join('|'))
      localStorage.setItem('y', this.y.join('|'))
      this.inp.reset()
    }
  }

  x: number[] = [];
  y: number[] = [];

  constructor() {
    localStorage
      .getItem('x')
      ?.split('|')
      .map((i) => this.x.push(Number(i)));
    localStorage
      .getItem('y')
      ?.split('|')
      .map((i) => this.y.push(Number(i)));
  }

  sumx: number = 0;
  sumy: number = 0;
  srx: number = 0;
  sry: number = 0;

  sumotx2: number = 0;
  sumoty2: number = 0;
  sumotxoty: number = 0;

  srotx2: number = 0;
  sroty2: number = 0;

  r: number = 0;
  a: number = 0;
  b: number = 0;
  n2: number = 0;

  calculate(x: number[], y: number[]) {
    this.sumx = 0;
    this.sumy = 0;
    this.srx = 0;
    this.sry = 0;
    this.sumotx2 = 0;
    this.sumoty2 = 0;
    this.sumotxoty = 0;
    this.srotx2 = 0;
    this.sroty2 = 0;
    this.r = 0;
    this.a = 0;
    this.b = 0;
    this.n2 = 0;

    if (this.x.length != this.y.length) {
      return;
    }

    const l = this.x.length;

    for (let i = 0; i < l; i++) {
      this.sumx += x[i];
      this.sumy += y[i];
    }

    this.srx = this.sumx / l;
    this.sry = this.sumy / l;

    for (let i = 0; i < l; i++) {
      const otx = this.srx - x[i];
      const oty = this.sry - y[i];

      this.sumotx2 += otx * otx;
      this.sumoty2 += oty * oty;

      this.sumotxoty += otx * oty;
    }

    this.srotx2 = Math.sqrt(this.sumotx2 / l);
    this.sroty2 = Math.sqrt(this.sumoty2 / l);

    this.r = this.sumotxoty / (l * this.srotx2 * this.sroty2);

    this.n2 = this.r * this.r;

    this.b = this.r * (this.sroty2 / this.srotx2);
    this.a = this.sry - this.b * this.srx;
  }

  count(l: number) {
    const r = [];
    for (let i = 0; i < l; i++) {
      r.push(i);
    }
    return r;
  }
}
