import { ArrowPathIcon } from '@heroicons/react/20/solid';

const Header = () => {
  return (
    <div className="grid w-full grid-cols-3 text-sm font-semibold">
      <div className="flex">
        <button className="flex h-8 items-center rounded-full border bg-white px-3 hover:bg-neutral-100">Easy</button>
      </div>
      <div className="flex justify-center">
        <div className="flex h-8 items-center rounded-full border bg-white px-3 tabular-nums">1:22</div>
      </div>
      <div className="flex justify-end">
        <button className="flex h-8 w-8 items-center justify-center rounded-full border bg-white hover:bg-neutral-100">
          <ArrowPathIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Header;
