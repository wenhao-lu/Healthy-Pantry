import Header from './Header';

function RootLayout({ children }) {
  return (
    <>
      <div className="font-body flex min-h-screen flex-col items-center gap-6 bg-stone-100 px-4 py-8 transition-colors">
        <Header />
        <main>{children}</main>
      </div>
    </>
  );
}

export default RootLayout;

/* 
font-family:Merriweather;

*/
