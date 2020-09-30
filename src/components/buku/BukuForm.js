import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import useForm from '../useForm';
import { createBuku, updateBuku } from '../../actions/buku';
import { useToasts } from 'react-toast-notifications';
import CustomForm from '../CustomForm';

const initialFieldValues = {
  judul: '',
  pengarang: '',
  tahun_terbit: '',
};

const BukuForm = ({ ...props }) => {
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
        props.createNewBuku(
          values,
          () => {
            resetForm();
            addToast('Berhasil membuat buku baru', { appearance: 'success' });
          },
          () => {
            addToast('Gagal membuat buku baru', { appearance: 'error' });
          }
        );
      } else {
        props.updateBukuRecord(
          props.currentId,
          values,
          () => {
            resetForm();
            addToast('Berhasil mengupdate buku', { appearance: 'success' });
          },
          () => {
            addToast('Gagal mengupdate buku', { appearance: 'error' });
          }
        );
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
    bukuList: state.bukuRequest.list,
  };
};

const mapDispatchToProps = {
  createNewBuku: createBuku,
  updateBukuRecord: updateBuku,
};

export default connect(mapStateToProps, mapDispatchToProps)(BukuForm);
