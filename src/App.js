import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import moment from "moment";

function App() {
  const [data, setdata] = useState([]);
  const [userInput, setuserInput] = useState("");
  const [loading, setloading] = useState(false);



  useEffect(() => {

    function trendingNewsData(){
      const options = {
        method: "GET",
        url: "https://bing-news-search1.p.rapidapi.com/news",
        params: { textFormat: "Raw", safeSearch: "Off" },
        headers: {
          "X-BingApis-SDK": "true",
          "X-RapidAPI-Key":
            "d2b909b39emshca8209a7d8c3aa9p1f2000jsn16e8f798f2ff",
          "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
        },
      };
  
      axios
        .request(options)
        .then(function (response) {
          setdata(response.data.value);
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    trendingNewsData();
  }, [])

  const getNewsData = (e) => {
    e.preventDefault();

    const options = {
      method: "GET",
      url: "https://bing-news-search1.p.rapidapi.com/news/search",
      params: {
        q: userInput,
        freshness: "Day",
        textFormat: "Raw",
        safeSearch: "Off",
      },
      headers: {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Key": "d2b909b39emshca8209a7d8c3aa9p1f2000jsn16e8f798f2ff",
        "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
      },
    };
    setloading(true);
    axios
      .request(options)
      .then(function (response) {
        setloading(false);
        setdata(response.data.value);
        console.log(response.data);
      })
      .catch(function (error) {
        setloading(false);
        console.error(error);
      });
  };
  return (
    <div>
      <form onSubmit={getNewsData}>
        <input
          type="text"
          placeholder="Enter your topic"
          onChange={(e) => {
            setuserInput(e.target.value);
          }}
        />
        <button type="submit">Get News</button>
      </form>
      <div className='flex'>
        {loading ? "loading..." : ""}

        {data.map((eachPost) => (
          <div className="post" key={eachPost?.name}>
            <a
              className="title"
              href={eachPost?.url}
              target="_blank"
              rel="noreferrer"
            >
              {eachPost?.name}
            </a>

            <span>
              {moment(eachPost?.datePublished).format("Do MMMM, h:mm a")}
            </span>

            <h3>{eachPost?.description}</h3>

            <img
              src={eachPost?.image?.thumbnail?.contentUrl
                .replace("&pid=News", "")
                .replace("pid=News&", "")
                .replace("pid=News", "")}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
