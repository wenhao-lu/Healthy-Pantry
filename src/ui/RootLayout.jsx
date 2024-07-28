import Footer from './Footer';
import Header from './Header';

function RootLayout({ children }) {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center gap-6 bg-stone-100 px-4 py-8 font-body transition-colors">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}

export default RootLayout;

/* 
font-family:Merriweather;

*/
