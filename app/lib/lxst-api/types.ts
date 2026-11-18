// Response shapes from LXST.admin's tenant API (/api/v1). Every response is wrapped as { data }.

export type ApiResponse<T> = { data: T };

export type MenuItem = {
    label: string;
    url: string;
    target: string | null;
    rel: string | null;
    class: string | null;
    children: Array<MenuItem>;
};

export type Menu = {
    slug: string;
    name: string;
    items: Array<MenuItem>;
};

export type Site = {
    name: string;
    industry: string | null;
    logo_url: string | null;
    favicon_url: string | null;
    gtm_id: string | null;
    // Keyed by the menu's slug; empty without the CMS module
    menus: Record<string, Menu>;
};

export type CmsImage = {
    url: string;
    alt: string | null;
    name: string;
    mime_type: string | null;
};

export type CmsLink = {
    url: string;
    target: string | null;
};

// Rich text comes back as HTML when pages are fetched with format=html
export type CmsRichText = string;

export type CmsMetadata = {
    title?: string | null;
    description?: string | null;
    og_image: CmsImage | null;
    [field: string]: unknown;
};

export type CmsPage<Content = Record<string, unknown>, LayoutContent = Record<string, unknown>> = {
    type: 'page';
    page: {
        id: number;
        name: string;
        slug: string;
        url: string | null;
        // Picks which page component renders the content
        template: string;
        published_at: string | null;
        updated_at: string | null;
    };
    metadata: CmsMetadata;
    layout: {
        slug: string;
        template: string;
        content: LayoutContent;
    };
    content: Content;
};

export type CmsRedirect = {
    type: 'redirect';
    redirect: {
        from: string;
        to: string;
        status: number;
        permanent: boolean;
    };
};

export type FormField = {
    // The key a submission sends this field's answer under
    key: string;
    label: string;
    type: string;
    required: boolean;
    settings: Record<string, unknown>;
};

export type FormDefinition = {
    slug: string;
    name: string;
    submit_button_text: string | null;
    success_message: string | null;
    redirect_url: string | null;
    fields: Array<FormField>;
    marketing: Array<string>;
    // Only on a direct form fetch: page content leaves it out, as a cached token would go stale
    spam_protection?: {
        honeypot_field: string;
        token_field: string;
        token: string;
        captcha: unknown;
    };
};
