import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiData, myImageSliceActions } from "./Store/store";
import { FaSearch } from "react-icons/fa";
import "./App.css";

let flag = true;
let header = "All";

function App() {
  const myData = useSelector((state) => state);
  const dispatch = useDispatch();
  const [apires, setApires] = useState();
  const [isLoding, setIsLoading] = useState(true);

  useEffect(() => {
    if (flag) {
      async function func() {
        const res = await fetch(
          "https://slightbrilliantdribbleware.jayshah280420.repl.co/"
        );
        const resdata = await res.json();
        setIsLoading(false);
        setApires(resdata);
      }
      func();
      flag = false;
      dispatch(apiData());
      return;
    }
  }, [dispatch]);

  const searchHandler = (e, type) => {
    if (!type) header = "All";
    dispatch(myImageSliceActions.search(e.target.value));
  };

  const buttonClickHandler = (e) => {
    if (e.target.type) {
      header = e.target.innerText;
      searchHandler({ target: { value: header } }, { type: "redirected" });
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        onChange={searchHandler}
        className="searchField"
        placeholder="Search..."
      />
      <FaSearch className="icon" />
      <div onClick={buttonClickHandler}>
        <button>Mountain</button>
        <button>Beach</button>
        <button>Bird</button>
        <button>Food</button>
      </div>
      <h2>{header} Pictures</h2>
      {isLoding && <h2>Loading Data...</h2>}
      {!isLoding && (
        <div>
          {(myData[0].url ? myData : apires) &&
            (myData[0].url ? myData : apires).map((ele, index) => (
              <img
                src={ele.url}
                alt={ele.alt}
                key={index}
                style={{ width: "320px", height: "320px" }}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default App;
