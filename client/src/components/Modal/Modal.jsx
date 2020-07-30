import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomButton from '../../components/CustomButton/CustomButton';
import './Modal.styles.css';

const backdropVariance = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
}

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
                    transition={{ ease: "easeOut", duration: 2 }}
                >
                    <motion.div className="modal" animate={{ y: [-50, 0] }}>
                        {verifymodal ? (
                            <div>
                                <h2 className="modalHeading">Your Arkvl account has been successfully verified!</h2>
                                <CustomButton style={{ margin: 'auto' }} onClick={closeModal}>
                                    Okay
                                </CustomButton>
                            </div>
                        ) : (
                                <div>
                                    <h2 className="modalHeading">Welcome to Arkvl!</h2>
                                    <p className="modalPara">Rate your favourite books to get personalized recommendations!</p>
                                    <CustomButton style={{ margin: 'auto' }} onClick={closeModal}>
                                        Okay
                                    </CustomButton>
                                </div>
                            )}

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Modal;