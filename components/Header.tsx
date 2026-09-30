import Link from 'next/link';
export default function Header() {
  return <header className="site-header"><Link href="/" className="brand"><span className="brand-mark">✳</span><span>НАСЛЕДИЕ<small>КАБАРДИНСКИЕ ГОЛОВНЫЕ УБОРЫ</small></span></Link><nav aria-label="Основная навигация"><Link href="/#collection">Коллекция</Link><Link href="/#heritage">О традиции <span>↗</span></Link></nav></header>;
}
