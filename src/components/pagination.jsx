
export default function Pagination({totalMedias, mediasPerPage, currentPage, setCurrentPage}) {
    let pages = []

    for (let i = 1; i <= Math.ceil(totalMedias/mediasPerPage); i++) {
        pages.push(i)
    }
  return (
    <div>
        {
            pages.map((page) => {
                return <button key={page} aria-current={page === currentPage ? "page" : undefined} onClick={() => {setCurrentPage(page); window.scrollTo({top:0})}}>{page}</button>
            })
        }
    </div>
  )
}