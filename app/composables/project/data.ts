export type Service = {
    slug: string;
    title: string;
    /** One line for the home page index */
    summary: string;
    description: string;
    audience: string;
    features: Array<string>;
    /** Optional mono key/value lines, e.g. timeline or pricing. Hidden when empty. */
    meta?: Array<{ term: string; value: string }>;
};

export type Project = {
    slug: string;
    name: string;
    kind: 'site' | 'app';
    type: string;
    blurb: string;
    /** Shorter blurb for small cards */
    summary: string;
    image: string;
    href: string;
    cta: string;
    /** Internal case study page; external links open in a new tab */
    external: boolean;
    year?: string;
    stack?: string;
};

export function useData() {
    const services: Array<Service> = [
        {
            slug: 'websites',
            title: 'bespoke websites & platforms',
            summary:
                'Custom-coded sites with a CMS you can actually use. Pubs, clubs, barbers, electricians, DJs, artists.',
            description:
                'Forget generic builders. We build your site on real code and connect it to a CMS and CRM, so you get full control over your content without giving up design or speed.',
            audience:
                'Good for pubs and clubs, barbers, electricians and other trades, DJs and artists.',
            features: [
                'Custom CMS integration',
                'High-performance SEO',
                'Premium animation & interaction'
            ]
        },
        {
            slug: 'web-apps',
            title: 'custom web applications',
            summary:
                'Internal dashboards and customer-facing SaaS that take the busywork off your plate.',
            description:
                "From internal dashboards to customer-facing SaaS. We engineer web apps that automate the repetitive parts of your week and solve the problems off-the-shelf software can't.",
            audience: 'Good for teams running on spreadsheets, and founders with a product idea.',
            features: ['Complex data management', 'User auth & permissions', 'API integration']
        },
        {
            slug: 'mobile-apps',
            title: 'mobile apps',
            summary:
                'iOS and Android apps in React Native, sharing a backend with your web platform.',
            description:
                'iOS and Android apps built in React Native, running on the same Laravel backend as your website or web app, so your data lives in one place.',
            audience: 'Good for businesses whose customers live on their phones.',
            features: [
                'One codebase for iOS & Android',
                'Shared API with your web platform',
                'App Store & Play Store submission'
            ]
        },
        {
            slug: 'consultancy',
            title: 'technical consultancy & support',
            summary:
                'Upgrades, audits and new features for existing Nuxt, Vue and Laravel projects.',
            description:
                "Already have a project? We look after existing Nuxt, Vue and Laravel codebases, whether that's a version upgrade, a performance audit or the feature your last developer never got to.",
            audience: 'Good for inherited projects and sites that have slowed down over time.',
            features: [
                'Code audits & refactoring',
                'Performance optimisation',
                'Cloud infrastructure (AWS / Cloudflare)'
            ]
        }
    ];

    const projects: Array<Project> = [
        {
            slug: 'thursfields-barbers',
            name: 'thursfields barbers',
            kind: 'site',
            type: 'bespoke website',
            blurb: 'A premium brand experience for a modern barbershop, with a custom CMS so the team can manage content without a developer.',
            summary:
                'A premium brand experience for a modern barbershop, with a custom CMS so the team can update prices, staff and photos themselves.',
            image: '/images/projects/thursfields-barbers-thumbnail.png',
            href: '/work/thursfields-barbers',
            cta: 'read the case study →',
            external: false
        },
        {
            slug: 'dj-tag-generator',
            name: 'dj tag generator',
            kind: 'app',
            type: 'web application',
            blurb: 'An automated tool for artists and DJs to create and manage their audio tags using AI voice synthesis.',
            summary: 'Artists and DJs create and manage their audio tags with AI voice synthesis.',
            image: '/images/projects/dj-tag-generator-thumbnail.png',
            href: 'https://dj-tag-generator.lxst.digital/?utm_source=lxst.digital',
            cta: 'try it ↗',
            external: true
        },
        {
            slug: 'moss-and-field',
            name: 'moss & field',
            kind: 'site',
            type: 'bespoke website',
            blurb: 'A home for a DJ duo: upcoming events, a press kit and booking enquiries, all kept up to date by the duo themselves.',
            summary: 'Events, press kit and booking for a DJ duo, all in one place.',
            image: '/images/projects/moss-and-field-thumbnail.png',
            href: 'https://mossandfield.co.uk/?utm_source=lxst.digital',
            cta: 'visit the site ↗',
            external: true
        }
    ];

    return { projects, services };
}
