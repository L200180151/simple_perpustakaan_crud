import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMembers, deleteMember } from '../../actions/members';
import {
  Grid,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  withStyles,
  ButtonGroup,
  Button,
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import MembersForm from './MembersForm';
import { useToasts } from 'react-toast-notifications';

const styles = (theme) => ({
  root: {
    '& .MuiTableCell-head': {
      fontSize: '1.25rem',
    },
  },
  paper: {
    margin: theme.spacing(4),
    padding: theme.spacing(4),
  },
});

const Members = ({ classes, ...props }) => {
  const { addToast } = useToasts();

  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.fetchAllMembers();
  }, []);

  const onDelete = (id) => {
    if (window.confirm('Hapus member?'))
      props.deleteMemberRecord(id, () => {
        addToast('Berhasil menghapus member', { appearance: 'info' });
      });
  };

  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container>
        <Grid item xs={6}>
          <MembersForm {...{ currentId, setCurrentId }} />
        </Grid>
        <Grid item xs={6}>
          <TableContainer>
            <TableHead className={classes.root}>
              <TableRow>
                <TableCell>Nama</TableCell>
                <TableCell>Alamat</TableCell>
                <TableCell>No HP</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.membersList.map((record) => {
                return (
                  <TableRow key={record.id_member} hover>
                    <TableCell>{record.nama}</TableCell>
                    <TableCell>{record.alamat}</TableCell>
                    <TableCell>{record.no_hp}</TableCell>
                    <TableCell>
                      <ButtonGroup variant="text">
                        <Button>
                          <Edit
                            color="primary"
                            onClick={() => {
                              setCurrentId(record.id_member);
                            }}
                          />
                        </Button>
                        <Button>
                          <Delete
                            color="secondary"
                            onClick={() => {
                              onDelete(record.id_member);
                            }}
                          />
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    membersList: state.membersRequest.list,
  };
};

const mapDispatchToProps = {
  fetchAllMembers: fetchMembers,
  deleteMemberRecord: deleteMember,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Members));
