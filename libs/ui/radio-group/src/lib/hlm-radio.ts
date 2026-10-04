import { type BooleanInput } from '@angular/cdk/coercion';
import { isPlatformBrowser } from '@angular/common';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	DOCUMENT,
	effect,
	ElementRef,
	inject,
	input,
	output,
	PLATFORM_ID,
	Renderer2,
} from '@angular/core';
import { BrnRadio, BrnRadioGroup, type BrnRadioChange } from '@spartan-ng/brain/radio-group';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';

export type RadioVariant = 'default' | 'primary' | 'secondary' | 'tertiary';

const variantStyles: Record<RadioVariant, string> = {
	default:   '[--radio-color:var(--btn-default)] [--radio-active:var(--btn-default-darker)] [--radio-disabled:var(--btn-default-lighter)]',
	primary:   '[--radio-color:var(--btn-primary)] [--radio-active:var(--btn-primary-darker)] [--radio-disabled:var(--btn-primary-lighter)]',
	secondary: '[--radio-color:var(--btn-secondary)] [--radio-active:var(--btn-secondary-darker)] [--radio-disabled:var(--btn-secondary-lighter)]',
	tertiary:  '[--radio-color:var(--btn-tertiary)] [--radio-active:var(--btn-tertiary-darker)] [--radio-disabled:var(--btn-tertiary-lighter)]',
};

@Component({
	selector: 'hlm-radio',
	imports: [BrnRadio],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[attr.aria-label]': 'null',
		'[attr.aria-labelledby]': 'null',
		'[attr.aria-describedby]': 'null',
		'[attr.data-disabled]': 'disabled() ? "" : null',
		'data-slot': 'radio-group-item',
	},
	template: `
		<brn-radio
			[id]="inputId()"
			[class]="_computedClass()"
			[value]="value()"
			[required]="required()"
			[disabled]="disabled()"
			[attr.aria-invalid]="_ariaInvalid() ? 'true' : null"
			[attr.data-invalid]="_ariaInvalid() ? 'true' : null"
			[attr.data-dirty]="_dirty() ? 'true' : null"
			[attr.data-touched]="_touched() ? 'true' : null"
			[attr.data-matches-spartan-invalid]="_groupSpartanInvalid() ? 'true' : null"
			[aria-label]="ariaLabel()"
			[aria-labelledby]="ariaLabelledby()"
			[aria-describedby]="ariaDescribedby()"
			(change)="change.emit($event)"
		>
			<ng-content select="[target],[indicator],hlm-radio-indicator" indicator />
			<ng-content />
		</brn-radio>
	`,
})
export class HlmRadio<T = unknown> {
	private readonly _document = inject(DOCUMENT);
	private readonly _renderer = inject(Renderer2);
	private readonly _elementRef = inject(ElementRef);
	private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
	private readonly _radioGroup = inject(BrnRadioGroup, { optional: true });

	protected readonly _ariaInvalid = computed(() => this._radioGroup?.controlState?.()?.invalid);
	protected readonly _touched = computed(() => this._radioGroup?.controlState?.()?.touched);
	protected readonly _dirty = computed(() => this._radioGroup?.controlState?.()?.dirty);
	protected readonly _groupSpartanInvalid = computed(() => this._radioGroup?.controlState?.()?.spartanInvalid);
	protected readonly _errorStateClass = computed(() => (this._groupSpartanInvalid() ? 'text-destructive' : ''));

	public readonly variant = input<RadioVariant>('default');
	public readonly userClass = input<ClassValue>('', { alias: 'class' });

	protected readonly _computedClass = computed(() =>
		hlm(
			'group relative flex h-12 w-[250px] cursor-pointer items-center gap-x-3 rounded-lg px-3.5 text-label font-medium text-white transition-colors select-none',
			variantStyles[this.variant()],
			'hover:[--radio-color:var(--radio-active)]',
			'active:[--radio-color:var(--radio-active)]',
			'data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-55 data-[disabled=true]:[--radio-color:var(--radio-disabled)]',
			this.userClass(),
			this._errorStateClass(),
		),
	);

	public readonly inputId = input<string | undefined>(undefined);
	public readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
	public readonly ariaLabelledby = input<string | undefined>(undefined, { alias: 'aria-labelledby' });
	public readonly ariaDescribedby = input<string | undefined>(undefined, { alias: 'aria-describedby' });
	public readonly value = input.required<T>();
	public readonly required = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	// eslint-disable-next-line @angular-eslint/no-output-native
	public readonly change = output<BrnRadioChange<T>>();

	constructor() {
		effect(() => {
			const isDisabled = this.disabled();
			if (!this._elementRef.nativeElement || !this._isBrowser) return;
			const labelElement =
				this._elementRef.nativeElement.closest('label') ??
				this._document.querySelector(`label[for="${this.inputId()}"]`);
			if (!labelElement) return;
			this._renderer.setAttribute(labelElement, 'data-disabled', isDisabled ? 'true' : 'false');
		});
	}
}
