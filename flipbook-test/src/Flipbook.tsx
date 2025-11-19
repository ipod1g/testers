import React from 'react';
import HTMLFlipBook from 'react-pageflip';
import { toJpeg, toPng } from 'html-to-image';

// const width = 600 as const;
// const height = 800 as const;
const width = 300 as const;
const height = 400 as const;
const isPortrait = false;
const TOTAL_PAGES = 5 as const;

const PageCover = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, ref) => {
  return (
    <div className="page-cover bg-[#382d20] overflow-hidden border border-[#382d20]" ref={ref}>
      {children}
    </div>
  );
});

const Page = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, ref) => {
  return (
    <div className="page bg-[#E4D0B6] overflow-hidden border border-[#382d20] w-full h-full" ref={ref}>
      <div className="page-content w-full h-full">{children}</div>
    </div>
  );
});

const ImagePage = React.forwardRef<HTMLDivElement, { imageSrc: string; pageNumber: number }>(
  ({ imageSrc, pageNumber }, ref) => {
    return (
      <Page ref={ref}>
        {imageSrc ? (
          <img className="w-full h-full object-cover" src={imageSrc} alt={`Page ${pageNumber}`} />
        ) : (
          <div className="w-full h-full flex items-center justify-center">Spinner</div>
        )}
      </Page>
    );
  },
);

