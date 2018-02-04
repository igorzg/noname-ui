import {Injectable, OnDestroy} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";

/**
 * Iloader interface
 */
export interface ILoader extends OnDestroy {
  /**
   * Subscribed loaders
   */
  events: Array<Subscription>;
  /**
   * Loading dirtycheck
   */
  isLoading: boolean;
}

/**
 * Admin side body loader service
 */
@Injectable()
export class AdminSideBodyLoaderService {

  private eventEmitter: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Register loader listener
   * @param {(value: boolean) => void} next
   * @param {(error: any) => void} error
   * @param {() => void} complete
   * @returns {Subscription}
   */
  public subscribe(next?: (value: boolean) => void,
                   error?: (error: any) => void,
                   complete?: () => void) {
    return this.eventEmitter.subscribe(next, error, complete);
  }

  /**
   * Show Loader
   */
  public show(): void {
    this.eventEmitter.next(true);
  }

  /**
   * Hide loader
   */
  public hide(): void {
    this.eventEmitter.next(false);
  }

}
