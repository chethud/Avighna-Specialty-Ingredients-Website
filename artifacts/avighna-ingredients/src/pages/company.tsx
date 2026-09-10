import { ArrowLeft } from 'lucide-react';
import { Link, useRoute } from 'wouter';
import { SiteFooter } from '@/components/site-footer';

const companyPages: Record<
  string,
  {
    name: string;
    category: string;
    description: string;
    image: string;
    accent: string;
  }
> = {
  'asian-apex': {
    name: 'Asian Apex & Co.',
    category: '[Business category to be added]',
    description: '[Approved company description, capabilities and contact details to be added.]',
    image: '/generated/company-asian-apex.jpg',
    accent: '#173f3a',
  },
  avighna: {
    name: 'Avighna Speciality Ingredients Pvt. Ltd.',
    category: 'Specialty Ingredients',
    description: 'Specialty ingredient solutions for food, dairy, beverages, pharmaceuticals and nutraceuticals.',
    image: '/generated/company-avighna.jpg',
    accent: '#ea632b',
  },
  'ganesh-inc': {
    name: 'Ganesh Inc.',
    category: 'Food & Pharma Raw Materials',
    description:
      'Your premier partner in food and pharma raw materials, with 12 years of excellence in Southern India. Single-source supply, speed and reliability, quality assurance, expert support and customization.',
    image: '/generated/company-ganesh.jpg',
    accent: '#8b1e2d',
  },
  'atharva-associates': {
    name: 'Atharva Associates',
    category: '[Business category to be added]',
    description: '[Approved company description, capabilities and contact details to be added.]',
    image: '/generated/company-atharva.jpg',
    accent: '#1e3d38',
  },
};

export default function CompanyPage() {
  const [, params] = useRoute('/companies/:slug');
  const slug = params?.slug ?? '';
  const company = companyPages[slug];

  if (!company) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5efe4] px-5 text-[#173f3a]">
        <div className="text-center">
          <h1 className="font-display text-4xl">Company not found</h1>
          <Link href="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-[#ea632b]">
            <ArrowLeft size={14} /> Back to About Avigna
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5efe4] text-[#173f3a]">
      <div className="mx-auto page-container max-w-none py-8 lg:py-10">
        <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-[#66716b] transition-colors hover:text-[#ea632b]" data-testid="link-back-about">
          <ArrowLeft size={14} /> About Avigna
        </Link>

        <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-[#e2d5c3] bg-[#fff9ee] shadow-[0_20px_50px_rgba(49,62,54,0.08)]">
          <img src={company.image} alt={company.name} className="aspect-[16/8] w-full object-cover" data-testid="img-company-page" />
          <div className="p-7 sm:p-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: company.accent }}>
              Avigna Group Company
            </p>
            <h1 className="mt-4 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[0.95] tracking-[-0.045em]" data-testid="heading-company-page">
              {company.name}
            </h1>
            <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.12em]" style={{ color: company.accent }}>
              {company.category}
            </p>
            <p className="mt-5 max-w-[620px] text-[16px] leading-7 text-[#5f6b62]">{company.description}</p>
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