interface FlipBookProps {
  width: number;
  height: number;
  isPortrait: boolean;
  totalPages: number;
}

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
const FlipBook = () => {
  const flipbookRef = React.useRef<HTMLFlipBookType>(null);
  const [page, setPage] = React.useState(1);

  const { pageImages, hiddenPageRefs, isAllPagesReady } = useGeneratePageImages(TOTAL_PAGES, width, height, {
    format: 'png',
  });

  const handleShare = async () => {
    const currentPageIndex = page - 1;
    const imageDataUrl = pageImages[currentPageIndex];

    if (!imageDataUrl) {
      console.error('Image not available for current page');
      return;
    }

    try {
      // Convert data URL to blob
      const response = await fetch(imageDataUrl);
      const blob = await response.blob();
      const file = new File([blob], `page-${page}.png`, { type: 'image/png' });

      // Check if Web Share API is available
      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Page ${page}`,
          text: `Sharing page ${page}`,
        });
      } else {
        // Fallback: download the image
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
    (pageNumber: number) => {
      // if (pageNumber === 0 || pageNumber === TOTAL_PAGES - 1) {
      //   return (
      //     <PageCover key={`page-cover-${pageNumber}`}>
      //       <h2>{pageNumber + 1}</h2>
      //     </PageCover>
      //   );
      // }
      // TODO: for easier debug
      // return <Page>{PHOTOBOOK_TEMPLATES[pageNumber].content}</Page>;

      // // NOTE: using an image version of the page to allow users to share/download the page as an image
      return <ImagePage key={`page-${pageNumber}`} imageSrc={pageImages[pageNumber]} pageNumber={pageNumber + 1} />;
    },
    [pageImages],
  );

  return (
    <div>
      <div
        style={{ width: width! * 2, height: height }}
        className="relative pointer-events-auto border border-transparent"
      >
        <HTMLFlipBookPage
          hiddenPageRefs={hiddenPageRefs}
          width={width}
          height={height}
          photoBookContent={PHOTOBOOK_TEMPLATES}
        />
        <HTMLFlipBook
          className="scale-75 md:scale-100 [&_.--right]:shadow-[inset_7px_0_30px_-7px_rgba(0,0,0,0.4)] [&_.--right]:border-l-0! [&_.--left]:border-r-0! [&_.--left]:shadow-[inset_-7px_0_30px_-7px_rgba(0,0,0,0.4)]"
          style={{
            minHeight: 0,
            height: height,
          }}
          startPage={0}
          drawShadow={true}
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick
          usePortrait={isPortrait}
          width={width}
          height={height}
          minHeight={height}
          minWidth={width}
          ref={flipbookRef}
          size="stretch"
          maxWidth={1000}
          maxHeight={1533}
          maxShadowOpacity={0.2}
          showCover
          mobileScrollSupport
          flippingTime={500}
          onFlip={(e) => {
            console.log(e);
            setPage(e.data + 1);
          }}
        >
          {Array.from({ length: TOTAL_PAGES }, (_, i) => renderPage(i))}
        </HTMLFlipBook>
      </div>
      <FlipBookControls flipbookRef={flipbookRef} page={page} onShare={handleShare} />
    </div>
  );
};

const FlipBookControls = ({
  flipbookRef,
  page,
  onShare,
}: {
  flipbookRef: React.RefObject<HTMLFlipBookType>;
  page: number;
  onShare: () => void;
}) => {
  return (
    <div className="flex items-center justify-center absolute bottom-4 left-4 w-fit px-4 py-2 rounded-2xl text-2xl bg-black/50 text-white gap-4">
      <button
        className="cursor-pointer hover:bg-white/10 px-4 py-2 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => flipbookRef.current?.pageFlip().flipPrev()}
        disabled={page === 1}
      >
        Prev
      </button>
      {page}
      <button
        className="cursor-pointer hover:bg-white/10 px-4 py-2 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => flipbookRef.current?.pageFlip().flipNext()}
        disabled={page === TOTAL_PAGES}
      >
        Next
      </button>
      <button
        className="cursor-pointer hover:bg-white/10 px-4 py-2 rounded-2xl transition-all duration-300"
        onClick={onShare}
      >
        Share
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
      style={{ width: width / 2, height: height / 2 }}
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
          className="relative start-1/12 bottom-1/12 -rotate-3"
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

const HTMLFlipBookPage = ({
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
            <Page>{photoBookContent[i].content}</Page>
          )}
        </div>
      ))}
    </div>
  );
};

type HTMLFlipBookRef = React.ComponentRef<typeof HTMLFlipBook>;

type PageRect = {
  left: number;
  top: number;
  width: number;
  height: number;
  pageWidth: number;
};

interface HTMLFlipBookType extends HTMLFlipBookRef {
  pageFlip: () => {
    getPageCount: () => number;
    getCurrentPageIndex: () => number;
    getOrientation: () => 'portrait' | 'landscape';
    getBoundsRect: () => PageRect;
    turnToPage: (pageNumber: number) => void;
    turnToNextPage: () => void;
    turnToPrevPage: () => void;
    flip: (pageNumber: number) => void;
    flipPrev: () => void;
    flipNext: () => void;
    loadFromImages: (images: string[]) => void;
    loadFromHtml: (html: NodeListOf<Element> | HTMLElement[]) => void;
    updateFromHtml: (html: NodeListOf<Element> | HTMLElement[]) => void;
    updateFromImages: (images: string[]) => void;
    destroy: () => void;
  };
  startPage: number;
  drawShadow: boolean;
  startZIndex: number;
  autoSize: boolean;
  showCover: boolean;
  clickEventForward: boolean;
  useMouseEvents: boolean;
  swipeDistance: number;
  showPageCorners: boolean;
  disableFlipByClick: boolean;
  usePortrait: boolean;
  width: number;
  height: number;
  size: 'stretch' | 'contain' | 'cover';
  minHeight: number;
  minWidth: number;
  maxWidth: number;
  maxHeight: number;
  maxShadowOpacity: number;
  mobileScrollSupport: boolean;
  flippingTime: number;
  renderOnlyPageLengthChange: boolean;
  // REF: https://github.com/Nodlik/react-pageflip?tab=readme-ov-file#events
  // onFlip
  // onChangeOrientation: (orientation: 'portrait' | 'landscape') => void;
  // onChangeState
  // onInit
  // onUpdate
}

export default function App() {
  return (
    <main className="flex flex-col items-center justify-center h-full overflow-hidden">
      <FlipBook />
    </main>
  );
}

// TODO
// - Odd/Even number hidden pages should have shadow -> based on show cover prop
// - Add loading state
// - Add default page template
// - Try adding button
