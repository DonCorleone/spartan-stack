import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';

@Component({
  selector: 'app-analog-welcome',
  standalone: true,
  imports: [FormsModule, HlmButtonImports, HlmRadioGroupImports],
  host: {
    class:
      'flex min-h-screen flex-col text-zinc-900 bg-zinc-50 px-4 pt-8 pb-32',
  },
  template: `
    <main class="flex-1 mx-auto">
        <section class="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">

        <div class="flex flex-col gap-8">
          <div class="flex flex-col gap-4">
            <button hlmBtn variant="default">Default Button</button>
            <button hlmBtn variant="primary">Primary Button</button>
            <button hlmBtn variant="secondary">Secondary Button</button>
            <button hlmBtn variant="tertiary">Tertiary Button</button>
          </div>

          <hlm-radio-group [(ngModel)]="selectedOption">
            <div class="flex items-center gap-3">
              <hlm-radio value="option1" inputId="r1">
                <hlm-radio-indicator indicator />
              </hlm-radio>
              <label for="r1">Option 1</label>
            </div>
            <div class="flex items-center gap-3">
              <hlm-radio value="option2" inputId="r2">
                <hlm-radio-indicator indicator />
              </hlm-radio>
              <label for="r2">Option 2</label>
            </div>
            <div class="flex items-center gap-3">
              <hlm-radio value="option3" inputId="r3" [disabled]="true">
                <hlm-radio-indicator indicator />
              </hlm-radio>
              <label for="r3">Option 3 (disabled)</label>
            </div>
          </hlm-radio-group>
        </div>

      </section>
    </main>
  `,
})
export class AnalogWelcomeComponent {
  public selectedOption = 'option1';
}
