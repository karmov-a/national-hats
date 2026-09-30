import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import { products, collectionImage } from '@/lib/catalog';

export default function HomePage() {
  return <><Header /><main>
    <section className="hero">
      <div className="hero-copy"><p className="eyebrow"><span /> КУЛЬТУРА В КАЖДОЙ ДЕТАЛИ</p><h1>Традиция,<br />которую<br /><em>носят с гордостью.</em></h1><p className="intro">Кабардинские головные уборы.<br />Сдержанная красота. Особый характер.<br />Связь с тем, что нам дорого.</p><a className="primary-link" href="#collection">Смотреть коллекцию <span>↗</span></a><div className="hero-note"><span>01 — 06</span><span>Шесть оттенков.<br />Одна история.</span></div></div>
      <div className="hero-visual"><Image src={collectionImage} alt="Коллекция из шести кабардинских папах разных оттенков" fill priority sizes="(max-width: 760px) 100vw, 55vw" /><div className="photo-label"><span>КОРНИ. ХАРАКТЕР. НАСЛЕДИЕ.</span><span>✳</span></div></div>
    </section>
    <div className="ribbon"><span>КАБАРДИНСКИЕ ГОЛОВНЫЕ УБОРЫ</span><i>✳</i><span>КРАСОТА В ДЕТАЛЯХ</span><i>✳</i><span>ПРОДОЛЖЕНИЕ ТРАДИЦИИ</span><i>✳</i></div>
    <section className="collection section-wrap" id="collection"><div className="section-heading"><div><p className="eyebrow">01 / КОЛЛЕКЦИЯ</p><h2>Выберите свой характер</h2></div><p>Лаконичная форма, выразительная фактура.<br />Рассмотрите каждый головной убор ближе.</p></div><div className="product-grid">{products.map((p,i)=><Link className="product-card" href={`/hat/${p.id}`} key={p.id}><div className="product-photo"><Image src={p.image} alt={`Кабардинская папаха — ${p.name}`} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" /><span className="product-number">0{i+1}</span><span className="view-product">Рассмотреть <span>↗</span></span></div><div className="product-title"><div><p className="product-type">КАБАРДИНСКАЯ ПАПАХА</p><h3>{p.name}</h3><p className="product-tone">{p.tone}</p></div><span className="card-arrow">↗</span></div></Link>)}</div></section>
    <section className="heritage section-wrap" id="heritage"><div><p className="eyebrow">02 / БОЛЬШЕ, ЧЕМ ГОЛОВНОЙ УБОР</p><h2>Корни, которые<br />всегда <em>с тобой.</em></h2></div><div><span className="heritage-symbol">✳</span><p>Есть вещи, которые говорят о нас без слов. О том, откуда мы родом. О том, что бережём. О том, что передаём дальше.</p><p>Эта коллекция — о красоте кабардинского головного убора и месте традиции в нашей жизни.</p><a className="text-link" href="#collection">Вернуться к коллекции ↗</a></div></section>
  </main><footer className="site-footer"><Link href="/" className="footer-brand">✳ НАСЛЕДИЕ</Link><p>Кабардинские головные уборы</p><span>© {new Date().getFullYear()}</span></footer></>;
}
