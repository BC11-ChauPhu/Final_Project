import React, { useState } from "react";
import defaultUser from "../assets/img/user.jpg";
import { http } from "../service/config";
import { toast } from "react-toastify";

const UserComment = ({ userData, roomData, onCommentAdded }) => {
  const [comment, setComment] = useState("");
  const generateRandomId = () => Math.floor(Math.random() * 10000);
  const token = localStorage.getItem("authToken");
  const currentDate = new Date();

  const handleComment = (event) => {
    event.preventDefault();

    const addComment = async () => {
      try {
        const res = await http.post(
          "/api/binh-luan",
          {
            id: generateRandomId,
            maPhong: roomData.id,
            maNguoiBinhLuan: userData.id,
            ngayBinhLuan: currentDate,
            noiDung: comment,
            saoBinhLuan: 4,
          },
          {
            headers: {
              token: token,
            },
          },
        );
        setComment("");
        onCommentAdded();
      } catch (err) {
        console.log(err);
      }
    };
    if (!comment.trim()) {
      const errorMessage = "Comment cannot be empty";
      toast.error(errorMessage, {
        autoClose: 2000,
        position: "top-center",
      });
    } else {
      addComment();
    }
  };

  return (
    <div className="container mx-auto mt-10 gap-5 px-6 md:flex">
      {/* AVATAR */}
      <div
        className="hidden h-12 min-w-12 rounded-full border border-gray-500 bg-cover bg-center bg-no-repeat md:block"
        style={{
          backgroundImage: `url(${userData.avatar ? userData.avatar : defaultUser})`,
        }}
      ></div>
      {/* FORM */}
      <div>
        <form onSubmit={handleComment}>
          <textarea
            className="w-full border border-gray-500 p-2"
            placeholder="Add your comment..."
            name="comment"
            id="userComment"
            rows="4"
            cols="65"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></textarea>
          <button
            className="mt-2 rounded-lg bg-blue-500 px-4 py-2 text-white"
            type="submit"
          >
            Add comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserComment;
