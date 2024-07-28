import Logo from './Logo';
import MainNav from './MainNav';

function Header() {
  return (
    <header className="flex items-center justify-between gap-16 pb-6">
      <Logo />
      <MainNav />
    </header>
  );
}

export default Header;
