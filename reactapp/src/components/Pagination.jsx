const Pagination = ({ page, total }) => {
  const searchParams = new URLSearchParams(location.search);

  const setLink = (newPage, innerText) => {
    if (newPage === page) return (
      <button className="rounded-full py-2 px-4 bg-pink-800 text-pink-50">
        {newPage}
      </button>
    )

    searchParams.set("page", newPage);
    const url = location.origin + location.pathname + '?' + searchParams.toString();

    return (
      <a href={url} className="rounded-full my-1 mx-2 py-1 px-2 cursor-pointer hover:m-0 hover:py-2 hover:px-4 hover:bg-pink-800/40 duration-150">
        <button className="cursor-pointer">{innerText}</button>
      </a>
    )
  }

  if (total <= 1) return <></>;
  if (total < 4) return paginationLessThan4();
  return paginationMoreThan4();

  function paginationLessThan4() {
    return (
      <div className="flex justify-center mt-3">
        {setLink(1, 1)}
        {setLink(2, 2)}
        {total == 3 && setLink(3, 3)}
      </div>
    )
  }

  function paginationMoreThan4() {
    if (page == 1) {
      return (
        <div className="flex justify-center mt-3">
          {setLink(1, 1)}
          {setLink(2, 2)}
          {setLink(3, 3)}
          {setLink(total, ">")}
        </div>
      )
    }
    else if (page === total) {
      return (
        <div className="flex justify-center mt-3">
          {setLink(1, "<")}
          {setLink(total - 2, total - 2)}
          {setLink(total - 1, total - 1)}
          {setLink(total, total)}
        </div>
      )
    }
    else return (
      <div className="flex justify-center mt-3">
        {setLink(1, "<")}
        {setLink(page - 1, page - 1)}
        {setLink(page, page)}
        {setLink(page + 1, page + 1)}
        {setLink(total, ">")}
      </div>
    )
  }
}

export default Pagination;