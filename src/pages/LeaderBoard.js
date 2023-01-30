import React from "react";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../features/authSlice";
import { selectAllUsers } from "../features/usersSlice";
import { getAnswerCount } from "../utils/getAnswerCount";
import { getCreatedCount } from "../utils/getCreatedCount";
import { getRankDesc } from "../utils/getRankDesc";

export default function LeaderBoard() {
  const users = useSelector(selectAllUsers);
  const authUser = useSelector(selectAuthUser);

  return (
    <div className="mx-auto h-full max-w-5xl px-4 md:px-8">
      <div className="sm:flex sm:items-center">
        <div className="pt-16 sm:flex-auto">
          <h1 className="text-3xl font-semibold text-slate-900">
            Leader Board
          </h1>
          <p className="mt-1 text-sm text-slate-700">
            The more questions you ask and answer, the higher up you move!
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden rounded-[5px] shadow-md ring-1 ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900">
                      Users
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-center text-sm font-semibold text-gray-900 sm:table-cell">
                      Answered
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-center text-sm font-semibold text-gray-900 sm:table-cell">
                      Created
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.sort(getRankDesc).map((user, i) => (
                    <tr
                      key={user.id}
                      className={`${
                        authUser.uid === user.id ? "bg-blue-50/70" : "bg-white"
                      }`}>
                      <td className="relative whitespace-nowrap py-4 pr-3 pl-12 text-sm">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              src={`https://api.dicebear.com/5.x/pixel-art/svg?seed=${
                                user?.username || user?.name
                              }`}
                              alt={user?.username}
                              className={`${
                                authUser.uid === user.id
                                  ? "ring-4 ring-green-400"
                                  : "bg-white"
                              } h-10 w-10 rounded-full object-cover`}
                            />
                          </div>
                          <div className="ml-2">
                            <div className="text-lg font-medium leading-[110%] text-slate-800">
                              {user.name}
                            </div>
                            <div className="text-gray-500">{user.username}</div>
                          </div>
                        </div>
                        <span className="absolute top-6 left-6 text-sm font-bold">
                          {i + 1}
                        </span>
                      </td>

                      <td className="tableData hidden sm:table-cell">
                        <span>{getAnswerCount(user)}</span>
                      </td>
                      <td className="tableData hidden sm:table-cell">
                        <span>{getCreatedCount(user)}</span>
                      </td>
                      <td className="tableData">
                        <span>
                          {getCreatedCount(user) + getAnswerCount(user)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
