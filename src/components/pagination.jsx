
// Palier 1 : Composant de pagination de la galerie
export default function Pagination({ totalMedias, mediasPerPage, currentPage, setCurrentPage }) {
  const totalPages = Math.ceil(totalMedias / mediasPerPage);
  
  // S'il n'y a qu'une seule page ou aucun média, pas besoin dafficher la pagination 
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="pagination" aria-label="Pagination des médias">
      {pages.map((page) => (
        <button
          key={page}
          aria-current={page === currentPage ? "page" : undefined}
          className={page === currentPage ? "active" : ""}
          onClick={() => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {page}
        </button>
      ))}
    </nav>
  );
}