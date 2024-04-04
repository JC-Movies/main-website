"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import SmallSearch from "./small-screens/sm-search";
import MiniSearchBar from "./mini-search";

const SearchBar = () => {
  const matches = useMediaQuery("( min-width: 768px )");

  return matches ? <MiniSearchBar /> : <SmallSearch />;
};
export default SearchBar;
