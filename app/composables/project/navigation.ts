import type { LinkWithLabel } from '~/components/project/types';

export function useNavigation() {
    const email = 'hello@lxst.digital';

    // Shown in the header; contact is reached through the CTA instead
    const mainLinks: Array<LinkWithLabel> = [
        { label: 'services', href: '/services' },
        { label: 'work', href: '/work' },
        { label: 'about', href: '/about' }
    ];

    const primaryCta: LinkWithLabel = { label: 'start a project', href: '/contact' };

    const sitemapLinks: Array<LinkWithLabel> = [
        { label: 'home', href: '/' },
        ...mainLinks,
        { label: 'contact', href: '/contact' }
    ];

    const elsewhereLinks: Array<LinkWithLabel> = [
        { label: email, href: `mailto:${email}` },
        { label: 'instagram ↗', href: 'https://instagram.com/lxst.digital' }
    ];

    return { email, mainLinks, primaryCta, sitemapLinks, elsewhereLinks };
}
