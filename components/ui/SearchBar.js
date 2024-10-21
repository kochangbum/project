import React, { useState, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import styled from "styled-components";

// SearchBar 스타일 정의
const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

// SearchBar 컴포넌트: 검색 바 구현
const SearchBar = ({
  searchTerm,
  searchCategory,
  onSearch,
  searchCategories = [],
}) => {
  const [searchState, setSearchState] = useState({
    searchTerm: searchTerm || "",
    searchCategory: searchCategory || searchCategories[0]?.value || "",
  });

  useEffect(() => {
    setSearchState({
      searchTerm: searchTerm || "",
      searchCategory: searchCategory || searchCategories[0]?.value || "",
    });
  }, [searchTerm, searchCategory, searchCategories]);

  const handleSearch = () => {
    onSearch(searchState.searchTerm, searchState.searchCategory);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <SearchBarContainer>
      {/* 검색 카테고리가 있을 때만 렌더링 */}
      {searchCategories.length > 0 && (
        <Input
          type="select"
          value={searchState.searchCategory}
          name="searchCategory"
          onChange={handleInputChange}
          $inputType="search"
          options={searchCategories} // 카테고리 옵션 전달
        />
      )}

      {/* 검색어 입력 필드 */}
      <Input
        type="text"
        placeholder="검색어를 입력해 주세요."
        value={searchState.searchTerm}
        name="searchTerm"
        onChange={handleInputChange}
        $inputType="search"
      />

      {/* 검색 버튼 */}
      <Button
        children="검색"
        type="button"
        onClick={handleSearch} // 검색 실행
        $buttonType="search"
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
