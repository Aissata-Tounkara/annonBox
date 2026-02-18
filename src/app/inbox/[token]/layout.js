// /src/app/inbox/[token]/layout.js

export default function InboxLayout({ children }) {
  return (
    <>
      {/* Le layout sert de "coquille" à votre page. 
          Ici, on injecte simplement le contenu de la page. */}
      {children}
    </>
  );
}