import React from "react"
import {
  Container,
  makeStyles,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core"
import { LockOutlined } from "@material-ui/icons"
import { Link as GatsbyLink, navigate } from "gatsby"
import { useFormik } from "formik"
import * as yup from "yup"
import { userSignUp } from "../services/authService"
import { RouteComponentProps } from "@reach/router"

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: "none",
    fontSize: "14px",
  },
}))

const validationSchema = yup.object({
  firstName: yup
    .string()
    .min(2, "First name should be of minimum 2 characters length")
    .required("First name is required"),
  lastName: yup
    .string()
    .min(2, "Last name should be of minimum 2 characters length"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
})

const Register: React.FC<RouteComponentProps> = () => {
  const initialValues = { firstName: "", lastName: "", email: "", password: "" }
  const classes = useStyles()
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      console.log({ values, actions })
      const error = await userSignUp(values)
      if (error) {
        actions.setErrors({ [error.field]: error.error })
      } else {
        navigate("/app")
      }
      actions.setSubmitting(false)
    },
  })
  const { values, touched, errors, handleSubmit, handleChange } = formik
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={values.firstName}
                onChange={handleChange}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={values.lastName}
                onChange={handleChange}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting && <CircularProgress size={14} />}
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <GatsbyLink className={classes.link} to="/">
                <Typography className={classes.link} component="p">
                  Already have an account? Sign in
                </Typography>
              </GatsbyLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default Register
