import { useEffect, useState } from "react";
import axios from "axios";

interface SearchProps {
  setCity: React.Dispatch<React.SetStateAction<string>>;
  searchClick: boolean;
  setSearchClick: React.Dispatch<React.SetStateAction<boolean>>;
}

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export const Search: React.FC<SearchProps> = ({
  setCity,
  searchClick,
  setSearchClick,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);

  const debouncedQuery = useDebounce(query, 400);

  // Run search when debounced value updates
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setSearching(false);
      return;
    }
    async function getSearchesForCity(cityName: string) {
      try {
        setSearching(true);

        const response = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
        );
        setSearching(false);
        const searchData = response.data;

        if (searchData && searchData.results.length > 0) {
          const cityNames = searchData.results.map((item: any) => item.name);
          return [...new Set(cityNames)];
        } else {
          return [];
        }
      } catch (error) {
        setSearching(false);
        return null;
      }
    }
    if (!searchClick) {
      getSearchesForCity(debouncedQuery).then((res) => {
        if (res) setResults(res);
      });
    }
  }, [debouncedQuery]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Check if the pressed key is 'Enter'
    if (event.key === "Enter" && query !== "") {
      event.preventDefault(); // Prevent default form submission behavior if wrapped in a form
      setSearchClick(true);
      setCity(query);
      setShowSuggestions(false);
    }
  };
  return (
    <div className="flex items-center space-x-4 w-full flex-col justify-center mt-2 mb-4 gap-y-3 md:flex-row xl:flex-row lg:flex-row 2xl:flex-row">
      <div className="relative flex bg-[#25253f] rounded-lg w-full ml-4 max-w-xl">
        <span className="absolute inset-y-0 flex items-center pl-3 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
            />
          </svg>
        </span>

        <input
          id="searchCity"
          type="text"
          placeholder="Search for a place..."
          value={query}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          className="w-full pl-10 pr-4 py-2 border border-[#25253f] rounded-lg text-[#e7e9ec] placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-[#e7e9ec]"
        />
        {showSuggestions && (
          <ul
            id="suggestions"
            style={{ fontFamily: "dm-sans" }}
            className="absolute min-w-full bg-[#25253F] border border-[#363650] mt-12 rounded-lg shadow-lg max-h-48 overflow-y-auto custom-scrollbar"
          >
            {query.trim() === "" ? (
              <li className="p-2 text-[#e7e9ec] italic select-none">
                Start typing to search
              </li>
            ) : results.length > 0 && !searching ? (
              results.map((item: string) => (
                <li
                  key={item}
                  onClick={() => {
                    setSearchClick(true);
                    setQuery(item);
                    setCity(item);
                    setShowSuggestions(false);
                  }}
                  className="m-2 p-2 hover:bg-[#2f2f49] cursor-pointer transition text-[#e7e9ec] rounded-md"
                >
                  {item}
                </li>
              ))
            ) : searching ? (
              <li className="p-2 text-[#e7e9ec] text-sm flex flex-row gap-x-2">
                <img
                  src="../../assets/images/icon-loading.svg"
                  alt="loading"
                  className="h-auto w-4"
                />
                Search in Progress
              </li>
            ) : (
              !searching &&
              debouncedQuery.trim() !== "" && (
                <li className="p-2 text-[#e7e9ec] select-none">
                  No results found
                </li>
              )
            )}
          </ul>
        )}
      </div>

      <button
        id="searchCityButton"
        style={{
          fontFamily: "dm-sans",
          outline: "none",
        }}
        onClick={() => {
          if (query !== "") {
            setSearchClick(true);
            setCity(query);
            setShowSuggestions(false);
          }
        }}
        className="px-5 py-2 max-w-xl md:w-24 lg:w-24 xl:w-24 2xl:w-24 bg-[#4657d8] w-full text-white font-medium rounded-lg hover:bg-blue-600 transition-all focus:outline-none border-none focus:ring-2 focus:ring-[#4657d8] focus:ring-offset-2 focus-visible:outline-none"
      >
        Search
      </button>
    </div>
  );
};
