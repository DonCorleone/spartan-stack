import { Directive, input, signal } from '@angular/core';
import { BrnButton } from '@spartan-ng/brain/button';
import { classes } from '@spartan-ng/helm/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ClassValue } from 'clsx';
import { injectBrnButtonConfig } from './hlm-button.token';

export const buttonVariants = cva(
	"focus-visible:ring-2 focus-visible:ring-ring/50 inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-colors outline-none select-none data-disabled:pointer-events-none data-disabled:blur-sm rounded-none font-medium",
	{
		variants: {
			variant: {
				default: 'bg-(--btn-default) text-black hover:bg-(--btn-default-darker) active:bg-(--btn-default-darker) active:border-2 active:border-black data-disabled:bg-(--btn-default-lighter)',
				primary: 'bg-(--btn-primary) text-black hover:bg-(--btn-primary-darker) active:bg-(--btn-primary-darker) active:border-2 active:border-black data-disabled:bg-(--btn-primary-lighter)',
				secondary: 'bg-(--btn-secondary) text-black hover:bg-(--btn-secondary-darker) active:bg-(--btn-secondary-darker) active:border-2 active:border-black data-disabled:bg-(--btn-secondary-lighter)',
				tertiary: 'bg-(--btn-tertiary) text-white hover:bg-(--btn-tertiary-darker) active:bg-(--btn-tertiary-darker) active:border-2 active:border-black data-disabled:bg-(--btn-tertiary-lighter) data-disabled:text-black',
				ghost: 'bg-transparent text-white hover:bg-white/10 active:bg-white/15 data-disabled:bg-transparent data-disabled:opacity-40',
			},
			size: {
				default: 'h-16.25 w-54.5 text-base',
				sm: 'h-12 w-40 text-sm',
				lg: 'h-18 w-65 text-lg',
				icon: 'size-16.25',
				'icon-xs': 'size-12',

			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

@Directive({
	selector: 'button[hlmBtn], a[hlmBtn]',
	exportAs: 'hlmBtn',
	hostDirectives: [{ directive: BrnButton, inputs: ['disabled'] }],
	host: { 'data-slot': 'button' },
})
export class HlmButton {
	private readonly _config = injectBrnButtonConfig();

	private readonly _additionalClasses = signal<ClassValue>('');

	public readonly variant = input<ButtonVariants['variant']>(this._config.variant);

	public readonly size = input<ButtonVariants['size']>(this._config.size);

	constructor() {
		classes(() => [buttonVariants({ variant: this.variant(), size: this.size() }), this._additionalClasses()]);
	}

	setClass(classes: string): void {
		this._additionalClasses.set(classes);
	}
}
