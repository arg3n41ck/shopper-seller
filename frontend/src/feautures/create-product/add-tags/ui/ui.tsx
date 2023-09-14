import TextField from "@/shared/ui/textField";
import React, { useState } from "react";
import { X } from "react-feather";
import {
  AddTagsContainer,
  TagBlock,
  TagCloseButton,
  TagText,
  TagsContainer,
} from "./styles";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

export const AddTagInput: React.FC<TagInputProps> = ({ tags, onChange }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      onChange([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    onChange(updatedTags);
  };

  return (
    <AddTagsContainer>
      <TextField
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
        placeholder="Добавьте тэги для поиска"
      />

      <TagsContainer>
        {tags.map((tag, index) => (
          <TagBlock key={index}>
            <TagText>{tag}</TagText>
            <TagCloseButton onClick={() => handleTagRemove(tag)}>
              <X size={16} />
            </TagCloseButton>
          </TagBlock>
        ))}
      </TagsContainer>
    </AddTagsContainer>
  );
};
