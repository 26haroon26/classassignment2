import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import moment from "moment";

function App() {
  const [data, setdata] = useState([]);
  const [userInput, setuserInput] = useState("");
  // const [loading, setloading] = useState(false);



  useEffect(() => {

    function trendingNewsData() {
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
    // setloading(true);
    axios
      .request(options)
      .then(function (response) {
        // setloading(false);
        setdata(response.data.value);
        console.log(response.data);
      })
      .catch(function (error) {
        // setloading(false);
        console.error(error);
      });
  };
  return (
    <div>
      <form onSubmit={getNewsData} className='form'>
        <input className="input"
          type="text"
          placeholder="Enter your topic"
          onChange={(e) => {
            setuserInput(e.target.value);
          }}
        />
        <button type="submit" className="button">Get News</button>
      </form>
      {/* {loading ? "loading..." : ""} */}
      <div className="body">
        <div className="leftside">
          <h2>
            Category
          </h2>
          <hr />
          <p>Sports</p>
          <p>Politics</p>
          <p>National</p>
          <p>Business</p>
          <p>Finance</p>
          <p>Health Care</p>
          <p>Technology</p>
          <p>Media</p>
          <p>Jobs</p>
        </div>
        <div className='flex'>

          {data.map((eachPost) => (
            <div className="post" key={eachPost?.name}>
              <div className="postText">
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

                <h3 className="postDescr">{eachPost?.description}</h3>
              </div>

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
        <div className="detail">
          <div className="detailDiv">
            <h3>
              Sports
            </h3>
            <hr />
            <p>
              England suffer ANOTHER blow at right-back with Kyle Walker-Peters a major doubt
              Former world No 1 Simona Halep suspended after positive doping test
              'When you are there you have to be there as long as possible': Granit Xhaka urges Arsenal to maintain top spot in the Premier League before the World Cup, insisting 'it has to ...
              World Cup fans could bring political tensions to quiet Qatar
              Newsmax cuts ties with Lara Logan after she said world leaders dine on the blood of children
              Rugby League World Cup: England v France sees 'friendships on hold'
              Former world number one Halep provisionally suspended for doping
              Spurs could be without Kulusevski until after World Cup - Conte
              Stromae Is Singing for the Whole World
              Former world No. 1 Simona Halep provisionally suspended after testing positive for banned substance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
