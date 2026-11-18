import type { LinkWithLabel } from '~/components/project/types';
import type { Menu } from '~/lib/lxst-api/types';
import { useSite } from '~/composables/project/lxst-api';

// LXST.admin menu slugs. A header item with the `cta` class becomes the button.
const MENUS = { header: 'header', footer: 'footer', elsewhere: 'elsewhere' };
const CTA_CLASS = 'cta';

const toLink = (item: Menu['items'][number]): LinkWithLabel => ({
    label: item.label,
    href: item.url
});

export function useNavigation() {
    const email = 'hello@lxst.digital';

    // Used until (or whenever) the CMS menus are missing
    const fallback = {
        mainLinks: [
            { label: 'services', href: '/services' },
            { label: 'work', href: '/work' },
            { label: 'about', href: '/about' }
        ],
        primaryCta: { label: 'start a project', href: '/contact' },
        elsewhereLinks: [
            { label: email, href: `mailto:${email}` },
            { label: 'instagram ↗', href: 'https://instagram.com/lxst.digital' }
        ]
    } satisfies Record<string, Array<LinkWithLabel> | LinkWithLabel>;

    const { data: site } = useSite();
    const menu = (slug: string) => site.value?.menus[slug];

    // Shown in the header; contact is reached through the CTA instead
    const mainLinks = computed<Array<LinkWithLabel>>(() => {
        const items = menu(MENUS.header)?.items.filter((item) => item.class !== CTA_CLASS);
        return items?.length ? items.map(toLink) : fallback.mainLinks;
    });

    const primaryCta = computed<LinkWithLabel>(() => {
        const item = menu(MENUS.header)?.items.find((item) => item.class === CTA_CLASS);
        return item ? toLink(item) : fallback.primaryCta;
    });

    const sitemapLinks = computed<Array<LinkWithLabel>>(() => {
        const items = menu(MENUS.footer)?.items;
        return items?.length
            ? items.map(toLink)
            : [
                  { label: 'home', href: '/' },
                  ...mainLinks.value,
                  { label: 'contact', href: '/contact' }
              ];
    });

    const elsewhereLinks = computed<Array<LinkWithLabel>>(() => {
        const items = menu(MENUS.elsewhere)?.items;
        return items?.length ? items.map(toLink) : fallback.elsewhereLinks;
    });

    return { email, mainLinks, primaryCta, sitemapLinks, elsewhereLinks };
}
