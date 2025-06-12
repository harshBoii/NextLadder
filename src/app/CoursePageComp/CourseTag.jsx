import React from 'react';

const CourseTag = ({tag, icon}) => {
  return (
    <div className="flex flex-wrap gap-2">
        <div
          className="px-3 py-1 text-[1.5vh] text-bold rounded-full transition-colors flex items-center gap-1.5"
          style={{
            backgroundColor: 'rgba(172, 188, 254, 0.13)',
            color: 'rgb(255, 255, 255)'
          }}
        >
          {icon && <span className="text-base">{icon}</span>}
          {tag}
        </div>
    </div>
  );
};

export default CourseTag;
