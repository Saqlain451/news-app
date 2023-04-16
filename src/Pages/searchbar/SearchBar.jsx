import React from "react";
import { BiSearch } from "react-icons/bi";
import { useGlobalHook } from "../../Hooks/Context";
import { MdKeyboardVoice } from "react-icons/md";
import "./searchbar.css";
const SearchBar = () => {
  const { changeHandle, change, clickHandle, toggle, isListen, transcript } =
    useGlobalHook();

  return (
    <>
      <section className="search">
        <div className="search-bar">
          <form action="" onSubmit={toggle}>
            <input
              type="text"
              name="input"
              placeholder="Search a news here..."
              value={isListen ? transcript : change}
              onChange={changeHandle}
              autoComplete="off"
            />
            <button>
              <MdKeyboardVoice />
            </button>
          </form>

          <button className="btn-search" onClick={clickHandle}>
            <BiSearch />
          </button>
        </div>
      </section>
    </>
  );
};

export default SearchBar;
