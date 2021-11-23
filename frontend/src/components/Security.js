import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

function Security() {
  const useStyles = makeStyles({
    typography: {
      paddingTop: 20,
      fontFamily: "Dancing Script",
      borderBottom: "2px solid #FF0075",
      width: "30%",
      margin: "auto",
    },
    text: {
      margin: 40,
    },
  });

  const classes = useStyles();

  return (
    <div className="background">
      <Typography
        className={classes.typography}
        variant="h2"
        align="center"
        gutterBottom
      >
        FAQ's
      </Typography>

      <Typography className={classes.text}>
        <Typography variant="h6">
          How is my personal data kept secure?
        </Typography>
        This journal app has security measures in place to ensure the safety of
        your data. The technologies involved in this application allow for your
        password to be encrypted in transit. This data is then saved to the
        secure database, with a unique user code. Each time you attempt to
        login, the details you input will be checked against your existing login
        credentials and if they are identical you will gaim access to your
        account, otherwise access will be denied. When making specific changes
        within your account your unique code will be used as authorisation to
        allow you to complete this action. If the unique code does not match the
        code saved in the database then access will be denied. Each time you
        login, a new unique code will be generated providing extra security.
      </Typography>
    </div>
  );
}
export default Security;
