import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  give5Points(points: number): number {
    if (points >= 95) {
      return 100;
    } else {
      return points + 5;
    }
  }

  losePointsCollateral(points: number, deficit: number): number {
    if (points >= deficit) {
      return points - deficit
    } else {
      return points
    }
  }

  
  loseLastPoints(points: number, deficit: number) {
    if (points < deficit) {
      return 0
    } else {
      return points - deficit
    }
  }

  allOver50(...args: number[]): boolean {
    return [...args].every(points => points > 50)
  }

}
