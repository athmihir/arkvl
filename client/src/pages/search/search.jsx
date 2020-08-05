import React, { useEffect } from 'react';
import Search from '../../components/Search/Search';
import { motion } from 'framer-motion';
import './search.styles.css';
const SearchPage = ({ pageVariants, pageTransition }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Arkvl';
  }, []);
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="search-page"
    >
      <h1>Search for your favorite books</h1>
      <Search large />
    </motion.div>
  );
};
export default SearchPage;
