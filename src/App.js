import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState();
  const [apires, setApires] = useState();

  useEffect(() => {
    async function func() {
      const res = await fetch(
        "https://slightbrilliantdribbleware.jayshah280420.repl.co/",{
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
      }
      );
      const resdata = await res.json();
      setApires(resdata);
    }
    func();
  },[]);

  const searchHandler = (e) => {
    if (e.target.value === "") {
      setData(data);
    }
    const filteredData = apires.filter((item) =>
      item.alt.toLowerCase().includes(e.target.value)
    );
    setData(filteredData);
  };
  return (
    <div>
      {console.log(data)}
      {data && data.map(ele => <img src={ele.url} alt={ele.alt} />)}
      <input type="text" onChange={searchHandler} />
    </div>
  );
}

export default App;
