import type { LinkWithLabel } from '~/components/project/types';
import type { Project, Service } from '~/composables/project/data';
import { useData } from '~/composables/project/data';
import { useLxstApi } from '~/composables/project/lxst-api';
import type {
    CtaBandComponent,
    ItemRow,
    ProjectRow,
    ServiceRow,
    ServicesTemplate,
    WorkTemplate
} from '~/lib/lxst-api/content';
import type { ApiResponse, CmsLink, CmsPage, CmsRedirect } from '~/lib/lxst-api/types';

// The page (or redirect) LXST.admin has for a URL. Null when there's no published page, or the
// API can't be reached, so the site falls back to the content in the code.
export function useCmsPage<Content>(url: string) {
    const api = useLxstApi();

    return useAsyncData(
        `lxst-page-${url}`,
        () =>
            api<ApiResponse<CmsPage<Content> | CmsRedirect>>('/cms/pages', {
                query: { url, format: 'html' }
            })
                .then((response) => response.data)
                .catch((error) => {
                    if (error?.status !== 404) {
                        console.error(`LXST.admin page "${url}" fetch failed:`, error);
                    }
                    return null;
                }),
        { default: () => null }
    );
}

type Seo = { title: string; description: string };

/**
 * A page's content for its template: from LXST.admin when it has a published page for the URL,
 * otherwise the fallback written in the code. With no fallback, a missing page is a 404.
 * Also follows CMS redirects and sets the SEO tags, preferring the CMS page's metadata.
 */
export async function usePageContent<Content, View>(
    url: string,
    fromCms: (content: Content) => View,
    fallback: { content: View; seo: Seo } | null
) {
    // Nuxt composables only work before the first await, so everything is set up first
    const nuxtApp = useNuxtApp();
    const request = useCmsPage<Content>(url);
    const { data } = request;

    const page = computed(() => (data.value?.type === 'page' ? data.value : null));

    const content = computed(() =>
        page.value ? fromCms(page.value.content) : (fallback as { content: View }).content
    );

    const metadata = computed(() => page.value?.metadata);
    useSeoMeta({
        title: () => metadata.value?.title || fallback?.seo.title || page.value?.page.name,
        description: () => metadata.value?.description || fallback?.seo.description,
        ogImage: () => metadata.value?.og_image?.url
    });

    await request;

    if (data.value?.type === 'redirect') {
        const { to, status } = data.value.redirect;
        await nuxtApp.runWithContext(() =>
            navigateTo(to, { redirectCode: status, external: /^https?:/.test(to) })
        );
    }

    if (!page.value && !fallback) {
        throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
    }

    return content;
}

// Converting CMS values into what the components take

export const lines = (text: string | null | undefined) =>
    (text ?? '')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

export const isExternal = (url: string) => /^(https?:|mailto:)/.test(url);

export const toItem = (row: ItemRow) => ({
    label: row.label,
    title: row.title ?? '',
    text: row.text
});

export const toLink = (label: string | null, link: CmsLink | null): LinkWithLabel | null =>
    label && link ? { label, href: link.url } : null;

export type CtaBandView = { heading: string; cta: LinkWithLabel };

export const toCta = (component: CtaBandComponent, fallback: CtaBandView): CtaBandView =>
    component?.link
        ? { heading: component.heading, cta: { label: component.label, href: component.link.url } }
        : fallback;

export const toService = (row: ServiceRow): Service => ({
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    description: row.description,
    audience: row.audience,
    features: lines(row.features)
});

export const toProject = (row: ProjectRow): Project => {
    const href = row.link?.url ?? '/work';

    return {
        slug: row.slug,
        name: row.name,
        kind: row.kind,
        type: row.type,
        blurb: row.blurb,
        summary: row.summary,
        // Screenshots not yet in the File Manager are looked for in public/images/projects
        image: row.image?.url ?? `/images/projects/${row.slug}-thumbnail.png`,
        href,
        cta: row.cta,
        external: isExternal(href),
        year: row.year ?? undefined,
        stack: row.stack ?? undefined
    };
};

// The services and projects live on the Services and Work pages; the home page shows them too

export async function useServices() {
    const request = useCmsPage<ServicesTemplate>('/services');
    const { services } = useData();

    const list = computed(() => {
        const data = request.data.value;
        return data?.type === 'page' ? data.content.services.map(toService) : services;
    });

    await request;
    return list;
}

export async function useProjects() {
    const request = useCmsPage<WorkTemplate>('/work');
    const { projects } = useData();

    const list = computed(() => {
        const data = request.data.value;
        return data?.type === 'page' ? data.content.projects.map(toProject) : projects;
    });

    await request;
    return list;
}
