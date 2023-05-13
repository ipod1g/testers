import { Fragment } from 'react';
import Head from 'next/head';
import { getDatabase, getPage, getBlocks } from '@/controllers/notion';
import Link from 'next/link';
import { DATABASE_ID } from '@/config';

export const Text = ({ text }: { text: any }) => {
  if (!text) {
    return null;
  }
  return text.map((value: any) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span
        className={[
          bold ? 'font-bold' : '',
          code
            ? 'font-mono bg-[rgb(242,242,242)] py-[2px] px-1 rounded-sm dark:bg-[rgb(15,8,28)]'
            : '',
          italic ? 'italic' : '',
          strikethrough ? 'line-through' : '',
          underline ? 'underline underline-offset-2' : '',
        ].join(' ')}
        style={color !== 'default' ? { color } : {}}
        key={text.content}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    );
  });
};

const renderNestedList = (block: any) => {
  const { type } = block;
  const value = block[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === 'numbered_list_item';

  if (isNumberedList) {
    return <ol>{value.children.map((block: any) => renderBlock(block))}</ol>;
  }
  return <ul>{value.children.map((block: any) => renderBlock(block))}</ul>;
};

const renderBlock = (block: any) => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case 'paragraph':
      return (
        <p>
          <Text text={value.rich_text} />
        </p>
      );
    case 'heading_1':
      return (
        <h1>
          <Text text={value.rich_text} />
        </h1>
      );
    case 'heading_2':
      return (
        <h2>
          <Text text={value.rich_text} />
        </h2>
      );
    case 'heading_3':
      return (
        <h3>
          <Text text={value.rich_text} />
        </h3>
      );
    case 'bulleted_list': {
      return (
        <ul className="list-disc list-inside leading-8">
          {value.children.map((child: any) => renderBlock(child))}
        </ul>
      );
    }
    case 'numbered_list': {
      return (
        <ol className="list-decimal list-inside">
          {value.children.map((child: any) => renderBlock(child))}
        </ol>
      );
    }
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li key={block.id}>
          <Text text={value.rich_text} />
          {!!value.children && renderNestedList(block)}
        </li>
      );
    case 'to_do':
      return (
        <div className="my-2">
          <label htmlFor={id}>
            <input
              type="checkbox"
              id={id}
              defaultChecked={value.checked}
              className="mr-1"
            />{' '}
            <Text text={value.rich_text} />
          </label>
        </div>
      );
    case 'toggle':
      return (
        <details>
          <summary>
            <Text text={value.rich_text} />
          </summary>
          {block.children?.map((child: any) => (
            <Fragment key={child.id}>{renderBlock(child)}</Fragment>
          ))}
        </details>
      );
    case 'child_page':
      return (
        <div className="border-[1px] border-solid border-current p-5 rounded-xl">
          <strong>{value.title}</strong>
          {block.children.map((child: any) => renderBlock(child))}
        </div>
      );
    case 'image':
      const src =
        value.type === 'external' ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure>
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    case 'divider':
      return (
        <hr
          className="border-neutral-600 dark:border-neutral-200/30 mx-0 mb-1 mt-3"
          key={id}
        />
      );
    case 'quote':
      return <blockquote key={id}>{value.rich_text[0].plain_text}</blockquote>;
    case 'code':
      return (
        <pre className="bg-slate-100 px-1 py-[2px] my-5 leading-[2.3] rounded-md overflow-auto dark:bg-[rgb(15,8,28)]">
          <code className="p-5 font-mono flex flex-wrap" key={id}>
            {value.rich_text[0].plain_text}
          </code>
        </pre>
      );
    case 'file':
      const src_file =
        value.type === 'external' ? value.external.url : value.file.url;
      const splitSourceArray = src_file.split('/');
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const caption_file = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure>
          <div className="px-1 py-[2px] no-underline text-inherit hover:bg-[rgb(55,53,47)]/10 cursor-pointer rounded-sm dark:hover:bg-white/10">
            📎{' '}
            <Link href={src_file} passHref>
              {lastElementInArray.split('?')[0]}
            </Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      );
    case 'bookmark':
      const href = value.url;
      return (
        <a href={href} target="_brank" className="block mb-[10px]">
          {href}
        </a>
      );
    case 'table': {
      return (
        <table className="notion--table dark:bg-[rgb(15,8,28)]">
          <tbody>
            {block.children?.map((child: any, i: number) => {
              const RowElement =
                value.has_column_header && i == 0 ? 'th' : 'td';
              return (
                <tr key={child.id}>
                  {child.table_row?.cells?.map((cell: any, i: number) => {
                    return (
                      <RowElement key={`${cell.plain_text}-${i}`}>
                        <Text text={cell} />
                      </RowElement>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    case 'column_list': {
      return (
        <div className="notion--row">
          {block.children.map((block: any) => renderBlock(block))}
        </div>
      );
    }
    case 'column': {
      return (
        <div>{block.children.map((child: any) => renderBlock(child))}</div>
      );
    }
    default:
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`;
  }
};

export default function Post({ page, blocks }: { page: any; blocks: any }) {
  if (!page || !blocks) {
    return <div />;
  }
  return (
    <div className="bg-white">
      <Head>
        <title>{page.properties.Name.title[0].plain_text}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <article className="notion--container py-0 px-5 max-w-[700px] my-0 mx-auto leading-[1.5] whitespace-pre-line">
        <h1 className="text-4xl">
          <Text text={page.properties.Name.title} />
        </h1>
        <section>
          {blocks.map((block: any) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
          <Link href="/" className="inline-block mb-5">
            ← Go home
          </Link>
        </section>
      </article>
    </div>
  );
}

export const getStaticPaths = async () => {
  const database: any = await getDatabase(DATABASE_ID);
  return {
    paths: database.map((page: any) => ({ params: { id: page.id } })),
    fallback: true,
  };
};

export const getStaticProps = async (context: any) => {
  const { id } = context.params;
  const page = await getPage(id);
  const blocks = await getBlocks(id);

  return {
    props: {
      page,
      blocks,
    },
    revalidate: 1,
  };
};
