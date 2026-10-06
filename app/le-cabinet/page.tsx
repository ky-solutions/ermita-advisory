import {Hero,ContactBanner} from '@/components/sections';
import {Container,SectionLabel} from '@/components/ui';
import {approach,cabinetIntro} from '@/content/site';
import {pageMetadata} from '@/lib/seo';
export const metadata=pageMetadata('Le cabinet','Découvrez la démarche d’Ermita Advisory, cabinet parisien d’ingénierie financière et de conseil en management.','/le-cabinet');
export default function Cabinet(){return <><Hero expertise label="Le cabinet" title={<>Le conseil au plus près <span className="accent">de vos enjeux.</span></>} intro={cabinetIntro} cta="Rencontrons-nous"/><Container><section className="section split"><div><SectionLabel>Notre approche</SectionLabel><h2>Notre approche.</h2></div><div className="simple-steps">{approach.map(a=><div key={a.title}><h3>{a.title}</h3><p>{a.text}</p></div>)}</div></section></Container><ContactBanner cta="Rencontrons-nous"/></>}
