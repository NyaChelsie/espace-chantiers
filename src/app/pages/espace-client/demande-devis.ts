import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeTravaux } from '../../models/chantier.model';
import { ChantierService } from '../../services/chantier.service';
import { DevisService } from '../../services/devis.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-demande-devis',
  template: `
    <h2 class="text-xl font-semibold">Demande de devis</h2>

    <form class="mt-4 max-w-lg space-y-4" (submit)="envoyer($event)">
      <div>
        <label for="type" class="block font-medium">Type de travaux</label>
        <select
          id="type"
          #selType
          class="w-full rounded border px-2 py-1"
          (change)="changerType(selType.value)"
        >
          @for (t of types; track t) {
            <option [value]="t" [selected]="t === type()">{{ t }}</option>
          }
        </select>
      </div>

      <div>
        <label for="description" class="block font-medium">Description</label>
        <textarea
          id="description"
          #zone
          rows="4"
          class="w-full rounded border px-2 py-1"
          [value]="description()"
          (input)="changerDescription(zone.value)"
        ></textarea>
      </div>

      <div>
        <label for="budget" class="block font-medium">Budget estimé (FCFA)</label>
        <input
          id="budget"
          #champBudget
          type="number"
          min="1"
          class="w-full rounded border px-2 py-1"
          [value]="budget() ?? ''"
          (input)="changerBudget(champBudget.value)"
        />
      </div>

      <div>
        <label for="ref" class="block font-medium">Chantier de référence (facultatif)</label>
        <select
          id="ref"
          #selRef
          class="w-full rounded border px-2 py-1"
          (change)="changerReference(selRef.value)"
        >
          <option value="">Aucun</option>
          @for (c of chantiers(); track c.numero) {
            <option [value]="c.numero" [selected]="c.numero === chantierRef()">
              n° {{ c.numero }} · {{ c.titre }}
            </option>
          }
        </select>
      </div>

      <button
        type="submit"
        class="rounded bg-slate-800 px-4 py-2 text-white disabled:opacity-40"
        [disabled]="!valide()"
      >
        Envoyer la demande
      </button>
    </form>
  `,
})
export class DemandeDevisPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(ChantierService);
  private readonly devis = inject(DevisService);
  private readonly notification = inject(NotificationService);

  readonly types: TypeTravaux[] = ['Gros œuvre', 'Finition', 'Rénovation', 'Génie civil'];
  readonly chantiers = toSignal(this.service.lister(), { initialValue: [] });

  readonly type = signal<TypeTravaux>('Gros œuvre');
  readonly description = signal('');
  readonly budget = signal<number | null>(null);
  readonly chantierRef = signal<number | null>(this.lireReference());

  private readonly modifie = signal(false);

  readonly valide = computed(
    () => this.description().trim() !== '' && (this.budget() ?? 0) > 0,
  );

  // Méthode publique interrogée par sortieFormulaireGuard
  aDesModifications(): boolean {
    return this.modifie();
  }

  changerType(valeur: string): void {
    const trouve = this.types.find((t) => t === valeur);
    if (trouve) {
      this.type.set(trouve);
      this.modifie.set(true);
    }
  }

  changerDescription(valeur: string): void {
    this.description.set(valeur);
    this.modifie.set(true);
  }

  changerBudget(valeur: string): void {
    this.budget.set(valeur === '' ? null : Number(valeur));
    this.modifie.set(true);
  }

  changerReference(valeur: string): void {
    this.chantierRef.set(valeur === '' ? null : Number(valeur));
    this.modifie.set(true);
  }

  envoyer(evenement: Event): void {
    evenement.preventDefault();
    if (!this.valide()) {
      return;
    }

    const reference = this.chantierRef();
    this.devis.ajouter({
      type: this.type(),
      description: this.description().trim(),
      budgetEstime: this.budget() ?? 0,
      ...(reference !== null ? { chantierRef: reference } : {}),
    });

    this.notification.afficher('Votre demande de devis a été envoyée', 'succès');

    // On remet « modifié » à zéro AVANT de naviguer, sinon le guard demanderait confirmation
    this.modifie.set(false);
    this.router.navigate(['..', 'suivi'], { relativeTo: this.route });
  }

  // Snapshot légitime : le composant est recréé à chaque visite de l'onglet
  private lireReference(): number | null {
    const brut = this.route.snapshot.queryParamMap.get('chantier');
    const numero = Number(brut);
    if (brut !== null && Number.isInteger(numero) && numero >= 1 && numero <= this.service.compter()) {
      return numero;
    }
    return null;
  }
}
