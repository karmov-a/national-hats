import Image from 'next/image';

/** Decorative vector mark; the adjacent brand text supplies the accessible name. */
export default function BrandSymbol() {
  return <Image className="brand-symbol" src="/heritage-symbol.svg" alt="" width={320} height={432} unoptimized aria-hidden="true" />;
}
