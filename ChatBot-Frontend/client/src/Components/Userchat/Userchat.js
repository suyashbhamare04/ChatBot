import React, { useState, useEffect, useRef } from "react";
import "react-chat-elements/dist/main.css";
import { MessageBox } from "react-chat-elements";
import SendIcon from "@mui/icons-material/Send";
import BOTAVT from "../../Assets/bot.png";
import LOGOUT from "../../Assets/logout.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Userchat.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { isAuthenticated, signout } from "../../Helper/auth";
import { Link, Navigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import {
  getAllCategories,
  getAnswerByQuestionId,
  getQuestions,
  getQuestionsByCategory,
} from "../../Helper/apicaller";

const theme = createTheme({
  palette: {
    neutral: {
      main: "#ab47bc",
    },
  },
});

const Userchat = () => {
  let bot = "support";

  useEffect(() => {
    //theme
    initializeTheme();
  }, []);

  const initializeTheme = async () => {
    let botMesssages = document.getElementsByClassName("rce-mbox");
    for (let i = 0; i < botMesssages.length; i++) {
      if (botMesssages[i].className.includes("rce-mbox-right")) {
        console.log("User message");
      } else {
        botMesssages[i].className = "rce-mbox";
      }
    }
  };

  const scrollToBottom = () => {
    const scrollContainer = document.getElementById("message-container");
    scrollContainer.scrollTo({
      top: scrollContainer.scrollHeight * 500,
      left: 0,
      behavior: "smooth",
    });
  };

  const stickToTheme = async () => {
    var botMesssages = document.getElementsByClassName("rce-mbox");
    for (let i = 0; i < botMesssages.length; i++) {
      if (botMesssages[i].className.includes("rce-mbox-right")) {
        botMesssages[i].className = "rce-mbox rce-mbox-right";
      } else {
        botMesssages[i].className = "rce-mbox";
      }
    }
  };

  //Main Bot process Handle

  const BotProcessHandle = () => {
    const [userMessage, setUserMessage] = useState("");
    const [messages, setMessages] = useState([
      {
        title: bot,
        // text: "Hello 👋 how can i help you..",
        text: "Hello 👋 please select the category.",
      },
    ]);

    //send Message Handle
    const sendBtnHandle = (e) => {
      e.preventDefault();

      if (userMessage === "bye" || userMessage === "Bye") {
        toast("🤝 Your conversation has been ended :)");
        setUserMessage("");
      } else if (userMessage === "") {
        toast("🥱 You haven't ask anything yet!!!");
      } else {
        // BOT({ userMessage, session_id }).then((response) => {
        //   console.log(response);
        // });

        setMessages((oldArray) => [
          ...oldArray,
          {
            title: "You",
            text: userMessage,
            date: new Date(),
          },
        ]);
        scrollToBottom();

        // setTimeout(() => {
        //   scrollToBottom();
        // }, 50);
      }
    };

    const [selectedDomain, setSelectedDomain] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [question, setQuestion] = useState([]);
    const [answers, setAnswers] = useState({});
    const [userdata, setUserdata] = useState("");
    const [categories, setCategories] = useState([]);
    const [loader, setLoader] = useState(false);

    // useEffect(() => {
    //   setUserMessage("");

    // }, [categories]);

    const userMessageHandle = (e) => {
      setUserMessage(e.target.value);
      stickToTheme();
      scrollToBottom();
    };

    // const handleKeyPress = async (e) => {
    //   if (e.key === "Enter") {
    //     e.preventDefault();
    //     await sendBtnHandle();
    //   }
    // };
    let hasRun = false;

    useEffect(() => {
      toast.info("welcome to chatsupport...");
      getAllCategories().then((data) => {
        setCategories(data);
        data.forEach((data) => {
          setMessages((oldArray) => [
            ...oldArray,
            {
              title: "",
              txt: `${data}`,
              modified: true,
            },
          ]);
        });
        // scrollToBottom();
      });
      // getQuestions()
      //   .then((data) => {
      //     setQuestion(data);
      //     console.log(data);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }, []);

    const handleDomainChange = (domain) => {
      setSelectedDomain(domain);
      setSelectedQuestion(null);
      setAnswers({});
    };

    const handleQuestionChange = (question) => {
      setSelectedQuestion(question);

      console.log(userdata);

      let answer;
      switch (question) {
        case "Do you have a genuine interest in healthcare and helping people?":
          answer =
            "Medicine is a service-oriented profession where you directly contribute to improving peoples health.";
          break;
        case "Are you comfortable with a more extended period of education and training?":
          answer =
            "Medical education and training typically take a significant number of years.";
          break;
        case "Do you have strong empathy and communication skills?":
          answer =
            "Good communication and empathy are essential for interactions with patients and colleagues.";
          break;
        case "Are you able to handle stress and pressure well?":
          answer =
            "Medical professionals often face high-pressure situations, and resilience is crucial.";
          break;
        case "Are you interested in a profession where continuous learning is a norm?":
          answer =
            "Medicine requires staying updated with the latest advancements in healthcare.";
          break;

        case "Are you interested in technology and problem-solving?":
          answer =
            "Engineering often involves applying scientific principles to design and build solutions.";
          break;
        case "Do you enjoy mathematics and science subjects?":
          answer =
            "Engineering programs usually require a strong foundation in mathematics and sciences.";
          break;
        case "Are you interested in creating and innovating new technologies?":
          answer =
            "Engineers play a crucial role in developing new products, systems, and technologies.";
          break;
        case "Do you prefer hands-on, practical work?":
          answer =
            "Engineering often involves practical applications and projects.";
          break;
        case "Are you open to continuous learning and adapting to new technologies?":
          answer =
            "Technology evolves rapidly, and engineers need to stay updated.";
          break;

        case "Are you interested in business, management, and leadership roles?":
          answer =
            "MBA programs focus on developing business and managerial skills.";
          break;
        case "Do you have an interest in strategy, finance, marketing, or entrepreneurship?":
          answer =
            "MBA programs offer specializations in various business areas.";
          break;
        case "Do you enjoy working in a dynamic and diverse environment?":
          answer =
            "Business environments often involve dealing with diverse teams and challenges.";
          break;
        case "Are you interested in climbing the corporate ladder or starting your own business?":
          answer =
            "An MBA can open doors to leadership positions and entrepreneurship.";
          break;
        case "Do you have strong interpersonal and leadership skills?":
          answer =
            "MBA programs often seek individuals with leadership potential.";
          break;

        default:
          answer = "Default answer logic here.";
          break;
      }

      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [question]: answer,
      }));
    };

    if (!isAuthenticated()) {
      return <Navigate to={`/signin`} />;
    }

    const handlelogic = (category) => {
      getQuestionsByCategory(category).then((data) => {
        console.log(data);
        setMessages(() => []);
        data.forEach((que) => {
          setMessages((oldArray) => [
            ...oldArray,
            {
              title: "",
              txt: que.content,
              modified: true,
              queId: que.id,
            },
          ]);
        });
      });
    };

    let feedback = ["Satisfied 🙂", "NotSatisfied 🙁"];

    const handleAnswerlogic = (queId) => {
      getAnswerByQuestionId(queId).then((data) => {
        console.log(data);
        setMessages(() => []);
        data.forEach((ans) => {
          setMessages((oldArray) => [
            ...oldArray,
            {
              title: bot,
              txt: ans.content,
              modified: true,
            },
          ]);
        });
        setTimeout(() => {
          setMessages((oldArray) => [
            ...oldArray,
            {
              title: bot,
              txt: "please give your feedback 🥹",
              modified: true,
            },
          ]);
        }, 1000);

        setTimeout(() => {
          feedback.forEach((feed) => {
            setMessages((oldArray) => [
              ...oldArray,
              {
                title: "",
                text: feed,
                feedback: true,
              },
            ]);
          });
        }, 2000);
      });
    };

    const handlefeedback = (feed) => {
      switch (feed) {
        case "Satisfied 🙂":
          setMessages(() => [
            {
              title: bot,
              txt: "Thank you for you response 😇",
              modified: true,
            },
          ]);
          toast.success(
            "Thank you. Your session has been ended.Page will be refresh automatically to start new session",
            {
              onClose: () => {
                window.location.reload();
              },
            }
          );
          break;

        case "NotSatisfied 🙁":
          setMessages(() => [
            {
              title: bot,
              txt: "🥹 Apologize for our answers. you will be connecting to our support agent...",
              modified: true,
            },
          ]);
          setLoader(true);
          break;

        default:
          break;
      }
    };

    return (
      <div className="App">
        <div className="chat-container">
          <div className="messages-container" id="message-container">
            <div className="header">
              <div>
                <img src={BOTAVT} className="botavt" /> &nbsp;
                <b>ChatSupport</b>
              </div>
              <div style={{ marginRight: "10px" }}>
                <img src={LOGOUT} className="botavt" />
              </div>
            </div>
            {messages.map((msg) => {
              return (
                <>
                  <MessageBox
                    avatar={msg.title === bot ? BOTAVT : false}
                    title={msg.title}
                    titleColor={msg.title === bot ? "black" : "white"}
                    position={msg.title === bot ? "left" : "right"}
                    text={msg.modified ? msg.txt : msg.text}
                    type={"text"}
                    onClick={
                      msg.queId
                        ? () => handleAnswerlogic(msg.queId)
                        : msg.txt
                        ? () => handlelogic(msg.txt)
                        : () => handlefeedback(msg.text)
                    }
                  />
                </>
              );
            })}
            {loader ? (
              <div style={{ margin: "20px" }}>
                <p>
                  Please wait...
                  <br />
                  checking availability
                </p>
                <SyncLoader color="#36d7b7" />
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="input-container">
            <input
              placeholder="Type a Message.."
              value={userMessage}
              onChange={userMessageHandle}
              disabled={true}
              //   onKeyPress={(e) => handleKeyPress(e)}
            />

            <ThemeProvider theme={theme}>
              <SendIcon
                size={25}
                className="sendBtn"
                onClick={sendBtnHandle}
                color="neutral"
                fontSize="medium"
              />
            </ThemeProvider>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <BotProcessHandle />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeButton={false}
        limit={1}
      />
    </>
  );
};

export default Userchat;
