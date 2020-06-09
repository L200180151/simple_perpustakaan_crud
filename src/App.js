import React, { useState } from 'react';
import './App.css';
import { store } from './actions/store';
import { Provider } from 'react-redux';
import Members from './components/member/Members';
import Buku from './components/buku/Buku';
import Peminjaman from './components/Peminjaman';
import {
  Container,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
} from '@material-ui/core';
import { ToastProvider } from 'react-toast-notifications';

function TabPanel(props) {
  const { children, value, index } = props;
  console.log(value);
  return (
    <Typography
      component="span"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      // aria-labelledby={`simple-tab-${index}`}
    >
      <Box>{value === index && children}</Box>
    </Typography>
  );
}

const App = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true}>
        <Container maxWidth="lg">
          <AppBar position="static">
            <Tabs
              value={value}
              aria-label="simple tabs example"
              onChange={handleChange}
            >
              <Tab label="Member" />
              <Tab label="Buku" />
              <Tab label="Peminjaman" />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Members />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Buku />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Peminjaman />
          </TabPanel>
        </Container>
      </ToastProvider>
    </Provider>
  );
};

export default App;
