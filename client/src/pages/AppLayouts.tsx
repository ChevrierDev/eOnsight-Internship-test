import React from "react";

interface AppLayoutProps{
  header?: React.ReactNode
  children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, header }) => {
    return (
      <div className="min-h-screen bg-bodyBg bg-cover bg-center pb-10">
        <header className="bg-transparent px-2 ">
          {header}
        </header>
        <main className="p-4">
          {children}
        </main>
        <footer className="bg-transparent p-4 text-white text-xs text-center mt-5">
          <p>&copy; 2024 Bridge Information Dashboard</p>
        </footer>
      </div>
    );
  };
  
  export default AppLayout;