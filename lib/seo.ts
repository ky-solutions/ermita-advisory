import type {Metadata} from 'next';
export const routes=['/','/le-cabinet','/expertises/ingenierie-financiere','/expertises/pilotage-et-performance','/expertises/strategie-et-management','/expertises/accompagnement-de-projets','/contact','/mentions-legales','/confidentialite'];
export function publicOrigin(){if(process.env.SITE_INDEXABLE!=='true'||!process.env.SITE_URL)return undefined;try{const url=new URL(process.env.SITE_URL);return url.protocol==='https:'?url.origin:undefined}catch{return undefined}}
export function pageMetadata(title:string,description:string,path:string):Metadata{const origin=publicOrigin();return {title,description,alternates:origin?{canonical:new URL(path,origin).href}:undefined,openGraph:{title,description,url:origin?new URL(path,origin).href:undefined}}}

