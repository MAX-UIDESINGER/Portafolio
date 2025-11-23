import React, { useRef, useState, useEffect, ReactNode } from "react";

interface CustomScrollContainerProps {
  children: ReactNode;
}

const CustomScrollContainer: React.FC<CustomScrollContainerProps> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollRatio, setScrollRatio] = useState<number>(0);
  const [hasOverflow, setHasOverflow] = useState<boolean>(false);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [thumbHeight, setThumbHeight] = useState<number>(40);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const container = containerRef.current;
    if (!container) return;

    const startY = e.clientY;
    const startScrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const contentHeight = contentRef.current?.scrollHeight || 0;
    const scrollableHeight = contentHeight - containerHeight;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - startY;
      const availableHeight =
        (containerRef.current?.clientHeight || 0) - 14 - thumbHeight;
      const scrollDelta = (deltaY / availableHeight) * scrollableHeight;

      container.scrollTop = Math.max(
        0,
        Math.min(scrollableHeight, startScrollTop + scrollDelta)
      );
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;

    let scrollTimer: NodeJS.Timeout;

    const updateScrollbar = (): void => {
      const containerHeight = container.clientHeight;
      const contentHeight = content.scrollHeight;
      const scrollTop = container.scrollTop;

      // Verificar si hay overflow (contenido que scrollear)
      const overflow = contentHeight > containerHeight;
      setHasOverflow(overflow);

      if (overflow) {
        // Mostrar scrollbar cuando hay scroll
        setIsScrolling(true);

        // Calcular altura proporcional del thumb
        const availableScrollHeight = containerHeight - 14; // Restamos espacio para la barra superior
        const proportionalHeight = Math.max(
          20,
          Math.min(
            60,
            (containerHeight / contentHeight) * availableScrollHeight
          )
        );
        setThumbHeight(proportionalHeight);

        // Calcular ratio de scroll (0 a 1)
        const ratio = scrollTop / (contentHeight - containerHeight);
        setScrollRatio(Math.max(0, Math.min(1, ratio)));

        // Ocultar scrollbar después de 1.5 segundos sin scroll
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          setIsScrolling(false);
        }, 1500);
      } else {
        setScrollRatio(0);
        setIsScrolling(false);
      }
    };

    updateScrollbar();
    container.addEventListener("scroll", updateScrollbar);
    window.addEventListener("resize", updateScrollbar);

    // Observer para detectar cambios en el contenido
    const resizeObserver = new ResizeObserver(updateScrollbar);
    if (content) resizeObserver.observe(content);

    return () => {
      container.removeEventListener("scroll", updateScrollbar);
      window.removeEventListener("resize", updateScrollbar);
      resizeObserver.disconnect();
      clearTimeout(scrollTimer);
    };
  }, []);

  const showScrollbarIndicator = (isScrolling || isHovering) && hasOverflow;

  return (
    <div className="relative flex-1 min-h-0">
      <div
        ref={containerRef}
        className="h-full overflow-y-auto scrollbar-hide"
        // style={{ paddingRight: "40px" }}
        style={{
          paddingRight: window.innerWidth >= 768 ? "40px" : "0px",
        }}
      >
        <div ref={contentRef}>{children}</div>
      </div>

      {/* Área del scrollbar - siempre visible con bordes */}
      <div
        className="hidden md:block absolute right-0 top-0 w-10 h-full bg-transparent border-l border-[#314158]"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Barra superior funcional como VS Code */}
        <div
          className="h-2 bg-[#62748E] cursor-pointer  "
          style={{
            marginLeft: "8px",
            marginRight: "8px",
            marginTop: "13px",
          }}
        />

        {/* Container del scroll */}
        <div
          className="relative w-full flex flex-col"
          style={{ height: "calc(100% - 10px)", marginTop: "4px" }}
        >
          {/* Área central del scroll */}
          <div className="flex-1 relative mx-1" style={{ height: "100%" }}>
            {/* Thumb de scroll - aparece solo con hover/scroll - MÁS DELGADO */}
            <div
              className="absolute duration-200 pointer-events-auto"
              style={{
                width: "10px",
                height: `${thumbHeight}px`,
                left: "50%",
                transform: "translateX(-50%)",
                top: `calc(${scrollRatio * (100 - 5)}% - ${
                  scrollRatio * thumbHeight
                }px)`,
                opacity: showScrollbarIndicator ? 0.8 : 0,
                borderRadius: "2px",
                background: "rgba(98, 116, 142, 0.5)",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomScrollContainer;
