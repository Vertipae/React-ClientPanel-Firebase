import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class Clients extends Component {
  state = {
    totalowed: null
  };

  // Gets clients when they come in and loops through them
  // Adds all the balances together to get total
  static getDerivedStateFromProps(props, state) {
    // Get clients from firestore (props) // Inside this method no this.props
    const { clients } = props;
    // Checking that there are clients
    if (clients) {
      // Add balances
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0); // starting parameter 0

      // return state totalOwed
      return { totalOwed: total };
    }
    // if there isn't clients return null (state)
    return null;
  }
  render() {
    const { clients } = this.props;
    // Pulling totalOwed out of the state
    const { totalOwed } = this.state;

    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                {" "}
                <i className="fas fa-users" /> Clients{" "}
              </h2>
            </div>
            <div className="cold-md-6">
              <h5 className="text-right text-secondary">
                Total Owed{" "}
                <span className="text-primary">
                  €{parseFloat(totalOwed).toFixed(2)}
                </span>
              </h5>
            </div>
          </div>
          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>
                    {client.firstName} {client.lastName}
                  </td>
                  <td>{client.email}</td>
                  <td>€{parseFloat(client.balance).toFixed(2)}</td>
                  <td>
                    <Link
                      to={`/client/${client.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <i className="fas fa-arrow-circle-right" /> Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  // Don't need is required because it is going to give an error
  clients: PropTypes.array
};

// export default Clients;
// Redux panel tree firestore -> ordered -> clients
export default compose(
  firestoreConnect([{ collection: "clients" }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);
