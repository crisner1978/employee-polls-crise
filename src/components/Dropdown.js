import {
  ClipboardDocumentListIcon,
  PlusCircleIcon
} from "@heroicons/react/24/outline";
import { ArrowLeftOnRectangleIcon, UserIcon } from "@heroicons/react/24/solid";
import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutRedux } from "../features/authSlice";
import { auth } from "../lib/firebase";
import DropdownOption from "./DropdownOption";

const Dropdown = ({ username }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  async function logOut() {
    dispatch(logoutRedux())
    signOut(auth);
    window.location.reload();
  }

  return (
    <div className="absolute py-2 bg-white border border-t-0 rounded-xl top-11 -right-4 w-48">
      <DropdownOption
        onClick={() => navigate("/")}
        icon={<UserIcon className="h-6 w-6 group-hover:bg-gray-100" />}
        text={username}
      />
      <DropdownOption
        onClick={() => navigate("leaderboard")}
        icon={
          <ClipboardDocumentListIcon className="h-6 w-6 group-hover:bg-gray-100" />
        }
        text="Leaderboard"
      />
      <DropdownOption
        icon={
          <PlusCircleIcon className="h-6 w-6 group-hover:bg-gray-100 rounded-full" />
        }
        text="Add Poll"
        onClick={() => navigate("add")}
      />
      <DropdownOption
        icon={<ArrowLeftOnRectangleIcon className="rotate-180 h-6 w-6" />}
        text="Logout"
        onClick={logOut}
        border
      />
    </div>
  );
};

export default Dropdown;
