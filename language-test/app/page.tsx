import Link from 'next/link';

interface PageProps extends Record<string, unknown> {
  params: {
    lang: string;
  };
}

export default function Page({ params: { lang } }: PageProps) {
  return (
    <>
      <h1>Hi there!</h1>
      <Link href={`/${lang}/second-page`}>to second page</Link>
    </>
  );
}
