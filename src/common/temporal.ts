import * as TemporalPolyfill from '@js-temporal/polyfill';

declare global {
    interface Window {
        Temporal: typeof TemporalPolyfill.Temporal;
        Intl: typeof TemporalPolyfill.Intl;
    }

    interface globalThis {
        Temporal: typeof TemporalPolyfill.Temporal;
        Intl: typeof TemporalPolyfill.Intl;
    }

    interface Date {
        toTemporalInstant: typeof TemporalPolyfill.toTemporalInstant;
    }

    let Temporal: typeof TemporalPolyfill.Temporal
}

Date.prototype.toTemporalInstant = TemporalPolyfill.toTemporalInstant;
if (typeof Window !== 'undefined') {
    Window.prototype.Temporal = TemporalPolyfill.Temporal;
    Window.prototype.Intl = TemporalPolyfill.Intl;
} else {
    const g = (global || globalThis) as unknown as Window;
    g.Temporal = TemporalPolyfill.Temporal;
    g.Intl = TemporalPolyfill.Intl;
}
