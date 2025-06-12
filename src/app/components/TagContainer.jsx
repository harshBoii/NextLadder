import React from 'react';

const TagContainer = ({tag}) => {
  return (
    <div className="flex flex-wrap gap-2">
     
        <div
          className="px-3 py-1 text-sm rounded-full transition-colors"
          style={{
            backgroundColor: 'rgba(47, 87, 239, 0.13)',
            color: 'rgba(47, 87, 239, 1)'
          }}
        >
          {tag}
        </div>

    </div>
  );
};

export default TagContainer;
