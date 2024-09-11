import { observer } from "mobx-react";
import React, { useMemo } from "react";
import { toursStore } from "../../stores";

type Props = {};

export const PaginationTours: React.FC<Props> = observer(() => {
  const total = toursStore.lengthOfTours;

  const numberOfPage = useMemo(() => {
    return Math.ceil(total / toursStore.sizeOfPages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, toursStore.sizeOfPages]);

  const handleChangeSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    toursStore.setPageSize(parseInt(e.target.value));
    toursStore.setCurrentPage(1); // Reset to the first page when the size changes
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= numberOfPage) {
      toursStore.setCurrentPage(newPage);
    }
  };

  return (
    <nav className="flex flex-wrap justify-between items-center mb-4">
      <form className="max-w-sm">
        <label
          htmlFor="unitPerPage"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Unit per page
        </label>
        <select
          id="unitPerPage"
          defaultValue={toursStore.sizeOfPages}
          onChange={handleChangeSize}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </form>
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <div
            onClick={() => handlePageChange(toursStore.currentPage - 1)}
            className="cursor-pointer flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </div>
        </li>

        {Array.from({ length: numberOfPage }, (_, index) => (
          <li key={index}>
            <div
              onClick={() => handlePageChange(index + 1)}
              className={`cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                toursStore.currentPage === index + 1
                  ? "text-blue-600 border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  : ""
              }`}
            >
              {index + 1}
            </div>
          </li>
        ))}

        <li>
          <div
            onClick={() => handlePageChange(toursStore.currentPage + 1)}
            className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </div>
        </li>
      </ul>
    </nav>
  );
});
