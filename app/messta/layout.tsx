export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className="antialiased bg-white text-[#1a1a1a] min-h-screen">
        {children}
      </body>
    </html>
  );
}
