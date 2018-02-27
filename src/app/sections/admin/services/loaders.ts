import {Directive, ElementRef, Injectable, Input, OnDestroy, OnInit} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";


/**
 * Iloader interface
 */
export interface ILoader extends OnDestroy {
  /**
   * Subscibed loaders
   */
  events: Array<Subscription>;
  /**
   * Loading dirtycheck
   */
  isLoading: boolean;
}


/**
 * Loader service
 */
@Directive({
  selector: '[loader]'
})
export class LoaderDirective implements OnInit, OnDestroy {


  @Input("loader") loaderService: LoaderService;

  subscriber: Subscription;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.subscriber = this.loaderService.getEventHandler().subscribe(isLoaded => {
      if (isLoaded) {
        this.el.nativeElement.classList.add("loader");
      } else {
        this.el.nativeElement.classList.remove("loader");
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
    this.subscriber = null;
  }
}

/**
 * Admin side body loader service
 */
@Injectable()
export class LoaderService {

  private eventHandler: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Return event handler
   * @returns {BehaviorSubject}
   */
  public getEventHandler(): BehaviorSubject<boolean> {
    return this.eventHandler;
  }

  /**
   * Show Loader
   */
  public show(): void {
    this.eventHandler.next(true);
  }

  /**
   * Hide loader
   */
  public hide(): void {
    this.eventHandler.next(false);
  }

}
