import {notFound} from 'next/navigation';
import Link from 'next/link';
import {expertises} from '@/content/site';
import {Hero,ProcessSection,ContactBanner} from '@/components/sections';
import {Container,SectionLabel,Arrow} from '@/components/ui';
import {pageMetadata} from '@/lib/seo';
export const dynamicParams=false;
export function generateStaticParams(){return expertises.map(({slug})=>({slug}))}
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props){const {slug}=await params;const e=expertises.find(e=>e.slug===slug);return e?pageMetadata(e.name,e.description,`/expertises/${slug}`):{title:'Expertise introuvable'}}
export default async function ExpertisePage({params}:Props){const {slug}=await params;const e=expertises.find(e=>e.slug===slug);if(!e)notFound();const words=e.title.split(' ');const last=words.splice(-3).join(' ');return <><Hero expertise label={e.name} title={<>{words.join(' ')} <span className="accent">{last}</span></>} intro={e.intro} cta={e.cta} breadcrumbs={<nav className="breadcrumbs" aria-label="Fil d’Ariane"><Link href="/">Accueil</Link><span aria-hidden="true">/</span><Link href="/#expertises">Nos expertises</Link><span aria-hidden="true">/</span><span aria-current="page">{e.name}</span></nav>}/><Container><section className="section split"><div><SectionLabel>Notre accompagnement</SectionLabel><h2>Un accompagnement<br/>adapté à vos enjeux.</h2></div><ol className="numbered-list">{e.services.map((s,i)=><li key={s}><span className="number">0{i+1}</span><span>{s}</span></li>)}</ol></section></Container><section className="section dark"><Container><SectionLabel>Nos livrables</SectionLabel><h2>Des livrables pour avancer.</h2><p className="mt-6">Les livrables sont indicatifs et dépendent du périmètre convenu.</p><div className="deliverables">{e.deliverables.map((s,i)=><div key={s}><span className="number accent">0{i+1}</span><h3>{s}</h3></div>)}</div></Container></section><ProcessSection dark={false} steps={e.steps.map(title=>({title}))}/><Container><section className="section ruled"><SectionLabel>Découvrez aussi</SectionLabel><div className="related">{expertises.filter(x=>x.slug!==slug).map(x=><Link key={x.slug} href={`/expertises/${x.slug}`}>{x.name}<Arrow/></Link>)}</div></section></Container><ContactBanner/></>}

