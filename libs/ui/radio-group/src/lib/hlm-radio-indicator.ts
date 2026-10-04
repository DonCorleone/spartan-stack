import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'hlm-radio-indicator',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'radio-group-indicator',
	},
	template: `
		<div class="size-2 rounded-full bg-transparent group-data-[checked=true]:bg-(--radio-color)"></div>
	`,
})
export class HlmRadioIndicator {
	constructor() {
		classes(
			() =>
				'border-2 border-(--radio-color) relative flex aspect-square size-5 shrink-0 items-center justify-center rounded-full transition-colors outline-none',
		);
	}
}
