import React, { Component } from "react";
import NavBar from "../../components/Navbar";
import Cart from "../../components/Cart";
import CenteredTabs from "../../components/NavbarTab";
import axios from "axios";

class Home extends Component {
  state = {
    tabId: [],
    tabs: [],
    items: []
  };
  handleGetTabs = _ => {
    axios
      .get(`/tab/${localStorage.getItem("company")}`)
      .then(({ data }) => {
        const tabIdArr = [];
        data.map(tab => {
          return tabIdArr.push(tab._id);
        });
        this.setState({ ...this.state, tabs: data, tabId: tabIdArr });
        this.state.tabId.map(id => {
          return axios
            .get(`/item`, {
              tabs: id
            })
            .then(({ data }) => {
              this.setState({ ...this.state, items: data });
            })
            .catch(e => console.log(e));
        });
      })
      .catch(e => console.log(e));
  };

  render() {
    return (
      <div>
        <NavBar />
        <Cart />
        <CenteredTabs
          items={this.state.items}
          tabs={this.state.tabs}
          handleGetTabs={this.handleGetTabs}
        />
      </div>
    );
  }
}

export default Home;
