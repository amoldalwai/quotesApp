import React, { useEffect, useState } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ReplayIcon from "@material-ui/icons/Replay";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import TwitterIcon from "@material-ui/icons/Twitter";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

const Counter = () => {
  const [qtext, setqtext] = useState();
  const [qauthor, setqauthor] = useState();
  const [count, setCoun] = useState(Math.floor(Math.random() * 1000));

  const randGen = () => {
    setCoun(Math.floor(Math.random() * 1000));
  };

  const Incr = () => {
    setCoun(count + 1);
    show();
  };
  const Dcr = () => {
    if (count <= 0) {
      setCoun(0);
      show();
    } else {
      setCoun(count - 1);
      show();
    }
  };

  const show = () => {
    axios.get(`https://type.fit/api/quotes`).then((res) => {
      setqtext(res.data[count].text);

      setqauthor(res.data[count].author);
    });
  };
  const tweet = () => {
    let twtpost = `https://twitter.com/intent/tweet?text=${qtext}`;
    window.open(twtpost);
  };

  useEffect(() => {
    show();
  }, [count]);

  return (
    <>
      <center>
        <Paper elevation={3} className="img-fluid">
          <h5>
            <span>
              <FormatQuoteIcon />
            </span>
            {qtext}
            <span>
              <FormatQuoteIcon />
            </span>
          </h5>

          <p>-{qauthor}</p>

          <div className="bottombtn">
            <hr />
            <Tooltip title="Back">
              <IconButton onClick={Dcr} style={{ margin: "5px" }}>
                <ArrowBackIosIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Random">
              <Fab
                color="secondary"
                onClick={randGen}
                style={{ margin: "5px" }}
              >
                <ReplayIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Next">
              <IconButton onClick={Incr} style={{ margin: "5px" }}>
                <ArrowForwardIosIcon color="primary" />
              </IconButton>
            </Tooltip>
          </div>
        </Paper>
      </center>
      <Tooltip title="Tweet the Quote">
        <Button
          style={{ background: "#e3f2fd" }}
          onClick={tweet}
          className="twt"
        >
          <TwitterIcon
            style={{ height: "35px", width: "35px" }}
            color="primary"
          />
        </Button>
      </Tooltip>
      <br />
    </>
  );
};
export default Counter;
