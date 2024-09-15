import React, { useState } from 'react';
import { Avatar, ActionIcon } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

const AvatarEdit = ({ src, onChange, setIsDataChanged }) => {
  const [preview, setPreview] = useState(src || "");

  const handleImageChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      onChange(file);
      setIsDataChanged(true); // Set data changed to true
    } else {
      setPreview("");
      onChange(null);
      setIsDataChanged(true); // Set data changed to true even when clearing the image
    }
  };

  return (
    <div className="relative group w-max rounded-full">
      <Avatar
        variant="light"
        size="xl"
        src={preview}
      />
      <div className="flex gap-2 justify-center items-center backdrop-blur-sm absolute top-0 right-0 bottom-0 left-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ActionIcon variant="light" color="blue" size="lg">
          <label htmlFor="file-input">
            <IconEdit size={24} />
          </label>
        </ActionIcon>
        <ActionIcon variant="light" color="red" size="lg" onClick={() => handleImageChange(null)}>
          <IconTrash size={24} />
        </ActionIcon>
      </div>
      <input
        id="file-input"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => handleImageChange(e.target.files[0])}
      />
    </div>
  );
};

export default AvatarEdit;