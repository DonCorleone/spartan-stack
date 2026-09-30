import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'hlm-radio-indicator',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'radio-group-indicator',
	},
	template: `
		<div class="group-data-[checked=true]:bg-(--btn-default-darker) size-2 rounded-full bg-transparent"></div>
	`,
})
export class HlmRadioIndicator {
	constructor() {
		classes(
			() =>
				'border-2 border-(--btn-default) group-hover:border-(--btn-default-darker) group-data-[checked=true]:border-(--btn-default-darker) group-data-[disabled=true]:border-(--btn-default-lighter) group-data-[disabled=true]:blur-sm relative flex aspect-square size-4 shrink-0 items-center justify-center rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
		);
	}
}
