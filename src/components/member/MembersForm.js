import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import useForm from '../useForm';
import { createMember, updateMember } from '../../actions/members';
import { useToasts } from 'react-toast-notifications';
import CustomForm from '../CustomForm';

const initialFieldValues = {
  nama: '',
  alamat: '',
  no_hp: '',
};

const MembersForm = ({ ...props }) => {
  const { addToast } = useToasts();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
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

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.membersList.find((x) => x.id_member === props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);

  return (
    <CustomForm
      fields={initialFieldValues}
      values={values}
      errors={errors}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      resetForm={resetForm}
    />
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

export default connect(mapStateToProps, mapDispatchToProps)(MembersForm);
