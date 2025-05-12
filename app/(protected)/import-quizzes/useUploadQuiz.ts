import React, { useCallback, useState } from "react";
import { useMutation } from '@apollo/client';
import { ADD_QUIZ_DATA } from '@/app/graphql/QuizData';

const useUploadQuiz = () => {
  const [addQuizData] = useMutation(ADD_QUIZ_DATA);
  const [quizData, setQuizData] = useState<any[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
  
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const text = e.target?.result as string;
          const varrowjson = JSON.parse(text);
  
          setQuizData(varrowjson); // local preview
  
          const { data } = await addQuizData({
            variables: { 
              rawJson: JSON.stringify(varrowjson) // ✅ must be stringified!
            }
          });
  
          if (data.addQuizData) {
            console.log("Quiz inserted successfully");
            setUploadStatus("Upload successful!");
          } else {
            console.log("Quiz insert failed or duplicate");
            setUploadStatus("Upload failed or duplicate.");
          }
        };
  
        reader.readAsText(file);
      } catch (error) {
        console.error("Upload error:", error);
        setUploadStatus("Upload failed!");
      }
    },
    [addQuizData]
  );
  
  return {
    handleFileUpload,
    quizData,
    uploadStatus
  };
};

export default useUploadQuiz;

