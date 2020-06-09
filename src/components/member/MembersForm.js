import React, { useEffect } from 'react';
import { Grid, TextField, Button, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import useForm from '../useForm';
import { createMember, updateMember } from '../../actions/members';
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
  nama: '',
  alamat: '',
  no_hp: '',
};

const MembersForm = ({ classes, ...props }) => {
  const { addToast } = useToasts();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('nama' in fieldValues)
      temp.nama = fieldValues.nama ? '' : 'Tidak boleh kosong';
    if ('alamat' in fieldValues)
      temp.alamat = fieldValues.alamat ? '' : 'Tidak boleh kosong';
    if ('no_hp' in fieldValues)
      temp.no_hp = fieldValues.no_hp ? '' : 'Tidak boleh kosong';
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
        props.createNewMember(values, () => {
          resetForm();
          addToast('Berhasil membuat member baru', { appearance: 'success' });
        });
      } else {
        props.updateMemberRecord(props.currentId, values, () => {
          resetForm();
          addToast('Berhasil mengupdate member', { appearance: 'success' });
        });
      }
    }
  };

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.membersList.find((x) => x.id_member === props.currentId),
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
            name="nama"
            variant="outlined"
            label="Nama"
            value={values.nama}
            onChange={handleInputChange}
            fullWidth
            {...(errors.nama && { error: true, helperText: errors.nama })}
          />
          <TextField
            name="alamat"
            variant="outlined"
            label="Alamat"
            value={values.alamat}
            onChange={handleInputChange}
            fullWidth
            {...(errors.alamat && { error: true, helperText: errors.alamat })}
          />

          <TextField
            name="no_hp"
            variant="outlined"
            label="No HP"
            type="number"
            value={values.no_hp}
            onChange={handleInputChange}
            fullWidth
            {...(errors.no_hp && { error: true, helperText: errors.no_hp })}
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
    membersList: state.membersRequest.list,
  };
};

const mapDispatchToProps = {
  createNewMember: createMember,
  updateMemberRecord: updateMember,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MembersForm));
