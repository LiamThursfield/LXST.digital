import type { ApiResponse, FormDefinition, Site } from '~/lib/lxst-api/types';

// A $fetch for LXST.admin's tenant API; the tenant is identified by the API's domain
export function useLxstApi() {
    const { lxstApiBase } = useRuntimeConfig().public;

    return $fetch.create({ baseURL: lxstApiBase, headers: { Accept: 'application/json' } });
}

// Site-wide data (name, branding, menus). Null if the API can't be reached, so callers fall back
// to what's in the code rather than the whole site going down with the CMS.
export function useSite() {
    const api = useLxstApi();

    return useAsyncData(
        'lxst-site',
        () =>
            api<ApiResponse<Site>>('/site')
                .then((response) => response.data)
                .catch((error) => {
                    console.error('LXST.admin site fetch failed:', error);
                    return null;
                }),
        { default: () => null }
    );
}

// A CRM form's definition and a way to submit it. Null if the form can't be loaded.
export function useCrmForm(slug: string) {
    const api = useLxstApi();

    const { data: form, status } = useAsyncData(
        `lxst-form-${slug}`,
        () =>
            api<ApiResponse<FormDefinition>>(`/crm/forms/${slug}`)
                .then((response) => response.data)
                .catch((error) => {
                    console.error(`LXST.admin form "${slug}" fetch failed:`, error);
                    return null;
                }),
        { default: () => null }
    );

    // The spam token in a server-rendered (and maybe cached) page could be stale, so get a fresh one.
    // Answers are kept by the caller, so swapping the definition doesn't lose what's been typed.
    onMounted(async () => {
        const fresh = await api<ApiResponse<FormDefinition>>(`/crm/forms/${slug}`).catch(
            () => null
        );
        if (fresh) {
            form.value = fresh.data;
        }
    });

    // Pass the rendered honeypot's value in `answers` under its field name, so bots that fill it get caught
    const submit = (answers: Record<string, unknown>) => {
        const spam = form.value?.spam_protection;

        return api(`/crm/forms/${slug}/submissions`, {
            method: 'POST',
            body: spam
                ? { [spam.honeypot_field]: '', ...answers, [spam.token_field]: spam.token }
                : answers
        });
    };

    return { form, status, submit };
}
