
export default function Pagination({totalMedias, mediasPerPage, setCurrentPage}) {
    let pages = []

    for (let i = 1; i <= Math.ceil(totalMedias/mediasPerPage); i++) {
        pages.push(i)
    }
  return (
    <div>
        {
            pages.map((page) => {
                return <button key={page} onClick={()=> setCurrentPage(page)}>{page}</button>
            })
        }
    </div>
  )
}