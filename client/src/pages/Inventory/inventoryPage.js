import React, { Component } from "react";
import NavBar from "../../components/Navbar";
import AddTab from "../../components/AddTab";
import AddItem from "../../components/AddItem";
import Truck from "../../components/Truck";
import CenteredTabs from "../../components/NavbarTab";
import axios from "axios";

class Inventory extends Component {
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

  // fetch items

  render() {
    return (
      <div>
        <NavBar />
        <AddTab />
        <CenteredTabs
          items={this.state.items}
          tabs={this.state.tabs}
          handleGetTabs={this.handleGetTabs}
        />
        <AddItem />
        <Truck />
      </div>
    );
  }
}

export default Inventory;
