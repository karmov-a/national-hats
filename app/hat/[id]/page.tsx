import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import { products } from '@/lib/catalog';
export default async function HatDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find(p => p.id === id);
  if (!product) notFound();
  return <><Header /><main className="section-wrap detail"><Link className="text-link back-link" href="/#collection">← Вся коллекция</Link><div className="detail-grid"><div className="detail-image"><Image src={product.image} alt={`Кабардинская папаха — ${product.name}`} fill priority sizes="(max-width: 760px) 100vw, 55vw" /></div><div className="detail-copy"><p className="eyebrow">КОЛЛЕКЦИЯ / 0{product.id}</p><h1>{product.name}</h1><p className="detail-subtitle">Кабардинская папаха</p><p>Выразительная фактура и сдержанная форма. Головной убор, в котором традиция становится частью вашего образа.</p><dl><div><dt>Оттенок</dt><dd>{product.tone}</dd></div><div><dt>Модель</dt><dd>Папаха</dd></div></dl><p className="detail-note">Оттенок на фотографии может немного отличаться в зависимости от экрана.</p><Link href="/#collection" className="primary-link">Другие головные уборы <span>↗</span></Link></div></div></main></>;
}
