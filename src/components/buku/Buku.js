import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBuku, deleteBuku } from '../../actions/buku';
import { createPeminjaman } from '../../actions/peminjaman';
import BukuForm from './BukuForm';
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
import { Edit, Delete, Add } from '@material-ui/icons';
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

const Buku = ({ classes, ...props }) => {
  const { addToast } = useToasts();

  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.fetchAllBuku();
  }, []);

  const onDelete = (id) => {
    if (window.confirm('Hapus buku?'))
      props.deleteBukuRecord(id, () => {
        addToast('Berhasil menghapus buku', { appearance: 'info' });
      });
  };

  const onAddPeminjaman = (id) => {
    if (window.confirm('pinjam buku?'))
      props.createNewPeminjaman(id, () => {
        addToast('Berhasil meminjam buku', { appearance: 'success' });
      });
  };

  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container>
        <Grid item xs={6}>
          <BukuForm {...{ currentId, setCurrentId }} />
        </Grid>
        <Grid item xs={6}>
          <TableContainer>
            <TableHead className={classes.root}>
              <TableRow>
                <TableCell>Judul</TableCell>
                <TableCell>Pengarang</TableCell>
                <TableCell>Tahun Terbit</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.bukuList.map((record) => {
                return (
                  <TableRow key={record.id_buku} hover>
                    <TableCell>{record.judul}</TableCell>
                    <TableCell>{record.pengarang}</TableCell>
                    <TableCell>{record.tahun_terbit}</TableCell>
                    <TableCell>
                      <ButtonGroup variant="text">
                        <Button>
                          <Add
                            color="action"
                            onClick={() => {
                              onAddPeminjaman(record.id_buku);
                            }}
                          />
                        </Button>
                        <Button>
                          <Edit
                            color="primary"
                            onClick={() => {
                              setCurrentId(record.id_buku);
                            }}
                          />
                        </Button>
                        <Button>
                          <Delete
                            color="secondary"
                            onClick={() => {
                              onDelete(record.id_buku);
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
    bukuList: state.bukuRequest.list,
  };
};

const mapDispatchToProps = {
  fetchAllBuku: fetchBuku,
  deleteBukuRecord: deleteBuku,
  createNewPeminjaman: createPeminjaman,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Buku));
