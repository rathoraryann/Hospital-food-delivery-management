import React, { useEffect, useState } from "react";
import Login from "../components/authentication/Login";
import Signup from "../components/authentication/Signup";
import { Box, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";

const Authentication = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [translate, setTranslate] = useState();
  const [fadeIn, setFadeIn] = useState(keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`);

  useEffect(() => {
    setTranslate(isSignUp ? "translateX(-32vw)" : "translateX(32vw)");
  }, [isSignUp]);

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(keyframes`0% { opacity: 0; } 100% { opacity: 1; }`);
    });
  }, [isSignUp]);

  const toggleIsSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <Box
      sx={{
        minH: "100vh",
        minW: "100vw",
        display: "flex",
        justifyContent: { base: "center", lg: "unset" },
        flexDirection: isSignUp ? "row-reverse" : "row",
        alignItems: { base: "center", lg: "unset" },
        position: { base: "static", lg: "relative" },
      }}
    >
      <Box
        sx={{
          display: { base: "none", lg: "block" },
          bgColor: "gray.300",
          width: "40vw",
          roundedTopLeft: isSignUp ? "full" : "0px",
          roundedBottomRight: isSignUp ? "0px" : "full",
          position: "relative",
        }}
      >
        <Box
          as={motion.div}
          sx={{
            position: "absolute",
            bottom: isSignUp ? "40vh" : "",
            top: isSignUp ? "" : "40vh",
            left: isSignUp ? "" : "-30vh",
            right: isSignUp ? "-30vh" : "",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            transform: translate,
            transition: "transform 0.9s ease-out, opacity 0.5s ease-out",
          }}
        >
          <Text
            sx={{
              fontSize: "45px",
              fontWeight: "800",
              color: "#FFFFFF",
              px: "8px",
            }}
          >
            Medi Meals
          </Text>
          <Text
            sx={{
              fontSize: "20px",
              fontWeight: "800",
              color: "#FBFAF2",
              px: "8px",
              marginTop: "-21px",
            }}
          >
            {isSignUp ? "Join with us" : "Welcome"}
          </Text>
        </Box>
      </Box>
      {isSignUp ? (
        <Box as={motion.div}>
          <Box
            sx={{
              position: { base: "static", lg: "absolute" },
              top: "20vh",
              left: "20vh",
              opacity: 0,
              animation: `${fadeIn} 0.5s ease-in forwards`,
              animationDelay: "0.3s",
            }}
          >
            <Box
              sx={{
                display: { base: "block", lg: "none" },
              }}
            >
              <Text
                sx={{
                  fontSize: "32px",
                  fontWeight: "800",
                  color: "gray",
                  px: "8px",
                }}
              >
                "Join with us"
              </Text>
            </Box>
            <Signup toggleIsSignUp={toggleIsSignUp} />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            position: { base: "static", lg: "absolute" },
            top: "30vh",
            right: "20vh",
            opacity: 0,
            animation: `${fadeIn} 0.5s ease-in forwards`,
            animationDelay: "0.3s",
          }}
        >
          <Box
            sx={{
              display: { base: "block", lg: "none" },
            }}
          >
            <Text
              sx={{
                fontSize: "32px",
                fontWeight: "800",
                color: "gray",
                px: "8px",
              }}
            >
              Welcome
            </Text>
          </Box>
          <Login toggleIsSignUp={toggleIsSignUp} />
        </Box>
      )}
    </Box>
  );
};

export default Authentication;
