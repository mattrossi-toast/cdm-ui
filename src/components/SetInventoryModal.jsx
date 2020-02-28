import React from "react";
import PropTypes from "prop-types";
import getItems from "../services/itemService";

class Modal extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    const backdropStyle = {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0,0,0,0.3)",
      padding: 50
    };

    const modalStyle = {
      backgroundColor: "#fff",
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: "0 auto",
      padding: 30
    };

    return (
      <div className="backdrop" style={{ backdropStyle }}>
        <div className="modal" style={{ modalStyle }}>
          {this.props.children}

          <div className="footer">
            <button onClick={this.props.onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }
  async componentDidMount() {
    var items = await getItems(
      "https://39em985zy4.execute-api.us-east-1.amazonaws.com/prod/c4e0077c-3f5f-48ed-a423-bb58d6de47db"
    ).then(response =>
      response.json().then(json => {
        console.log(json);
        return json;
      })
    );
    console.log(items);
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
