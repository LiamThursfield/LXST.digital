import type { ApiResponse, Site } from '~/lib/lxst-api/types';

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
