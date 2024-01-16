import React from "react";
import "./body.css";
import Vid from "../../Assets/v4.mp4";
import {
  bounce,
  pulse,
  fadeInDown,
  flipInX,
  slideInUp,
  slideInRight,
} from "react-animations";
import { css, StyleSheet } from "aphrodite";

const styles = StyleSheet.create({
  slideInRight: {
    animationName: slideInRight,
    animationDuration: "1s",
  },
  slideInUp: {
    animationName: slideInUp,
    animationDuration: "1s",
  },
  pulse: {
    animationName: pulse,
    animationDuration: "2.5s",
  },
});

const Body = () => {
  return (
    <div>
      <div className=" jumboDiv">
        <div className=" jumbotext">
          <h1 className={css(styles.pulse)}>
            Get Started, Chat Now, Speak with an Expert
          </h1>
          <p>
            Experience the power of seamless communication with our expert chat
            support team. Effortless solutions at your fingertips.
            <br /> No waiting, no hassle...
          </p>
        </div>
        <div className=" jumboVid">
          <video
            loop="true"
            autoplay="autoplay"
            muted
            height="100%"
            width="100%"
            className={css(styles.slideInRight)}
          >
            <source src={Vid} type="video/mp4" />
          </video>
          {/* <video src={Vid} loop={true} height="80%" width="80%" /> */}
        </div>
      </div>
    </div>
  );
};

export default Body;
