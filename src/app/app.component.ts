import {Component, OnInit} from '@angular/core';

interface Data {
  id: string;
  checked: boolean;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  currentTime: number;
  data: Array<Data> = [];
  blockMsg = '';

  public ngOnInit(): void {
    this.storeCurrentTime();
    this.trackBlocks();
  }

  private trackBlocks() {
    let lastCheckTime = Date.now();

    setInterval(() => {
      const now = Date.now();
      const diff = now - lastCheckTime;

      if (diff > 100) {
        this.blockMsg = `The Event Loop was blocked for ${diff} ms :-(`;
      }

      lastCheckTime = now;
    }, 10);
  }

  private storeCurrentTime() {
    setInterval(() => {
      this.currentTime = Date.now();
    }, 10);
  }

  private generateData() {
    const newData = [];

    for (let i = 0; i < 200; i++) {
      newData.push({id: `data-${i}`, name: `Stuff-${i}`, checked: i % 2 === 0});
    }

    this.data = [...newData];
  }

  public trackByFn(index: number, data: Data) {
    return data.id;
  }

  public createNewStuff(): void {
    this.generateData();
  }

}
