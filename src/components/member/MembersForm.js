import React, { useEffect } from 'react';
import { Grid, Button, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import useForm from '../useForm';
import { createMember, updateMember } from '../../actions/members';
import { useToasts } from 'react-toast-notifications';
import CustomTextField from '../CustomTextField';

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
    // if ('nama' in fieldValues)
    //   temp.nama = fieldValues.nama ? '' : 'Tidak boleh kosong';
    // if ('alamat' in fieldValues)
    //   temp.alamat = fieldValues.alamat ? '' : 'Tidak boleh kosong';
    // if ('no_hp' in fieldValues)
    //   temp.no_hp = fieldValues.no_hp ? '' : 'Tidak boleh kosong';
    Object.keys(initialFieldValues).forEach((key) => {
      if (key in fieldValues) {
        temp[key] = fieldValues[key] ? '' : 'Tidak boleh kosong';
      }
    });
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
        props.createNewMember(
          values,
          () => {
            resetForm();
            addToast('Berhasil membuat member baru', { appearance: 'success' });
          },
          () => {
            addToast('Gagal membuat member baru', { appearance: 'error' });
          }
        );
      } else {
        props.updateMemberRecord(
          props.currentId,
          values,
          () => {
            resetForm();
            addToast('Berhasil mengupdate member', { appearance: 'success' });
          },
          () => {
            addToast('Gagal mengupdate member', { appearance: 'error' });
          }
        );
      }
    }
  };

  const renderTextField = () => {
    return Object.keys(initialFieldValues).map((key) => {
      return (
        <CustomTextField
          name={key}
          label={key}
          value={values[key]}
          handleInputChange={handleInputChange}
          errorAttribute={{
            ...(errors[key] && { error: true, helperText: errors[key] }),
          }}
        />
      );
    });
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
          {renderTextField()}
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
