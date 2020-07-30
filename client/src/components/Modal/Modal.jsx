import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomButton from '../../components/CustomButton/CustomButton';
import './Modal.styles.css';

const backdropVariance = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const Modal = ({ modalIsOpen, closeModal, verifymodal }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {modalIsOpen && (
        <motion.div
          className="backdrop"
          variants={backdropVariance}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ ease: 'easeOut', duration: 0.4 }}
        >
          <motion.div className="modal" animate={{ y: [-50, 0] }}>
            {verifymodal ? (
              <div>
                <h2 className="modalHeading">
                  Your Arkvl account has been successfully verified!
                </h2>
              </div>
            ) : (
              <div>
                <h2 className="modalHeading">Welcome to Arkvl!</h2>
                <p className="modalPara">
                  Rate your favourite books to get personalized recommendations!
                </p>
              </div>
            )}
            <CustomButton style={{ margin: 'auto' }} onClick={closeModal} small>
              Okay
            </CustomButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
