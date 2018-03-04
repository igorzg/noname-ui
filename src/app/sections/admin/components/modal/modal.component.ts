import {
  ComponentFactoryResolver, Injector, OnDestroy, OnInit, ReflectiveInjector,
  ViewContainerRef
} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {ModalEventStatus, ModalService} from "./modal.service";

export class Modal implements OnDestroy, OnInit {

  loading: boolean = false;
  subscribers: Array<Subscription> = [];

  constructor(private injector: Injector,
              private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.subscribers.push(
      this.modalService.subscribe((event) => {
        if (event.operation === ModalEventStatus.OPEN) {
          this.open(event.injector, event.factory);
        } else if (event &&
          (
            event.operation === ModalEventStatus.CLOSE ||
            event.operation === ModalEventStatus.DESTROY
          )
        ) {
          this.close();
        }
      })
    );
  }

  private open(injector, factory) {
    this.loading = true;
    let ele = this.viewContainerRef.createComponent(factory, 0, injector);
    ele.changeDetectorRef.detectChanges();
    this.loading = false;
  }

  private close() {
    if (this.viewContainerRef.length > 0) {
      this.viewContainerRef.detach(0);
    }
  }


}
