import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import './skeleton.styles.css';
const BookDirectorySkeleton = () => (
  <SkeletonTheme
    color="var(--bg-secondary)"
    highlightColor="var(--highlight-color)"
  >
    <div className="encloseSkeleton">
      <Skeleton count={1} className="skeletonimage" />
      <div className="skeletontitle">
        <Skeleton count={1} height={18} width={118} />
      </div>
      <div className="skeletonauthor">
        <Skeleton count={2} height={15} className="skeletonauthors" />
      </div>
    </div>
  </SkeletonTheme>
);

export default BookDirectorySkeleton;
