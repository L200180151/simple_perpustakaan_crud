import React from 'react';
import CustomTextField from './CustomTextField';
import { Grid, Button, withStyles } from '@material-ui/core';

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

const CustomForm = ({
  classes,
  fields,
  values,
  errors,
  handleInputChange,
  handleSubmit,
  resetForm,
}) => {
  const renderCustomTextField = () => {
    return Object.keys(fields).map((key) => {
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

  return (
    <form
      autoComplete="off"
      noValidate
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <Grid container>
        <Grid item xs={12}>
          {renderCustomTextField()}
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

export default withStyles(styles)(CustomForm);
