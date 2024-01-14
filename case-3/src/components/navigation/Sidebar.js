import { useSelector } from 'react-redux';
import { BiSolidHome, BiSolidUser } from 'react-icons/bi';
import ReactIcon from '../other/ReactIcon';
import SidebarLink from './SidebarLink';
import classNames from 'classnames';

function Sidebar() {
  const currentPath = useSelector((state) => state.navigationReducer.currentPath);

  const defineIconColor = (href) => {
    if (href === currentPath) {
      return '#00A9BC';
    }
    return '#73C67E';
  }

  const navClass = classNames('z-20', 'flex', 'flex-col', 'justify-center',
    'space-y-8', 'h-full', 'border-r-[3px]', 'border-neutral-3', 'bg-neutral-2',
    'sm:flex-row', 'sm:space-x-6', 'sm:space-y-0', 'sm:order-2', 'sm:border-t-[3px]', 'sm:border-r-0');

  return (
    <nav className={navClass}>
      <SidebarLink href="/" title="Главная" selected={currentPath === '/'}>
        <ReactIcon src={<BiSolidHome className="w-12 h-12 sm:w-10 sm:h-10" />} color={defineIconColor('/')} />
      </SidebarLink>

      <SidebarLink href="/profile" title="Профиль" selected={currentPath === '/profile'}>
        <ReactIcon src={<BiSolidUser className="w-12 h-12 sm:w-10 sm:h-10" />} color={defineIconColor('/profile')} />
      </SidebarLink>
    </nav>
  );
}

export default Sidebar;
