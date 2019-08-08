import {AfterViewChecked, Component, OnInit} from '@angular/core';

interface Stuff {
  id: string;
  checked: boolean;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'speed-test';
  currentTime: number;
  stuffs: Array<Stuff> = [];

  public ngOnInit(): void {
    setInterval(() => {
      this.currentTime = Date.now();
      this.lazyGenerateStuff();
    }, 5);
  }

  private lazyGenerateStuff() {
    if (this.stuffs.length < 500) {
      const newStuff = [];

      for (let i = 0; i < 1; i++) {
        newStuff.push({id: new Date().toISOString(), name: `Stuff-${i}`, checked: i % 2 === 0});
      }
      this.stuffs = [...this.stuffs, ...newStuff];
    }
  }

  public ngAfterViewChecked(): void {
  }

  public trackByFn(index: number, data: Stuff) {
    return data.id;
  }

  public createNewStuff(): void {
    this.stuffs = [];

    // this.lazyGenerateStuff();
  }

}
