import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomButton from '../../components/CustomButton/CustomButton';
import './Modal.styles.css';

const backdropVariance = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const Modal = ({ modalIsOpen, closeModal, verifymodal, noverifymodal, tokenexpiremodal }) => {
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
                  {noverifymodal ? (
                    <div>
                      <h2 className="modalHeading">Sorry!</h2>
                      <p className="modalPara">
                        Your Arkvl account couldn't be verified!
                        </p>
                    </div>
                  ) : (
                      <div>
                        {tokenexpiremodal ? (
                          <div>
                            <h2 className="modalHeading">Sorry!</h2>
                            <p className="modalPara">
                              This token has expired!
                                </p>
                          </div>
                        ) : (
                            <div>
                              <h2 className="modalHeading">Welcome to Arkvl!</h2>
                              <p className="modalPara">
                                Rate your favourite books to get personalized recommendations!
                                  </p>
                            </div>
                          )}

                      </div>
                    )}


                </div>


              )}
            {tokenexpiremodal ? (
              <CustomButton style={{ margin: 'auto' }} onClick={closeModal} small>
                Get a new token
              </CustomButton>
            ) : (
                <CustomButton style={{ margin: 'auto' }} onClick={closeModal} small>
                  Okay
                </CustomButton>
              )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence >
  );
};

export default Modal;
