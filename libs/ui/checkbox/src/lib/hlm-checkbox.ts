import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	forwardRef,
	input,
	model,
	signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { hlm } from '@spartan-ng/helm/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

export type CheckboxStatus = 'unchecked' | 'checked' | 'indeterminate';
export type CheckboxVariant = 'default' | 'primary' | 'secondary' | 'tertiary';

export const checkboxVariants = cva(
	'relative flex h-12 w-[250px] cursor-pointer items-center select-none transition-colors',
	{
		variants: {
			variant: {
				default: '[--chk-color:var(--btn-default)] [--chk-active:var(--btn-default-darker)] [--chk-disabled:var(--btn-default-lighter)]',
				primary: '[--chk-color:var(--btn-primary)] [--chk-active:var(--btn-primary-darker)] [--chk-disabled:var(--btn-primary-lighter)]',
				secondary: '[--chk-color:var(--btn-secondary)] [--chk-active:var(--btn-secondary-darker)] [--chk-disabled:var(--btn-secondary-lighter)]',
				tertiary: '[--chk-color:var(--btn-tertiary)] [--chk-active:var(--btn-tertiary-darker)] [--chk-disabled:var(--btn-tertiary-lighter)]',
			},
		},
		defaultVariants: { variant: 'default' },
	},
);

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;

@Component({
	selector: 'hlm-checkbox',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => HlmCheckbox),
			multi: true,
		},
	],
	host: {
		'[class]': '_hostClass()',
		'[attr.data-disabled]': 'disabled() ? "" : null',
		'(click)': '_handleClick()',
		'(mouseenter)': '_hovered.set(true)',
		'(mouseleave)': '_hovered.set(false)',
		'(mousedown)': '_pressed.set(true)',
		'(mouseup)': '_pressed.set(false)',
	},
	template: `
		<span class="relative shrink-0 size-5 rounded-[4px] border-2 transition-colors"
			[style.border-color]="_boxBorderColor()"
			[style.background-color]="_isCheckedOrIndeterminate() ? 'var(--chk-color)' : 'transparent'"
			[style.border-width]="_pressed() && !disabled() ? '3px' : '2px'">
			@if (status() === 'checked') {
				<img src="/icons/checkbox-check.svg" alt="" class="absolute inset-0 block size-full" />
			}
			@if (status() === 'indeterminate') {
				<img src="/icons/checkbox-indeterminate.svg" alt="" class="absolute inset-0 block size-full" />
			}
		</span>
		<span class="ml-3 text-label font-medium leading-5 text-white">
			<ng-content />
		</span>
		<input
			type="checkbox"
			class="sr-only"
			[id]="inputId()"
			[disabled]="disabled()"
			[checked]="status() === 'checked'"
			[indeterminate]="status() === 'indeterminate'"
			[attr.aria-label]="ariaLabel()"
			[attr.aria-labelledby]="ariaLabelledby()"
		/>
	`,
})
export class HlmCheckbox implements ControlValueAccessor {
	public readonly variant = input<CheckboxVariant>('default');
	public readonly disabled = input<boolean, boolean | string>(false, { transform: booleanAttribute });
	public readonly inputId = input<string | undefined>(undefined);
	public readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
	public readonly ariaLabelledby = input<string | undefined>(undefined, { alias: 'aria-labelledby' });
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	public readonly status = model<CheckboxStatus>('unchecked');

	protected readonly _hovered = signal(false);
	protected readonly _pressed = signal(false);

	protected readonly _isCheckedOrIndeterminate = computed(
		() => this.status() === 'checked' || this.status() === 'indeterminate',
	);

	protected readonly _boxBorderColor = computed(() => {
		if (this.disabled()) return 'var(--chk-disabled)';
		if (this._pressed()) return 'var(--chk-active)';
		if (this._hovered()) return 'var(--chk-active)';
		return 'var(--chk-color)';
	});

	protected readonly _hostClass = computed(() =>
		hlm(
			checkboxVariants({ variant: this.variant() }),
			this.disabled() ? 'opacity-55 cursor-not-allowed pointer-events-none' : '',
			this.userClass(),
		),
	);

	protected _handleClick(): void {
		if (this.disabled()) return;
		const next: CheckboxStatus = this.status() === 'checked' ? 'unchecked' : 'checked';
		this.status.set(next);
		this._onChange(next === 'checked');
		this._onTouched();
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private _onChange: (value: boolean) => void = (_: boolean) => {};
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private _onTouched: () => void = () => { return; };

	writeValue(value: boolean | null): void {
		this.status.set(value ? 'checked' : 'unchecked');
	}

	registerOnChange(fn: (value: boolean) => void): void {
		this._onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this._onTouched = fn;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setDisabledState(__: boolean): void { return; }
}
