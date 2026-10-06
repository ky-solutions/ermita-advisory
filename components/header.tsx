'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useRef,useState} from 'react';
import {BrandLogo,ButtonLink,Container} from './ui';
const links=[['/','Accueil'],['/le-cabinet','Le cabinet'],['/#expertises','Nos expertises'],['/contact','Contact']];
export function Header(){const path=usePathname();const [open,setOpen]=useState(false);const button=useRef<HTMLButtonElement>(null);
useEffect(()=>{function escape(e:KeyboardEvent){if(e.key==='Escape'){setOpen(false);button.current?.focus()}}document.addEventListener('keydown',escape);return()=>document.removeEventListener('keydown',escape)},[]);
const navigation=links.map(([href,label])=><Link key={href} href={href} aria-current={(href==='/'?path===href:href==='/#expertises'?path.startsWith('/expertises/'):path.startsWith(href))?'page':undefined} onClick={()=>setOpen(false)}>{label}</Link>);
return <header className="header"><Container className="header-inner"><BrandLogo/><nav className="desktop-nav" aria-label="Navigation principale">{navigation}</nav><div className="header-cta"><ButtonLink>Parlons de votre projet</ButtonLink></div><button ref={button} className="menu-toggle" aria-label={open?'Fermer le menu':'Ouvrir le menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)}>{open?'✕':<><span/><span/><span/></>}</button></Container><nav id="mobile-navigation" className="mobile-nav" aria-label="Navigation mobile" hidden={!open}>{navigation}<Link href="/contact" onClick={()=>setOpen(false)}>Parlons de votre projet ⟶</Link></nav></header>}

