import Image from 'next/image';
import { Inter } from 'next/font/google';
import * as React from 'react';
import { NotionRenderer } from 'react-notion-x';
import { NotionAPI } from 'notion-client';

const notion = new NotionAPI();

const inter = Inter({ subsets: ['latin'] });

export default function Home({ recordMap }: { recordMap: any }) {
  return (
    <main>
      <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />
    </main>
  );
}
export const getStaticProps = async () => {
  const recordMap = await notion.getPage('067dd719a912471ea9a3ac10710e7fdf');

  return {
    props: {
      recordMap,
    },
    revalidate: 10,
  };
};
