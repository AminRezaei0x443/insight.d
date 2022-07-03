import React from "react";

const PostHeader = ({ username: user }: any) => (
  <header className="w-full blue-bg text-white">
    <div className="flex px-4 max-width-main mx-auto flex-row items-center lg:w-auto lg:mx-12 sm:mx-6 sm:px-0">
      <div>
        <a href={`/u/${user}`}>
          <h1 className="tracking-wide text-white heading-font">{`u/${user}`}</h1>
        </a>
      </div>
      <nav className="flex justify-between items-center flex-row leading-4 flex-grow py-2">
        <div></div>
        <div>
        <a href={`/u/${user}`}>
          <button className="my-2 p-1 px-3 text-sm cursor-pointer max-w-full btn-outline-white rounded">
            Visit
          </button>
          </a>
        </div>
      </nav>
    </div>
  </header>
);

export default PostHeader;
