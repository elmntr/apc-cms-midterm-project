const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

export interface PhotoCategory {
  id: number;
  documentId: string;
  caption: string;
  section: 'childhood' | 'college';
  date?: string;
  order: number;
  photos: StrapiMedia[];
  descriptions?: { [key: string]: string };
}

export interface Hobby {
  id: number;
  documentId: string;
  name: string;
  icon: string;
  description?: string;
  order: number;
}

export interface SiteSettings {
  id: number;
  documentId: string;
  heroHeading: string;
  gapQuote: string;
  grade6Photo?: StrapiMedia;
  collegePhoto?: StrapiMedia;
  grade6Label: string;
  collegeLabel: string;
  linkedinUrl?: string;
  footerTagline: string;
}

// Helper to get full media URL
export function getMediaUrl(media: StrapiMedia | undefined): string {
  if (!media?.url) return '';
  if (media.url.startsWith('http')) return media.url;
  return `${STRAPI_URL}${media.url}`;
}

// Fetch photo categories by section
export async function getPhotoCategories(section?: 'childhood' | 'college'): Promise<PhotoCategory[]> {
  try {
    let url = `${STRAPI_URL}/api/photo-categories?populate=photos&sort=order:asc`;
    if (section) {
      url += `&filters[section][$eq]=${section}`;
    }
    
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    
    const json: StrapiResponse<PhotoCategory[]> = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Failed to fetch photo categories:', error);
    return [];
  }
}

// Fetch hobbies
export async function getHobbies(): Promise<Hobby[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/hobbies?sort=order:asc`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    
    const json: StrapiResponse<Hobby[]> = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Failed to fetch hobbies:', error);
    return [];
  }
}

// Fetch site settings
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/site-setting?populate=*`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    
    const json: StrapiResponse<SiteSettings> = await res.json();
    return json.data || null;
  } catch (error) {
    console.error('Failed to fetch site settings:', error);
    return null;
  }
}
