import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';
import { HlmComboboxImports } from '@spartan-ng/helm/combobox';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';

@Component({
  selector: 'app-analog-welcome',
  standalone: true,
  imports: [FormsModule, HlmButtonImports, HlmCheckboxImports, HlmRadioGroupImports, HlmComboboxImports, HlmInputGroupImports],
  host: {
    class:
      'flex min-h-screen flex-col bg-background text-foreground px-4 pt-8 pb-32',
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

          <div class="flex flex-col gap-2">
            <hlm-checkbox variant="default">Default checkbox</hlm-checkbox>
            <hlm-checkbox variant="primary" [(status)]="checkedStatus">Primary (checked)</hlm-checkbox>
            <hlm-checkbox variant="secondary" [(status)]="indeterminateStatus">Secondary (indeterminate)</hlm-checkbox>
            <hlm-checkbox variant="tertiary">Tertiary checkbox</hlm-checkbox>
            <hlm-checkbox variant="default" [disabled]="true">Disabled checkbox</hlm-checkbox>
          </div>

          <hlm-radio-group [(ngModel)]="selectedOption" class="gap-2">
            <hlm-radio value="option1" inputId="r1" variant="default">
              <hlm-radio-indicator indicator />
              Option 1
            </hlm-radio>
            <hlm-radio value="option2" inputId="r2" variant="primary">
              <hlm-radio-indicator indicator />
              Option 2
            </hlm-radio>
            <hlm-radio value="option3" inputId="r3" variant="secondary">
              <hlm-radio-indicator indicator />
              Option 3
            </hlm-radio>
            <hlm-radio value="option4" inputId="r4" variant="tertiary">
              <hlm-radio-indicator indicator />
              Option 4
            </hlm-radio>
            <hlm-radio value="option5" inputId="r5" variant="default" [disabled]="true">
              <hlm-radio-indicator indicator />
              Disabled
            </hlm-radio>
          </hlm-radio-group>
        </div>
        <div class="flex flex-col gap-2">
          <hlm-combobox>
            <hlm-combobox-input placeholder="Select a framework" />
            <hlm-combobox-content *hlmComboboxPortal>
              <hlm-combobox-empty>No items found.</hlm-combobox-empty>
              <div hlmComboboxList>
                @for (framework of frameworks; track $index) {
                  <hlm-combobox-item [value]="framework">{{ framework.label }}</hlm-combobox-item>
                }
              </div>
            </hlm-combobox-content>
          </hlm-combobox>
        </div>
      </section>
    </main>
  `,
})
export class AnalogWelcomeComponent {
  public selectedOption = 'option1';
  public checkedStatus: 'unchecked' | 'checked' | 'indeterminate' = 'checked';
  public indeterminateStatus: 'unchecked' | 'checked' | 'indeterminate' = 'indeterminate';

  	public frameworks = [
		{
			label: 'AnalogJs',
			value: 'analogjs',
		},
		{
			label: 'Angular',
			value: 'angular',
		},
		{
			label: 'Vue',
			value: 'vue',
		},
		{
			label: 'Nuxt',
			value: 'nuxt',
		},
		{
			label: 'React',
			value: 'react',
		},
		{
			label: 'NextJs',
			value: 'nextjs',
		},
	];
}
