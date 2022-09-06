import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PointsService } from './services/points-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'catgotchi';
  public hungryPoints: number = 100;
  public sleepyPoints: number = 100;
  public cleanPoints: number = 100;
  public happyPoints: number = 100;
  public isHappy: boolean = true;
  public isDied: boolean = false;
  public showButtonRestart: boolean = false;
  public openModal: boolean = false;
  public interval: any;

  constructor(private pointsService: PointsService) {
  }

  @ViewChild('modal') modal!: ElementRef;

  public gameTimer = () => {
    if (this.hungryPoints <= 0 || this.sleepyPoints <= 0 || this.cleanPoints <= 0 || this.happyPoints <= 0) {
      clearInterval(this.interval)
      this.openModal = true
      this.isDied = true
    } else if (!this.isDied) {
      this.isHappy = this.pointsService.allOver50(this.hungryPoints, this.sleepyPoints, this.cleanPoints, this.happyPoints);
      this.sleepyPoints -= 1;
      this.cleanPoints -= 1;
      this.hungryPoints= this.pointsService.lose2Points(this.hungryPoints,2)
      this.happyPoints = this.pointsService.lose2Points(this.happyPoints, 2)
    }
  }

  ngOnInit() {
   this.interval = setInterval(this.gameTimer, 1000)
  }

  startGame() {
    this.interval = setInterval(this.gameTimer, 1000)
  }

  gimmeTuna() {
    this.hungryPoints = this.pointsService.give5Points(this.hungryPoints);
    this.cleanPoints = this.pointsService.losePointsCollateral(this.cleanPoints, 2)
  }
  gimmeSleep() {
    this.sleepyPoints = this.pointsService.give5Points(this.sleepyPoints)
    this.hungryPoints = this.pointsService.losePointsCollateral(this.hungryPoints, 2)
    this.happyPoints = this.pointsService.losePointsCollateral(this.happyPoints, 2)
  }
  gimmeBath() {
    this.cleanPoints = this.pointsService.give5Points(this.cleanPoints)
    this.happyPoints = this.pointsService.losePointsCollateral(this.happyPoints, 5)
  }
  gimmeRubs() {
    this.happyPoints = this.pointsService.give5Points(this.happyPoints)
    this.hungryPoints = this.pointsService.losePointsCollateral(this.hungryPoints, 3)
  }

  onRestart() {
      this.hungryPoints = 100;
      this.sleepyPoints = 100;
      this.cleanPoints = 100;
      this.happyPoints = 100;
      this.isHappy = true;
      this.isDied = false;
      this.startGame();
      this.showButtonRestart = false;
      this.openModal = false;
  }

  buttonRestart() {
    this.showButtonRestart = true;
  }
}
