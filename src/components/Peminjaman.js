import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  fetchPeminjaman,
  deletePeminjaman,
  updatePeminjaman,
} from '../actions/peminjaman';
import {
  CircularProgress,
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
import { Check, Delete } from '@material-ui/icons';
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
  form: {
    marginLeft: '8%',
  },
  loading: {
    margin: 'auto',
  },
});

const Peminjaman = ({ classes, ...props }) => {
  const { addToast } = useToasts();

  useEffect(() => {
    props.fetchAllPeminjaman();
  }, []);

  const onDelete = (id) => {
    if (window.confirm('Hapus peminjaman?'))
      props.deletePeminjamanRecord(id, () => {
        addToast('Berhasil menghapus peminjaman', { appearance: 'info' });
      });
  };

  const onUpdatePeminjaman = (id) => {
    if (window.confirm('Kembalikan buku?'))
      props.updatePeminjamanRecord(id, () => {
        addToast('Berhasil mengembalikan buku', { appearance: 'success' });
      });
  };
  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container>
        {props.isLoading ? (
          <CircularProgress className={classes.loading} />
        ) : (
          <Grid className={classes.form} item lg={12}>
            <TableContainer>
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>Nama Peminjam</TableCell>
                  <TableCell>Buku</TableCell>
                  <TableCell>Tanggal Peminjaman</TableCell>
                  <TableCell>Tanggal Pengembalian</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.peminjamanList.map((record) => {
                  return (
                    <TableRow key={record.id_peminjaman} hover>
                      <TableCell>{record.nama}</TableCell>
                      <TableCell>{record.judul}</TableCell>
                      <TableCell>{record.tanggal_peminjaman}</TableCell>
                      <TableCell>
                        {record.tanggal_pengembalian === null
                          ? 'Belum dikembalikan'
                          : record.tanggal_pengembalian}
                      </TableCell>
                      <TableCell>
                        <ButtonGroup variant="text">
                          <Button>
                            <Check
                              color="primary"
                              onClick={() => {
                                onUpdatePeminjaman(record.id_peminjaman);
                              }}
                            />
                          </Button>
                          <Button>
                            <Delete
                              color="secondary"
                              onClick={() => {
                                onDelete(record.id_peminjaman);
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
        )}
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    peminjamanList: state.peminjamanRequest.list,
    isLoading: state.peminjamanRequest.loading,
  };
};

const mapDispatchToProps = {
  fetchAllPeminjaman: fetchPeminjaman,
  deletePeminjamanRecord: deletePeminjaman,
  updatePeminjamanRecord: updatePeminjaman,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Peminjaman));
