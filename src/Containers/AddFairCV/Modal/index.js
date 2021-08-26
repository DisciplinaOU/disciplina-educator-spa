// @flow
import React from "react";
import Button from "../../../Common/Components/Button";
import "./styles.scss";

export const MODAL_CONTENT_STATE = {
  SUCCESS: "SUCCESS",
  DELETE: "DELETE",
  CLOSE: "CLOSE"
};

type ModalProps = {
  modalContent: string,
  submit: () => any,
  cancel: () => any
};

export const Modal = (props: ModalProps) => {
  const { modalContent, submit, cancel } = props;

  return (
    <div className="modal">
      <div className="modal__container">
        {
          {
            [MODAL_CONTENT_STATE.SUCCESS]: (
              <>
                <div className="modal__title">The FairCV has been created</div>
                <div className="modal__reminder reminder">
                  <div className="reminder__text">
                    <span />
                    <p>
                      The first minutes after creation, a new FairCV may not be validated due to delay of the confirm information in the blockchain.
                    </p>
                  </div>
                  <Button
                    text="Download PDF"
                    modWidth="width-auto"
                    modHeight="height-big"
                    modStyle="filled"
                    modColor="color-main"
                    callback={submit}
                  />
                  <Button
                    text="Close and return"
                    modWidth="width-auto"
                    modHeight="height-big"
                    modStyle="empty"
                    modColor="color-main"
                    callback={cancel}
                  />
                </div>
              </>
            ),
            [MODAL_CONTENT_STATE.CLOSE]: (
              <>
                <div className="modal__title">Do you really want to leave?</div>
                <p className="modal__text">All data will be lost</p>
                <Button
                  text="Leave"
                  modWidth="width-auto"
                  modHeight="height-big"
                  modStyle="filled"
                  modColor="color-red"
                  callback={submit}
                />
                <Button
                  text="Cancel"
                  modWidth="width-auto"
                  modHeight="height-big"
                  modStyle="empty"
                  modColor="color-main"
                  callback={cancel}
                />
              </>
            ),
            [MODAL_CONTENT_STATE.DELETE]: (
              <>
                <div className="modal__title">Do you really want to delete this rate?</div>
                <Button
                  text="Delete"
                  modWidth="width-auto"
                  modHeight="height-big"
                  modStyle="filled"
                  modColor="color-red"
                  callback={submit}
                />
                <Button
                  text="Cancel"
                  modWidth="width-auto"
                  modHeight="height-big"
                  modStyle="empty"
                  modColor="color-main"
                  callback={cancel}
                />
              </>
            )
          }[modalContent]
        }
      </div>
    </div>
  );
};

export default Modal;
