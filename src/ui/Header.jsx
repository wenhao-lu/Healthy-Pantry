import Logo from './Logo';
import MainNav from './MainNav';

function Header() {
  return (
    <header className="gap6 flex items-center justify-between gap-16">
      <Logo />
      <MainNav />
    </header>
  );
}

export default Header;
