import { Component } from '@angular/core';

const TYPE_STYLES = [
  {
    label: 'DISPLAY',
    meta: '48px / 56px · Bold',
    sample: 'Design with clarity.',
    class: 'text-display font-bold leading-[3.5rem]',
  },
  {
    label: 'HEADING',
    meta: '32px / 40px · SemiBold',
    sample: 'Typography that scales',
    class: 'text-heading font-semibold leading-[2.5rem]',
  },
  {
    label: 'TITLE',
    meta: '24px / 32px · SemiBold',
    sample: 'A strong visual hierarchy',
    class: 'text-title font-semibold leading-[2rem]',
  },
  {
    label: 'BODY',
    meta: '16px / 24px · Regular',
    sample: 'Clear, comfortable text for interfaces and longer passages.',
    class: 'text-body font-normal leading-[1.5rem]',
  },
  {
    label: 'BODY SMALL',
    meta: '14px / 20px · Regular',
    sample: 'Supporting copy, helper text, and compact descriptions.',
    class: 'text-body-small font-normal leading-[1.25rem]',
  },
  {
    label: 'LABEL',
    meta: '16px / 20px · Medium',
    sample: 'Button label · Navigation · Input label',
    class: 'text-label font-medium leading-[1.25rem]',
  },
  {
    label: 'CAPTION',
    meta: '12px / 16px · Medium',
    sample: 'Metadata · Status · Timestamps',
    class: 'text-caption font-medium leading-[1rem]',
  },
] as const;

@Component({
  selector: 'app-typography-page',
  standalone: true,
  template: `
    <main class="min-h-screen bg-zinc-900 px-16 py-16">
      <h1 class="text-display font-bold leading-[3.5rem] text-white mb-2">Typography</h1>
      <p class="text-body text-zinc-400 mb-6">Type scale, font weights, and line heights.</p>
      <hr class="border-zinc-700 mb-8" />

      <div class="flex flex-col gap-3">
        @for (style of typeStyles; track style.label) {
          <div class="bg-[#3b3b3b] rounded-lg overflow-hidden h-[106px] relative flex items-stretch">
            <div class="w-[286px] shrink-0 flex flex-col justify-center px-6 gap-0.5">
              <span class="text-caption font-medium text-zinc-400 leading-[1rem]">{{ style.label }}</span>
              <span class="text-caption font-medium text-zinc-400 leading-[1rem]">{{ style.meta }}</span>
            </div>
            <div class="flex-1 flex items-center overflow-hidden">
              <p class="{{ style.class }} text-white truncate">{{ style.sample }}</p>
            </div>
          </div>
        }
      </div>

      <p class="text-caption font-medium text-zinc-500 mt-8">
        All styles use Geist — variable font, loaded from npm package.
      </p>
    </main>
  `,
})
export default class TypographyPageComponent {
  readonly typeStyles = TYPE_STYLES;
}
