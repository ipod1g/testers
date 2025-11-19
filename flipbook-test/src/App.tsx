import React from 'react';
import { toJpeg, toPng } from 'html-to-image';
import HTMLFlipBook from 'react-pageflip';

const width = 400 as const;
const height = 700 as const;
const TOTAL_PAGES = 5 as const;

const PageCover = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, ref) => {
  return (
    <div
      className="page-cover w-full h-full bg-[#382d20] overflow-hidden text-lg flex items-center justify-center"
      ref={ref}
    >
      {children}
    </div>
  );
});

const Page = React.forwardRef<HTMLDivElement, { children: React.ReactNode; pageIndex: number }>(
  ({ children, pageIndex }, ref) => {
    const { page } = usePhotoBook();
    return (
      <div
        data-page-index={pageIndex}
        data-page-state={page === pageIndex ? 'active' : 'inactive'}
        className="page bg-[#E4D0B6] overflow-hidden border border-[#382d20] w-full h-full text-amber-950 text-lg flex items-center justify-center"
        ref={ref}
      >
        {children}
      </div>
    );
  },
);

const ImagePage = React.forwardRef<HTMLDivElement, { imageSrc: string; pageIndex: number }>(
  ({ imageSrc, pageIndex }, ref) => {
    return (
      <Page ref={ref} pageIndex={pageIndex}>
        {imageSrc ? (
          <img
            className="w-full h-full object-cover select-none "
            draggable={false}
            src={imageSrc}
            alt={`Page ${pageIndex}`}
          />
        ) : (
          <img
            alt="Spinner"
            aria-label="Spinner"
            className="w-24 h-24 object-cover select-none flex items-center justify-center"
            src="https://sandboxvr.imgix.net/logo-loader.gif?h=120"
            width={64}
            height={64}
          />
        )}
      </Page>
    );
  },
);

const useGeneratePageImages = (
  totalPages: number,
  width: number,
  height: number,
  options: { pixelRatio?: number; format?: 'jpeg' | 'png' } = { pixelRatio: 2, format: 'jpeg' },
) => {
  const [pageImages, setPageImages] = React.useState<Record<number, string>>({});
  const hiddenPageRefs = React.useRef<Record<number, HTMLDivElement | null>>({});
  const [isAllPagesReady, setIsAllPagesReady] = React.useState(false);

  React.useEffect(() => {
    const generateImages = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      for (let i = 0; i < totalPages; i++) {
        // NOTE: Wait for browser idle time before processing each page (non-blocking)
        await new Promise((resolve) => {
          if ('requestIdleCallback' in window) {
            requestIdleCallback(resolve as IdleRequestCallback);
          } else {
            setTimeout(resolve, 0);
          }
        });

        const pageElement = hiddenPageRefs.current[i];
        if (!pageElement) continue;

        try {
          const dataUrl = await (options.format === 'jpeg' ? toJpeg : toPng)(pageElement, {
            width,
            height,
            pixelRatio: options.pixelRatio,
          });

          setPageImages((prev) => ({
            ...prev,
            [i]: dataUrl,
          }));

          if (i === totalPages - 1) {
            setIsAllPagesReady(true);
          }
        } catch (error) {
          console.error(`Error generating image for page ${i + 1}:`, error);
        }
      }
    };

    generateImages();
  }, [totalPages, width, height]);

  return { pageImages, hiddenPageRefs, isAllPagesReady };
};

const PhotoBookContext = React.createContext<{
  page: number;
  setPage: (page: number) => void;
}>({
  page: 1,
  setPage: () => {},
});

export const usePhotoBook = () => {
  return React.useContext(PhotoBookContext);
};

export const PhotoBookProvider = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = React.useState(1);
  return <PhotoBookContext.Provider value={{ page, setPage }}>{children}</PhotoBookContext.Provider>;
};

