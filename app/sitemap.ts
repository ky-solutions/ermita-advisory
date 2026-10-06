import type {MetadataRoute} from 'next';
import {publicOrigin,routes} from '@/lib/seo';
export default function sitemap():MetadataRoute.Sitemap{const origin=publicOrigin();return origin?routes.map(path=>({url:new URL(path,origin).href})):[]}
