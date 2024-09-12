import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import useUserToken from "@/hooks/useUserToken";
import { useStudyContext } from "@/app/context/StudyContext";

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-dots loading-md"></span>
    </div>
  ),
});

const TextEditor = () => {
  const currentStudyContext = useStudyContext();
  const [text, setText] = useState("");
  const [textSaved, setTextSaved] = useState(false);
  const [textCompletion, setTextCompletion] = useState("");
  const { userToken } = useUserToken();
  const isTyping = useRef(false);

  function removeHtmlTags(text: string) {
    return text.replace(/<\/?[^>]+(>|$)/g, "");
  }

  const sendCompletionRequest = async () => {
    if (!userToken || !removeHtmlTags(text).endsWith(" ")) return;

    const headers = {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    };

    const body = JSON.stringify({
      sentence_start: text,
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/completion`,
        {
          method: "POST",
          headers,
          body,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send completion request");
      }

      const data = await response.json();
      console.log("Completion response:", data.response);
      if (data?.response) {
        setTextCompletion(data.response);
      }
    } catch (error) {
      console.error("Error sending completion request:", error);
    }
  };

  // Debounced API call for completion
  useEffect(() => {
    const timer = setTimeout(() => {
      sendCompletionRequest();
    }, 1000);

    return () => clearTimeout(timer);
  }, [text]);

  // Load text from study context
  useEffect(() => {
    if (currentStudyContext && currentStudyContext.study?.text) {
      setText(currentStudyContext.study.text);
    }
  }, [currentStudyContext?.study?.text]);

  // Save text with completion
  useEffect(() => {
    const saveText = async () => {
      currentStudyContext?.updateWriterContent(text);
    };

    const timer = setTimeout(() => {
      saveText();
      setTextSaved(true);
    }, 2000);

    setTextSaved(false);
    return () => clearTimeout(timer);
  }, [text]);

  const handleTextChange = (value: string) => {
    setText(value);
    setTextCompletion(""); // Reset textCompletion when user types
  };
  return (
    <div className="w-full">
      <ReactQuill
        className="ql-container q-snow"
        theme="snow"
        value={`<p>${removeHtmlTags(text)}${
          textCompletion ? `<span>${textCompletion}</span>` : ""
        }</p>`}
        onChange={handleTextChange}
        style={{ height: "calc(100vh - 125px)", borderRadius: "5px" }}
      />
    </div>
  );
};

export default TextEditor;
