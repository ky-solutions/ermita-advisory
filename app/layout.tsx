import type {Metadata} from 'next';
import localFont from 'next/font/local';
import {Header} from '@/components/header';
import {MotionEnhancements} from '@/components/motion';
import {Footer} from '@/components/sections';
import './globals.css';
import {publicOrigin} from '@/lib/seo';
const spaceGrotesk=localFont({src:'../public/fonts/SpaceGrotesk-Variable.ttf',variable:'--font-space-grotesk',display:'swap',weight:'300 700',fallback:['Arial']});
const poppins=localFont({src:'../public/fonts/Poppins-Regular.ttf',variable:'--font-poppins',display:'swap',weight:'400',fallback:['Arial']});
export const metadata:Metadata={metadataBase:new URL(publicOrigin()||'http://localhost:3000'),title:{default:'Ermita Advisory | Ingénierie financière & conseil en management',template:'%s | Ermita Advisory'},description:'Découvrez Ermita Advisory : ingénierie financière, pilotage de la performance, stratégie et accompagnement de projets.',robots:{index:Boolean(publicOrigin()),follow:Boolean(publicOrigin())},icons:{icon:'/brand/favicon.svg'},openGraph:{locale:'fr_FR',type:'website',siteName:'Ermita Advisory',images:[{url:'/images/hero-facade.webp',alt:'Architecture parisienne — illustration'}]}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body className={`${spaceGrotesk.variable} ${poppins.variable}`}><a className="skip-link" href="#contenu">Aller au contenu</a><Header/><MotionEnhancements/><main id="contenu">{children}</main><Footer/></body></html>}