const PhotoBook = () => {
  const { page } = usePhotoBook();

  const { pageImages, hiddenPageRefs, isAllPagesReady } = useGeneratePageImages(TOTAL_PAGES, width, height, {
    format: 'png',
    pixelRatio: 4,
  });

  const handleShare = async () => {
    const currentPageIndex = page - 1;
    const imageDataUrl = pageImages[currentPageIndex];

    if (!imageDataUrl) {
      console.error('Image not available for current page');
      return;
    }

    try {
      const response = await fetch(imageDataUrl);
      const blob = await response.blob();
      const file = new File([blob], `page-${page}.png`, { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Page ${page}`,
          text: `Sharing page ${page}`,
        });
      } else {
        const link = document.createElement('a');
        link.href = imageDataUrl;
        link.download = `page-${page}.png`;
        link.click();
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const renderPage = React.useCallback(
    (pageIndex: number) => {
      // TODO: for easier debug
      // if (page === 0 || page === TOTAL_PAGES - 1) {
      //   return <PageCover key={`page-cover-${pageIndex}`}>{PHOTOBOOK_TEMPLATES[pageIndex].content}</PageCover>;
      // }
      // return <Page pageIndex={pageIndex + 1}>{PHOTOBOOK_TEMPLATES[pageIndex].content}</Page>;

      // // NOTE: using an image version of the page to allow users to share/download the page as an image
      return <ImagePage key={`page-${pageIndex}`} imageSrc={pageImages[pageIndex]} pageIndex={pageIndex + 1} />;
    },
    [page, pageImages],
  );

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative pointer-events-auto max-w-sm max-h-[700px] w-full h-full">
        <HTMLPages
          hiddenPageRefs={hiddenPageRefs}
          width={width}
          height={height}
          photoBookContent={PHOTOBOOK_TEMPLATES}
        />
        <div className="scale-75 md:scale-100 **:data-[page-state=active]:flex **:data-[page-state=inactive]:hidden w-full h-full">
          {Array.from({ length: TOTAL_PAGES }, (_, i) => renderPage(i))}
        </div>
      </div>
      <PhotoBookControls onShare={handleShare} />
    </div>
  );
};

const PhotoBookControls = ({ onShare }: { onShare: () => void }) => {
  const { page, setPage } = usePhotoBook();

  const handlePrev = () => {
    const prevPage = page - 1;
    if (prevPage < 1) return;
    setPage(prevPage);
  };

  const handleNext = () => {
    const nextPage = page + 1;
    if (nextPage > TOTAL_PAGES) return;
    setPage(nextPage);
  };

  return (
    <div className="flex items-center justify-center absolute bottom-4 left-4 w-fit px-4 py-2 rounded-2xl text-2xl bg-black/50 text-white gap-4">
      <button
        className="cursor-pointer hover:bg-white/10 px-4 py-2 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handlePrev}
        disabled={page === 1}
      >
        Prev
      </button>
      {page}
      <button
        className="cursor-pointer hover:bg-white/10 px-4 py-2 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleNext}
        disabled={page === TOTAL_PAGES}
      >
        Next
      </button>
    </div>
  );
};

const PhotoFrame = ({
  imgSrc,
  className,
  width = 300,
  height = 400,
}: {
  imgSrc: string;
  className?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <div
      style={{ width: width, height: height }}
      className={'aspect-square border border-black p-4 rounded-2xl shadow-lg bg-white ' + className}
    >
      <img src={imgSrc} alt="Photo" className="w-full h-full object-cover" width={width} height={height} />
      <div className="tape absolute -top-8 left-1/2 -translate-x-1/2 w-1/2 h-18 bg-black/50"></div>
    </div>
  );
};

const PHOTOBOOK_TEMPLATES = [
  {
    id: 1,
    content: <div>Page Image 1</div>,
  },
  {
    id: 2,
    content: (
      <div className="w-full h-full flex items-center justify-center flex-col gap-2">
        <PhotoFrame
          imgSrc={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg3i9yXCpehTVoTAGVoijVlwZlvvK8zGH_Kw&s'}
          className="rotate-4"
        />
        Page Image 2
      </div>
    ),
  },
  {
    id: 3,
    content: (
      <div className="w-full h-full flex items-center justify-center flex-col gap-2">
        <PhotoFrame
          imgSrc={'https://cdn.mos.cms.futurecdn.net/pnfWWMKRiZqbBSxrJ3kLa3.jpg'}
          className="relative -start-4 bottom-1/12 -rotate-3"
        />
        Page Image 3
      </div>
    ),
  },
  {
    id: 4,
    content: <div>Page Image 4</div>,
  },
  {
    id: 5,
    content: <div>Page Image 5</div>,
  },
];

const HTMLPages = ({
  hiddenPageRefs,
  width,
  height,
  photoBookContent,
}: {
  hiddenPageRefs: React.RefObject<Record<number, HTMLDivElement | null>>;
  width: number;
  height: number;
  photoBookContent: { id: number; content: React.ReactNode }[];
}) => {
  return (
    <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
      {Array.from({ length: TOTAL_PAGES }, (_, i) => (
        <div
          key={`hidden-${i}`}
          ref={(el) => (hiddenPageRefs.current![i] = el)}
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          {i === 0 || i === TOTAL_PAGES - 1 ? (
            <PageCover>{photoBookContent[i].content}</PageCover>
          ) : (
            <Page pageIndex={i + 1}>{photoBookContent[i].content}</Page>
          )}
        </div>
      ))}
    </div>
  );
};

export default function App() {
  return (
    <main className="flex flex-col items-center justify-center h-full overflow-hidden">
      <PhotoBookProvider>
        <PhotoBook />
      </PhotoBookProvider>
    </main>
  );
}

// TODO
// - Odd/Even number hidden pages should have shadow -> based on show cover prop
// - Add loading state
// - Add default page template
// - Try adding button
