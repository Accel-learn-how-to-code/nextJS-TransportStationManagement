import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
  makeStyles,
  Select,
  MenuItem,
  FormControl,
  Paper,
} from "@material-ui/core";
import { Field, Form, Formik, FieldArray } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import { AdminMenu } from "../../../database/AdminMenu";
import React, { Children, useState } from "react";
import { mixed, number, object, array, string } from "yup";

import Title from "../../../components/Title";
import Breadcrumbs from "../../../components/Breadcrumbs";

const useStyles = makeStyles((theme) => ({
  noWrap: {
    [theme.breakpoints.up("sm")]: {
      flexWrap: "nowrap",
    },
  },
  addButton: {
    marginTop: 10,
    marginBottom: 10,
  },
  deleteButton: {
    color: "rgb(220, 0, 78)",
    border: "1px solid rgba(220, 0, 78, 0.5)",
  },
  flexFull: {
    flexGrow: 1,
  },
  selectBox: {
    display: "flex",
    alignItems: "flex-end",
  },
  grid: {
    marginTop: 20,
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
}));

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

const emptyDonation = { institution: "", percentage: 0 };

const breadcumbData = [
  {
    path: "/admin",
    pathName: "Home",
  },
  {
    path: "/admin/accounts",
    pathName: "Quản lý tài khoản",
  },
  {
    pathName: "Tạo tài khoản",
  },
];

export default function CreateUser() {
  const [completed, setCompleted] = useState(false);
  const [step, setStep] = useState(0);
  const classes = useStyles();

  const checkStepForward = () => {
    if (step < steps.length - 1 && step >= 0) {
      setStep((s) => s + 1);
    }
  };

  const checkStepBackward = () => {
    if (step > 0) {
      setStep((s) => s - 1);
    }
  };

  const checkLastStep = () => {
    if (step === steps.length - 1) {
      setCompleted(true);
    }
  };

  const steps = ["Thông tin người dùng", "Thông tin xe", "Hoàn tất đăng ký"];
  return (
    <>
      <Breadcrumbs breadcumbData={breadcumbData} />
      <Paper elevation={2} className={classes.grid}>
        <Title>Tạo tài khoản người dùng</Title>
        <Formik
          initialValues={{
            UsersName: "",
            Email: "",
            TelNo: "",
            Password: "",
            Gender: "" || "Male",
            Address: "",
            HomeTown: "",
            donations: [emptyDonation],
          }}
          onSubmit={async (values, helpers) => {
            await sleep(3000);
            console.log(values);
            helpers.setTouched({});
          }}
          validationSchema={object({
            UsersName: string().required("Cần nhập tên người dùng"),
            Email: string().email().required("Cần nhập email"),
            TelNo: string().required("Cần nhập số điện thoại"),
            Password: string().required("Cần đặt mật khẩu"),
            Gender: string(),
            Address: string().required("Cần nhập địa chỉ"),
            HomeTown: string().required("Cần nhập quê quán"),
            donations: array(
              object({
                institution: string()
                  .required("Institution name needed")
                  .min(3, "Institution name needs to be at least 3 characters")
                  .max(
                    10,
                    "Institution name needs to be at most 10 characters"
                  ),
                percentage: number()
                  .required("Percentage needed")
                  .min(1, "Percentage needs to be at least 1%")
                  .max(100, "Percentage can be at most 100%"),
              })
            ).min(1, "You need to provide at least 1 institution"),
          })}
        >
          {({ values, errors, isSubmitting }) => (
            <Form autoComplete="off">
              <Stepper alternativeLabel activeStep={step}>
                {steps.map((label, index) => (
                  <Step key={label} completed={step > index || completed}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {step === 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {steps[step]}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      container
                      spacing={3}
                      className={classes.flexFull}
                    >
                      <Grid item xs={12} sm={4}>
                        <Field
                          fullWidth
                          name="UsersName"
                          component={TextField}
                          label="Tên người dùng"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Field
                          fullWidth
                          type="email"
                          name="Email"
                          component={TextField}
                          label="Email"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Field
                          fullWidth
                          name="TelNo"
                          component={TextField}
                          type="number"
                          label="Số điện thoại"
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      container
                      spacing={3}
                      className={classes.flexFull}
                    >
                      <Grid item xs={12} sm={3}>
                        <Field
                          fullWidth
                          name="Password"
                          component={TextField}
                          label="Mật khẩu"
                        />
                      </Grid>
                      <Grid item xs={12} sm={3} className={classes.selectBox}>
                        <FormControl fullWidth>
                          <Field
                            fullWidth
                            as={Select}
                            name="Gender"
                            label="Giới tính"
                          >
                            <MenuItem value="Male">Nam</MenuItem>
                            <MenuItem value="Female">Nữ</MenuItem>
                          </Field>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Field
                          fullWidth
                          name="Address"
                          component={TextField}
                          label="Địa chỉ"
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Field
                          fullWidth
                          name="HomeTown"
                          component={TextField}
                          label="Quê quán"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {step === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {steps[step]}
                  </Typography>
                  <FieldArray name="donations">
                    {({ push, remove }) => (
                      <React.Fragment>
                        <Grid item>
                          <Typography variant="body2">
                            All your donations
                          </Typography>
                        </Grid>

                        {values.donations.map((_, index) => (
                          <Grid
                            container
                            item
                            className={classes.noWrap}
                            key={index}
                            spacing={2}
                          >
                            <Grid item container spacing={2} xs={12} sm="auto">
                              <Grid item xs={12} sm={6}>
                                <Field
                                  fullWidth
                                  name={`donations.${index}.institution`}
                                  component={TextField}
                                  label="Institution"
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Field
                                  fullWidth
                                  name={`donations[${index}].percentage`}
                                  component={TextField}
                                  type="number"
                                  label="Percentage (%)"
                                />
                              </Grid>
                            </Grid>

                            <Grid item xs={12} sm="auto">
                              <Button
                                disabled={isSubmitting}
                                onClick={() => remove(index)}
                                variant="outlined"
                                className={classes.deleteButton}
                              >
                                Delete
                              </Button>
                            </Grid>
                          </Grid>
                        ))}

                        <Grid item>
                          {typeof errors.donations === "string" ? (
                            <Typography color="error">
                              {errors.donations}
                            </Typography>
                          ) : null}
                        </Grid>

                        <Grid item>
                          <Button
                            disabled={isSubmitting}
                            variant="outlined"
                            color="primary"
                            onClick={() => push(emptyDonation)}
                            className={classes.addButton}
                          >
                            Add Donation
                          </Button>
                        </Grid>
                      </React.Fragment>
                    )}
                  </FieldArray>
                </Box>
              )}

              {step === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {steps[step]}
                  </Typography>
                  {Object.keys(errors).length >= 1 ? (
                    <Typography color="error">ERROR</Typography>
                  ) : null}
                  <pre>{JSON.stringify(values, null, 4)}</pre>
                </Box>
              )}

              <Grid container spacing={3}>
                {step > 0 ? (
                  <Grid item>
                    <Button
                      disabled={isSubmitting}
                      variant="outlined"
                      onClick={checkStepBackward}
                    >
                      Back
                    </Button>
                  </Grid>
                ) : null}

                <Grid item>
                  {step !== steps.length - 1 && (
                    <Button
                      disabled={isSubmitting}
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={checkStepForward}
                    >
                      Next
                    </Button>
                  )}

                  {step === steps.length - 1 && (
                    <Button
                      startIcon={
                        isSubmitting ? <CircularProgress size="1rem" /> : null
                      }
                      disabled={isSubmitting}
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={checkLastStep}
                    >
                      Submit
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </>
  );
}

CreateUser.AdminMenu = AdminMenu;
