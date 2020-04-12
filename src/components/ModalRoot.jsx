import React from 'react';
import { useSelector } from 'react-redux';
import { CartModal } from './CartModal';

const MODAL_COMPONENTS = {
  CART: CartModal,
};

export const ModalRoot = () => {
  const modalType = useSelector((state) => state.modal.modalType);
  const modalProps = useSelector((state) => state.modal.modalProps);

  if (!modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal {...modalProps} />;
};
