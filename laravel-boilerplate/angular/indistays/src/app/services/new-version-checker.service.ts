import { Injectable, NgZone } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Subscription, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewVersionCheckerService {
  isNewVersionAvailable: boolean = false;
  intervalSource = interval(60 * 500); // every half minute
  intervalSubscription: Subscription;

  constructor(
    private swUpdate: SwUpdate,
    private zone: NgZone,
  ) {
    this.checkForUpdate();
  }

  checkForUpdate(): void {
    this.intervalSubscription?.unsubscribe();
    if (!this.swUpdate.isEnabled) {
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.intervalSubscription = this.intervalSource.subscribe(async () => {
        try {
          this.isNewVersionAvailable = await this.swUpdate.checkForUpdate();
          console.log(this.isNewVersionAvailable ? 'A new version is available.' : 'Already on the latest version.');
          if(this.isNewVersionAvailable) {
          }
        } catch (error) {
          console.error('Failed to check for updates:', error);
        }
      });
    })
  }

  applyUpdate(): void {
    // Reload the page to update to the latest version after the new version is activated
    this.swUpdate.activateUpdate()
      .then(() => {
        document.location.reload();
        setTimeout(() => {
        }, 2000);
      })
      .catch(error => console.error('Failed to apply updates:', error));
  }
}
