

const GridBackgroundDemo = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-white dark:bg-black bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.1)_0%,_transparent_50%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.3)_0%,_transparent_50%)]">
      <div className="absolute inset-0 bg-grid-black/[0.2] dark:bg-grid-white/[0.2]"></div>
    </div>
  );
};

export default GridBackgroundDemo;
