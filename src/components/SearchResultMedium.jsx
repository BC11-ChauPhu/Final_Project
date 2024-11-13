import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";

const SearchResultMedium = ({ filteredList, onLocationSelect }) => {
  return (
    <div
      id="searchResultMedium"
      className="absolute left-0 top-16 z-10 mt-3 rounded-[32px] bg-white px-4 py-6 drop-shadow-xl"
    >
      {filteredList?.length > 0 ? (
        filteredList?.map((item, index) => (
          <div
            className="cursor:pointer flex gap-4 rounded-lg px-4 py-2 hover:bg-gray-200"
            key={index}
            onClick={() =>
              onLocationSelect(
                item.tenViTri,
                item.tinhThanh,
                item.quocGia,
                item.id,
              )
            }
          >
            <div className="grid h-12 flex-[0_0_48px] items-center justify-center rounded-xl bg-gray-300 text-center">
              <HiOutlineLocationMarker className="block h-[22px] w-[22px]" />
            </div>
            <div className="flex flex-col justify-center">
              <div>
                {item.tenViTri}, {item.tinhThanh}, {item.quocGia}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">Location not found</div>
      )}
    </div>
  );
};

export default SearchResultMedium;
