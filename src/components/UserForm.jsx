import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "./firebase"; 
import { useNavigate } from "react-router-dom";
// import OrderDetails from "./OrderDetails";

const theme = createTheme();


const useStyles = makeStyles(() => ({
  padding: {
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const initialValues = {
  fullName: "",
  city: "",
  address: "",
  email: "",
  phoneNumber: "",
};

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string()
    .matches(/^\d+$/, "Phone number must be numeric")
    .min(10, "Must be at least 10 digits")
    .required("Required"),
  city: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
});

const UserForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const onSubmit = async (values, { resetForm }) => {
    try {
      const docRef = await addDoc(collection(db, "userForm"), values);
      localStorage.setItem("userFormId", docRef.id); // Save the document ID in local storage
      resetForm();
      navigate("/orderDetails");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  const handleOrderClick = () => {
    navigate("/orderDetails");
    };

  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center" sx={{ p: 6 }} spacing={1}>
        <Grid item md={6}>
          <Card className={classes.padding}>
            <CardHeader title="Shipping Details"></CardHeader>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ dirty, isValid }) => (
                <Form>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Field
                          label="Full Name"
                          variant="outlined"
                          fullWidth
                          name="fullName"
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          label="Email"
                          variant="outlined"
                          fullWidth
                          name="email"
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          label="Phone Number"
                          variant="outlined"
                          fullWidth
                          name="phoneNumber"
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          label="City"
                          variant="outlined"
                          fullWidth
                          name="city"
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          label="Address"
                          variant="outlined"
                          fullWidth
                          name="address"
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Cash on Delivery"
                          />
                        </FormGroup>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={!dirty || !isValid}
                      className={classes.button}
                      style={{ backgroundColor: "black", color: "white", 
                        display: "inline-block",
                        padding: "0.9rem 3rem",
                        fontSize: "1rem",
                        cursor: "pointer",
                        marginBottom: "10px",
                        borderRadius: "0.9rem"
                      }}
                      onClick={handleOrderClick}
                    >
                      Continue
                    </Button>
                  </CardActions>
                </Form>
              )}
            </Formik>
          </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default UserForm;

