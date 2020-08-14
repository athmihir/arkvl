import React, { Component } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import '../../pages/BookSummary/BookSummary.styles.css';
import { isMobile } from 'react-device-detect';
class SummarySkeleton extends Component {
  render() {
    return (
      <div className="book-summary-container">
        <div className="book-image-container">
          <div className="skeletonImage">
            <SkeletonTheme
              color="var(--bg-secondary)"
              highlightColor="var(--highlight-color)"
            >
              {isMobile ? (
                <Skeleton height={250} width={220} />
              ) : (
                <Skeleton height={450} width={310} />
              )}
            </SkeletonTheme>
          </div>

          <div>
            <div className="skeletonRating">
              <SkeletonTheme
                color="var(--bg-secondary)"
                highlightColor="var(--highlight-color)"
              >
                <Skeleton height={30} width={220} />
              </SkeletonTheme>
            </div>
          </div>
        </div>

        <div className="skeletonDetails">
          <SkeletonTheme
            color="var(--bg-secondary)"
            highlightColor="var(--highlight-color)"
          >
            <Skeleton count={1} height={40} />
            <div className="skeletonAuthor">
              <Skeleton count={1} height={20} />
            </div>
            <div className="skeletonGenre">
              <Skeleton count={1} height={20} />
            </div>
            <div className="skeletonAbout">
              <Skeleton count={10} />
            </div>
          </SkeletonTheme>
        </div>
      </div>
    );
  }
}

export default SummarySkeleton;
