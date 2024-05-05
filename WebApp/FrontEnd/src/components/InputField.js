import React from "react";
import styled from "styled-components";
import useInput from "./useInput";

const InputField = ({handleMarker}) => {
  const address = useInput("");

  return (
    <Wrapper>
      <Input
        placeholder="Enter Location here"
        
        {...address}
        isTyping={address.value !== ""}
      />
      {address.suggestions?.length > 0 && (
        <ul className="suggestionWrapper">
          {address.suggestions.map((suggestion, index) => {
            return (
              <li
                key={index}
                className="suggestion"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click event from bubbling up
                  address.setValue(suggestion.place_name);
                  handleMarker(suggestion.center);
                  address.setSuggestions([]);
                }}
              >
                {suggestion.place_name}
              </li>
            );
          })}
        </ul>
      )}
    </Wrapper>
  );
};

export default InputField;

const Wrapper = styled.div`
  margin: 0 auto;
`;

const Input = styled.input`
  width: 350px;
  background: #fff;
  color: #333;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  position: relative;
  display: block;
  margin: 3px auto;
  transition: border-radius 0.3s ease;
  text-align: left;
  font-size: 16px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-radius: ${(props) => (props.isTyping ? "10px 10px 0px 0px" : "30px")};
  }
`;

