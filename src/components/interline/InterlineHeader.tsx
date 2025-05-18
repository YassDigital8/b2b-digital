
import { HeaderBackground, HeaderTitle, HeaderFeatures, HeaderVisual, WaveSeparator } from './header';

const InterlineHeader = () => {
  return (
    <div className="relative">
      {/* Header Background with Gradient */}
      <HeaderBackground />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-white space-y-6">
            <HeaderTitle />
            <HeaderFeatures />
          </div>

          <HeaderVisual />
        </div>
      </div>

      {/* Custom wave separator */}
      <WaveSeparator />
    </div>
  );
};

export default InterlineHeader;
