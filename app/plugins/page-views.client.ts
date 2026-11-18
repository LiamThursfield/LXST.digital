// Records each page visit with LXST.admin for its page view stats. It runs in the browser once the
// page has rendered, so server rendering (and the cached pages) never wait on it, and the API sees
// the visitor's own IP and user agent. LXST.admin drops bots and URLs without a published page.

// The UTM parameters LXST.admin keeps as a view's source
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

// Where the visitor came from, when it's another site; moving around this site isn't a referral
function externalReferrer(): string | null {
    if (!document.referrer) {
        return null;
    }

    try {
        return new URL(document.referrer).host === location.host ? null : document.referrer;
    } catch {
        return null;
    }
}

export default defineNuxtPlugin((nuxtApp) => {
    const { lxstApiBase, lxstRecordPageViews } = useRuntimeConfig().public;

    if (!lxstRecordPageViews) {
        return;
    }

    const router = useRouter();
    let lastPath: string | null = null;
    let isLanding = true;

    // Fires after the first page hydrates and after each client-side navigation
    nuxtApp.hook('page:finish', () => {
        const { path, query } = router.currentRoute.value;

        // A query-only change (e.g. a filter) is still the same page
        if (path === lastPath) {
            return;
        }
        lastPath = path;

        const referrer = isLanding ? externalReferrer() : null;
        isLanding = false;

        const source = Object.fromEntries(
            UTM_KEYS.flatMap((key) => {
                const value = query[key];
                return typeof value === 'string' && value ? [[key, value]] : [];
            })
        );

        const send = () =>
            fetch(`${lxstApiBase}/cms/page-views`, {
                method: 'POST',
                // Lets the request finish if the visitor leaves straight away
                keepalive: true,
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url: path,
                    referrer,
                    source: Object.keys(source).length ? source : null
                })
            }).catch(() => {
                // Stats are best effort; a blocked or failed request doesn't affect the visitor
            });

        // Wait for a quiet moment so it never competes with hydration or the next page
        if ('requestIdleCallback' in window) {
            requestIdleCallback(send, { timeout: 2000 });
        } else {
            setTimeout(send, 0);
        }
    });
});
