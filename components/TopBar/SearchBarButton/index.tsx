import React from "react";

import { FaSearch } from "react-icons/fa";

const SearchBarButton: React.FC = () => (
  <>
    <FaSearch size={12} />
    <p className="px-2">Search</p>
  </>
);

export default SearchBarButton;
