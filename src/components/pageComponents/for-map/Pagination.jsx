const Pagination = ({ selectedPage, setSelectedPage, pagination }) => {
  if (!pagination) return null;

  const displayPagination = (page) => {
    if (pagination && pagination.gotoPage) {
      pagination.gotoPage(page);
    }
  };
  return (
    <>
      {
        <div style={{ marginTop: "20px" }}>
          {Array.from({ length: pagination.last }, (_, i) => (
            <button
              key={i}
              onClick={() => {
                displayPagination(i + 1);
                setSelectedPage(i + 1);
              }}
              style={{ margin: "0 5px" }}
              className={`mx-2 px-4 py-2 rounded ${
                selectedPage === i + 1
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      }
    </>
  );
};

export default Pagination;
