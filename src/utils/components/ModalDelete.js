import React from 'react';
import '../styles/ModalDelete.css';
import PropTypes from 'prop-types';

export default class ModalDelete extends React.PureComponent {
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modalDelete">
        <div className="modalDeleteBox" id="modal">
          <div className="modalDeleteTitle">
            <h2> {this.props.title} </h2>
          </div>
          <div className="modalDeleteText">
            <h2>{this.props.children}</h2>
          </div>
          <div className="modalDeleteActions">
            <div className="modalDeleteNot">
              <button type="button" onClick={this.props.onClose}>
                <strong> NÃO </strong>
              </button>
            </div>
            <div className="modalDeleteYes">
              <button type="button" onClick={this.props.onConfirm}>
                <strong> SIM </strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ModalDelete.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};