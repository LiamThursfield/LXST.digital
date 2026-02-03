import { ref } from 'vue';

export function useData() {
    const projects = ref([
        {
            title: 'Thursfields Barbers',
            type: 'Bespoke Website',
            description:
                'A premium brand experience for a modern barbershop. Fully integrated with a custom CMS for easy content management.',
            image: '/images/projects/thursfields-barbers-thumbnail.png',
            link: 'https://thursfieldsbarbers.com/?utm_source=lxst.digital'
        },
        {
            title: 'DJ Tag Generator',
            type: 'Web Application',
            description:
                'An automated tool for artists & DJs to manage and generate audio tags using AI-powered voice synthesis.',
            image: '/images/projects/dj-tag-generator-thumbnail.png',
            link: 'https://dj-tag-generator.lxst.digital/?utm_source=lxst.digital'
        },
        {
            title: 'Moss & Field',
            type: 'Bespoke Website',
            description:
                'A dynamic digital presence for a DJ duo. Designed to promote upcoming events, a press-kit, and seamless booking management.',
            image: '',
            link: 'https://mossandfield.co.uk/?utm_source=lxst.digital'
        }
    ]);

    const services = ref([
        {
            title: 'Bespoke Websites',
            description:
                'We create custom-coded websites integrated with powerful CMS and CRM tools. Perfect for hospitality (Pubs/Clubs), service industries (Barbers/Electricians), and creatives (DJs/Artists).',
            icon: 'streamline-plump:browser-website-1-remix'
        },
        {
            title: 'Web Applications',
            description:
                'From internal dashboards to customer-facing SaaS products. We engineer robust web applications that automate workflows and solve complex business problems.',
            icon: 'streamline-plump:application-add-solid'
        },
        {
            title: 'Tech Consultancy',
            description:
                'Expert maintenance for existing Nuxt, Vue, and Laravel projects. We handle upgrades, performance optimization, and feature development for your legacy code.',
            icon: 'streamline-plump:chat-bubble-oval-notification-remix'
        }
    ]);

    return { projects, services };
}
