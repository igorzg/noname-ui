import {EventEmitter, Injectable, Injector} from "@angular/core";
import {isObject} from "../../../../helpers";

export enum ModalEventStatus {
  OPEN = "OPEN",
  DESTROY = "DESTROY",
  CLOSE = "CLOSE"
}

export interface ModalEventOpenStatus {
  current: boolean;
  old: boolean;
}

export interface ModalEventComponent {
  injector?: Injector;
  factory?: any;
}

export interface ModalEvent extends ModalEventComponent {
  operation: ModalEventStatus;
  isOpenStatus: ModalEventOpenStatus;
}

@Injectable()
export class ModalService {

  private eventEmitter: EventEmitter<ModalEvent> = new EventEmitter<ModalEvent>();

  private _isOpened: boolean = false;

  /**
   * Check if popup is opened
   * @returns {boolean}
   */
  isOpened(): boolean {
    return this._isOpened;
  }

  /**
   * Open popup
   * @param injector
   * @param factory
   */
  open(injector: Injector, factory: any): void {
    if (this._isOpened) {
      this.destroy();
    }
    this.fireEvent(ModalEventStatus.OPEN, {
      injector: injector,
      factory: factory
    });
  }

  /**
   * Destroy popup
   */
  destroy() {
    this.fireEvent(ModalEventStatus.DESTROY);
  }

  /**
   * Close the popup and dereference
   */
  close(): void {
    this.fireEvent(ModalEventStatus.CLOSE);
  }

  /**
   * Fire change event and set open status
   * @param modalEventStatus
   * @param component
   */
  private fireEvent(modalEventStatus: ModalEventStatus, component?: ModalEventComponent) {
    let _current = this._isOpened;
    this._isOpened = modalEventStatus === ModalEventStatus.OPEN;
    let event: ModalEvent = {
      operation: modalEventStatus,
      isOpenStatus: {
        current: this._isOpened,
        old: _current
      },
    };
    if (isObject(component)) {
      Object.assign(event, component);
    }
    this.eventEmitter.emit(event);
  }

  /**
   * Event handler
   * @param generatorOrNext
   * @param error
   * @param complete
   * @returns {any}
   */
  subscribe(generatorOrNext?: any, error?: any, complete?: any): any {
    return this.eventEmitter.subscribe(generatorOrNext, error, complete);
  }
}
