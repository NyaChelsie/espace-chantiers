import { Directive, TemplateRef, ViewContainerRef, effect, inject, input } from '@angular/core';
import { AuthService, Role } from '../services/auth.service';

@Directive({
  selector: '[appSeulementPour]',
})
export class SeulementPourDirective {
  private readonly modele = inject<TemplateRef<unknown>>(TemplateRef);
  private readonly conteneur = inject(ViewContainerRef);
  private readonly auth = inject(AuthService);

  readonly appSeulementPour = input.required<Role[]>();

  constructor() {
    effect(() => {
      const role = this.auth.role();
      const autorises = this.appSeulementPour();

      this.conteneur.clear();

      if (role !== null && autorises.includes(role)) {
        this.conteneur.createEmbeddedView(this.modele);
      }
    });
  }
}
