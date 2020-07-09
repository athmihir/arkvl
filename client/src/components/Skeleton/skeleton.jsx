import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import './skeleton.styles.css';
const BookDirectorySkeleton = () => (
  <SkeletonTheme
    color="var(--bg-secondary)"
    highlightColor="var(--highlight-color)"
  >
    <div className="skeletonimage">
      <Skeleton count={1} height={326} width={217} />
    </div>
    <div className="skeletontitle">
      <Skeleton count={1} height={18} width={118} />
    </div>
    <div className="skeletonauthor">
      <Skeleton count={2} height={15} width={200} />
    </div>
  </SkeletonTheme>
);

export default BookDirectorySkeleton;
