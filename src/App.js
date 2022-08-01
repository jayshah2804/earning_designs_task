import { useEffect, useState } from "react";

let header = "All";
function App() {
  const [data, setData] = useState();
  const [apires, setApires] = useState();
   
  useEffect(() => {
    async function func() {
      const res = await fetch("https://slightbrilliantdribbleware.jayshah280420.repl.co/");
      const resdata = await res.json();
      setApires(resdata);
      setData(resdata);
    }
    func();
  },[]);

  const searchHandler = (e) => {
    if (e.target.value === "") {
        setData(data);
    }
    const filteredData = apires.filter((item) =>
      item.alt.toLowerCase().includes((e.target.value).toLowerCase())
    );
    setData(filteredData);
  };

  const buttonClickHandler = (e) => {
    if(e.target.type){
      header = e.target.innerText;
      searchHandler({target: {value: header}});
    }
  }
  return (
    <div>
      <input type="text" onChange={searchHandler} style={{display: "block"}} />
      <div onClick={buttonClickHandler}>
      <button>Mountain</button>
      <button>Beach</button>
      <button>Bird</button>
      <button>Food</button>
      </div>
      <h2>{header} Pictures</h2>
      {data && data.map((ele, index) => <img src={ele.url} alt={ele.alt} key={index} style={{width: "320px", height: "320px"}}/>)}
    </div>
  );
}

export default App;
