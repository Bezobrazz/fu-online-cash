import { GiHamburgerMenu } from "react-icons/gi";
export const Header = ({ openSidebar }: { openSidebar: () => void }) => {
  return (
    <header className="relative container p-[20px] flex justify-center items-center bg-teal-500">
      <GiHamburgerMenu
        size={30}
        fill="white"
        className="absolute top-[50%] left-10 translate-y-[-50%] lg:hidden cursor-pointer"
        onClick={openSidebar}
      />
      <h2 className="text-white text-[20px]">Продаж товарів</h2>
    </header>
  );
};
