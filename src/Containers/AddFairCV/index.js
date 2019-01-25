// @flow
import React, { PureComponent } from 'react';
import './styles.scss';
import Button from '../../Common/Components/Button';
import RegularInput from '../../Common/Components/RegularInput';

export class AddFairCV extends PureComponent <AddFairCVProps, AddFairCVState> {
  render() {
    return (
      <div className="add-form">
        <div className="add-form__navigation-link text-left">
          <Button
            text="Вернуться к списку"
            modWidth="width-auto"
            modHeight="height-big"
            modStyle="arrow-back"
            modColor="color-main"
          />
        </div>
        <h1 className="add-form__title">Добавление FairCV</h1>
        <form>
          <div className="add-form__person">

          </div>
          <RegularInput />
        </form>
      </div>
    );
  }
};

export default AddFairCV;
