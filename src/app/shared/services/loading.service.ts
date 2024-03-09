import { Injectable, signal, WritableSignal } from '@angular/core';
import { Unsubscribable } from 'rxjs';
import { Optional } from '../models/shared.model';

export interface SubLike extends Unsubscribable {
  closed: boolean;
}

interface RegisteredSub {
  id: string;
  sub: SubLike;
}

@Injectable({ providedIn: 'root' })
export class Loading {

  public active = signal(false);

  private subsMap = new Map<string, SubLike>();
  private count: number = 0;

  public start(input?: RegisteredSub): void {
    if (input) this.subsMap.set(input.id, input.sub);

    if (++ this.count === 1) this.active.set(true);
  }

  public stop(id?: string): void {
    if (id) {
      const sub: Optional<SubLike> = this.subsMap.get(id);
      if (!sub) return;

      if (!sub.closed) sub.unsubscribe();

      this.subsMap.delete(id);
    }

    if (this.count > 0) this.count --;
    if (this.count === 0) this.active.set(false);
  }

  public stopForce(): void {
    for (const sub of this.subsMap.values()) {
      if (!sub.closed) sub.unsubscribe();
    }
    this.count = 0;
    this.subsMap.clear();
    this.active.set(false);
  }
}
