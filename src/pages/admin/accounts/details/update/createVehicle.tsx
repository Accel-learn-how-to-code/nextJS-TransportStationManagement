import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { Field, FieldArray, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { verify } from "jsonwebtoken";
import Link from "next/link";
import Router from "next/router";
import React from "react";
import { array, number, object, string } from "yup";
import { secret } from "../../../../../../api/secret";
import Breadcrumbs from "../../../../../components/Breadcrumbs";
import Title from "../../../../../components/Title";
import { AdminMenu } from "../../../../../database/AdminMenu";

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
    margin: "auto",
    marginTop: 20,
    padding: 20,
    maxWidth: 700,
  },
  gridButton: {
    marginTop: 15,
  },
}));

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

export default function updateVehicle({ userID, oDau }) {
  const classes = useStyles();

  const breadcumbData = [
    {
      path: "/admin",
      pathName: "Home",
    },
    {
      path: "/admin/accounts",
      pathName: "Quản lý tài khoản",
    },
    ,
    {
      path: `/admin/accounts/details?id=${userID}`,
      pathName: "Xem thông tin",
    },
    {
      pathName: "Thêm xe",
    },
  ];

  const emptyVehicle = {
    id: "",
    tenXe: "",
    soChoNgoi: 0,
    noiDangKy: "",
    maODauXe: "",
  };
  return (
    <>
      <Breadcrumbs breadcumbData={breadcumbData} />
      <Paper elevation={2} className={classes.grid}>
        <Title>Sửa thông tin xe</Title>
        <Formik
          initialValues={{
            vehicles: [emptyVehicle],
          }}
          onSubmit={async (values, helpers) => {
            const { vehicles } = values;
            await axios({
              method: "POST",
              withCredentials: true,
              url: "/api/admin/accounts/vehicle",
              headers: {
                "Content-Type": "application/json",
              },
              data: {
                id: userID,
                vehicles,
              },
            });
            Router.replace(`/admin/accounts/details/update?id=${userID}`);
            helpers.setTouched({});
          }}
          validationSchema={object({
            vehicles: array(
              object({
                id: string()
                  .required("Cần nhập biển số xe")
                  .min(8, "Biển số xe cần ít nhất 8 ký tự")
                  .max(10, "Biển số xe có tối đa 10 ký tự"),
                tenXe: string().required("Cần nhập tên xe"),
                soChoNgoi: number()
                  .required("soChoNgoi needed")
                  .min(4, "Số chỗ ngồi tối thiểu là 4")
                  .max(100, "Số chỗ ngồi tối thiểu là 100"),
                noiDangKy: string().required("Cần nhập nơi đăng ký biển số"),
                maODauXe: string().required("Cần có ô đậu xe"),
              })
            ).min(1, "You need to provide at least 1 id"),
          })}
        >
          {({ values, errors, isSubmitting }) => (
            <Form autoComplete="off">
              <Box>
                <FieldArray name="vehicles">
                  {({ push, remove }) => (
                    <React.Fragment>
                      <Grid item>
                        <Typography variant="body2">
                          All your vehicles: {values.vehicles.length}
                        </Typography>
                      </Grid>

                      {values.vehicles.map((_, index) => (
                        <Grid
                          container
                          item
                          className={classes.noWrap}
                          key={index}
                          spacing={2}
                        >
                          <Grid item container spacing={2} xs={12} sm="auto">
                            <Grid item xs={12} sm={2}>
                              <Field
                                fullWidth
                                name={`vehicles.${index}.id`}
                                component={TextField}
                                label="Biển số"
                              />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <Field
                                fullWidth
                                name={`vehicles.${index}.tenXe`}
                                component={TextField}
                                label="Tên xe"
                              />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <Field
                                fullWidth
                                name={`vehicles[${index}].soChoNgoi`}
                                component={TextField}
                                type="number"
                                label="Seats"
                              />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                              <Field
                                fullWidth
                                name={`vehicles.${index}.noiDangKy`}
                                component={TextField}
                                label="Nơi đăng ký"
                              />
                            </Grid>

                            <Grid
                              item
                              xs={12}
                              sm={3}
                              className={classes.selectBox}
                            >
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                  Ô đậu
                                </InputLabel>
                                <Field
                                  fullWidth
                                  as={Select}
                                  name={`vehicles.${index}.maODauXe`}
                                  label="Ô đậu xe"
                                >
                                  {oDau.map((x, index) => (
                                    <MenuItem value={x.id} key={index}>
                                      {x.tenODau}
                                    </MenuItem>
                                  ))}
                                </Field>
                              </FormControl>
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
                        {typeof errors.vehicles === "string" ? (
                          <Typography color="error">
                            {errors.vehicles}
                          </Typography>
                        ) : null}
                      </Grid>

                      <Grid item>
                        <Button
                          disabled={isSubmitting}
                          variant="outlined"
                          color="primary"
                          onClick={() => push(emptyVehicle)}
                          className={classes.addButton}
                        >
                          Add Vehicle
                        </Button>
                      </Grid>
                    </React.Fragment>
                  )}
                </FieldArray>
              </Box>

              <Grid
                container
                item
                spacing={1}
                className={classes.gridButton}
                justify="flex-end"
              >
                <Grid item>
                  <Button disabled={isSubmitting} variant="outlined">
                    <Link href={`/admin/accounts/details?id=${userID}`}>
                      <div
                        style={{
                          textDecoration: "none",
                          font: "#000000DE",
                        }}
                      >
                        Cancel
                      </div>
                    </Link>
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    startIcon={
                      isSubmitting ? <CircularProgress size="1rem" /> : null
                    }
                    disabled={isSubmitting}
                    variant="contained"
                    color="primary"
                    type="submit"
                    //onClick={checkLastStep}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const userID = ctx.query.id;

  //lấy cookie nhưng ở dạng string auth=abc123
  const cookie = ctx.req?.headers.cookie;
  //lấy cookie nhưng ở dạng object {auth: abc123}
  const { cookies } = ctx.req;

  var decoded = verify(cookies.auth, secret);

  if (decoded.accountType !== "AD" && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: "http://localhost:3000/",
    });
    ctx.res?.end();
    return;
  }

  const oDau = await axios({
    method: "GET",
    url: "http://localhost:3000/api/admin/accounts/create",
    withCredentials: true,
    headers: {
      Cookie: cookie || null,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      if (err.response.status === 401 && !ctx.req) {
        Router.replace("/");
        return;
      }

      //server-side
      if (err.response.status === 401 && ctx.req) {
        ctx.res?.writeHead(302, {
          Location: "/",
        });
        ctx.res?.end();
        return;
      }
    });

  return { props: { userID, oDau } };
};

updateVehicle.AdminMenu = AdminMenu;
