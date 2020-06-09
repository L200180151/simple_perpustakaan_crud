import React, { useEffect } from 'react';
import { Grid, TextField, Button, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import useForm from '../useForm';
import { createBuku, updateBuku } from '../../actions/buku';
import { useToasts } from 'react-toast-notifications';

const styles = (theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(3),
      marginRight: theme.spacing(3),
    },
  },
  buttonMargin: {
    margin: theme.spacing(1),
  },
});

const initialFieldValues = {
  judul: '',
  pengarang: '',
  tahun_terbit: '',
};

const BukuForm = ({ classes, ...props }) => {
  const { addToast } = useToasts();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('judul' in fieldValues)
      temp.judul = fieldValues.judul ? '' : 'Tidak boleh kosong';
    if ('pengarang' in fieldValues)
      temp.pengarang = fieldValues.pengarang ? '' : 'Tidak boleh kosong';
    if ('tahun_terbit' in fieldValues)
      temp.tahun_terbit = fieldValues.tahun_terbit ? '' : 'Tidak boleh kosong';
    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === '');
  };

  const {
    values,
    setValues,
    handleInputChange,
    errors,
    setErrors,
    resetForm,
  } = useForm(initialFieldValues, validate, props.setCurrentId);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      if (props.currentId === 0) {
        props.createNewBuku(values, () => {
          resetForm();
          addToast('Berhasil membuat buku baru', { appearance: 'success' });
        });
      } else {
        props.updateBukuRecord(props.currentId, values, () => {
          resetForm();
          addToast('Berhasil mengupdate buku', { appearance: 'success' });
        });
      }
    }
  };

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.bukuList.find((x) => x.id_buku === props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);

  return (
    <form
      autoComplete="off"
      noValidate
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <Grid container>
        <Grid item xs={12}>
          <TextField
            name="judul"
            variant="outlined"
            label="Judul"
            value={values.judul}
            onChange={handleInputChange}
            fullWidth
            {...(errors.judul && { error: true, helperText: errors.judul })}
          />
          <TextField
            name="pengarang"
            variant="outlined"
            label="Pengarang"
            value={values.pengarang}
            onChange={handleInputChange}
            fullWidth
            {...(errors.pengarang && {
              error: true,
              helperText: errors.pengarang,
            })}
          />

          <TextField
            name="tahun_terbit"
            variant="outlined"
            label="Tahun Terbit"
            type="number"
            value={values.tahun_terbit}
            onChange={handleInputChange}
            fullWidth
            {...(errors.tahun_terbit && {
              error: true,
              helperText: errors.tahun_terbit,
            })}
          />
          <div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.buttonMargin}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              className={classes.buttonMargin}
              onClick={resetForm}
            >
              Reset
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    bukuList: state.bukuRequest.list,
  };
};

const mapDispatchToProps = {
  createNewBuku: createBuku,
  updateBukuRecord: updateBuku,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(BukuForm));
