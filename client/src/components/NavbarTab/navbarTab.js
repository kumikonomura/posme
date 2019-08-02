import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ItemCardList from "../Card";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

export default function CenteredTabs(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [tabId, setTabId] = useState(0);

  useEffect(() => {
    props.handleGetTabs({});
  }, []);

  function handleChange(event, newValue) {
    setTabId(event.currentTarget.id);
    setValue(newValue);
  }

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        onClick={props.handleGetTabs}
        indicatorColor="primary"
        textColor="primary"
      >
        {props.tabs.map((tabs, i) => {
          return <Tab id={tabs._id} label={tabs.name} />;
        })}
      </Tabs>
      {
        <ItemCardList
          items={props.items.filter(x => x.tab === tabId)}
          tabs={props.tabs}
          handleGetTabs={props.handleGetTabs}
        />
      }
    </Paper>
  );
}
