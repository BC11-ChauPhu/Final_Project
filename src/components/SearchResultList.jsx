import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";

const SearchResultList = ({ filteredList, onLocationSelect }) => {
  return (
    <div>
      {filteredList?.map((item, index) => (
        <div
          className="flex gap-4 py-2"
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
      ))}
    </div>
  );
};

export default SearchResultList;