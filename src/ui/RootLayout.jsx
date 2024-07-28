import Footer from './Footer';
import Header from './Header';

function RootLayout({ children }) {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center bg-stone-100 pt-8 font-body transition-colors">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
}

export default RootLayout;

/* 
font-family:Merriweather;

*/
