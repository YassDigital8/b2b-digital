
import MicroAnimations from '../MicroAnimations';

const HeaderBackground = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-chamDarkBlue via-chamBlue to-blue-700 overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIvPjxwYXRoIGQ9Ik0zMCAzMGgzMHYzMEgzMHoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
      </div>
      
      {/* Add micro animations for visual interest */}
      <MicroAnimations />
    </div>
  );
};

export default HeaderBackground;
