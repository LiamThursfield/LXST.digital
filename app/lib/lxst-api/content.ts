// Page content as LXST.admin returns it, keyed by the field slugs of this site's templates.
// The templates live in LXST.admin (CMS › Templates); keep these in step with them.

import type { CmsImage, CmsLink, FormDefinition } from '~/lib/lxst-api/types';

// Repeater rows
export type ItemRow = { label: string; title: string | null; text: string };
export type FactRow = { term: string; value: string };
export type FaqRow = { question: string; answer: string };
export type ServiceRow = {
    slug: string;
    title: string;
    summary: string;
    description: string;
    audience: string;
    // One per line
    features: string;
};
export type ProjectRow = {
    slug: string;
    name: string;
    kind: 'site' | 'app';
    type: string;
    blurb: string;
    summary: string;
    image: CmsImage | null;
    link: CmsLink | null;
    cta: string;
    year: string | null;
    stack: string | null;
};

// Components
export type CtaBandComponent = { heading: string; label: string; link: CmsLink | null } | null;

// Layout
export type SiteLayout = { footer_blurb: string | null };

// Pages, by template slug
export type HomeTemplate = {
    hero_title: string;
    hero_lead: string;
    hero_facts: Array<FactRow>;
    hero_cta_label: string;
    hero_cta_link: CmsLink | null;
    hero_secondary_label: string | null;
    hero_secondary_link: CmsLink | null;
    services_title: string;
    work_title: string;
    process_title: string;
    process_steps: Array<ItemRow>;
    philosophy_title: string;
    philosophy_text: string;
    philosophy_reasons: Array<ItemRow>;
    cta: CtaBandComponent;
};

export type ServicesTemplate = {
    hero_title: string;
    hero_lead: string;
    services: Array<ServiceRow>;
    faq_title: string;
    faqs: Array<FaqRow>;
    cta: CtaBandComponent;
};

export type WorkTemplate = {
    hero_title: string;
    hero_lead: string;
    projects: Array<ProjectRow>;
    cta: CtaBandComponent;
};

export type AboutTemplate = {
    hero_title: string;
    hero_highlight: string | null;
    approach_lead: string;
    approach_text: string;
    person_name: string;
    person_role: string;
    person_bio: string;
    person_photo: CmsImage | null;
    principles_title: string;
    principles: Array<ItemRow>;
    toolbox_title: string;
    // One per line
    toolbox: string;
    cta: CtaBandComponent;
};

export type ContactTemplate = {
    hero_title: string;
    hero_lead: string;
    email_label: string;
    social_label: string | null;
    social_link: CmsLink | null;
    next_steps_title: string;
    next_steps: Array<ItemRow>;
    form: FormDefinition | null;
};

export type CaseStudyTemplate = {
    hero_label: string;
    hero_title: string;
    hero_lead: string;
    facts: Array<FactRow>;
    live_site_label: string | null;
    live_site: CmsLink | null;
    hero_image: CmsImage | null;
    brief: string;
    built: Array<ItemRow>;
    stack: Array<FactRow>;
    quote_text: string | null;
    quote_author: string | null;
    next_project_label: string | null;
    next_project_link: CmsLink | null;
    cta: CtaBandComponent;
};
