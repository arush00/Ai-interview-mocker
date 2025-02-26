"use client";
import React, { useEffect, useState, use } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview({ params }) {
  const resolvedParams = use(params); // Unwrap params using React.use()
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    if (resolvedParams?.interviewId) {
      GetInterviewDetails(resolvedParams.interviewId);
    }
  }, [resolvedParams?.interviewId]);

  const GetInterviewDetails = async (interviewId) => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));

      if (result.length === 0) {
        console.error("No interview found for ID:", interviewId);
        return;
      }

      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      setMockInterviewQuestions(jsonMockResp);
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
    {/* Question Section */}
    <QuestionsSection mockInterviewQuestions={mockInterviewQuestions}
      activeQuestionIndex={activeQuestionIndex}
    />
    <RecordAnswerSection
      mockInterviewQuestions={mockInterviewQuestions}
      activeQuestionIndex={activeQuestionIndex}
      interviewData={interviewData}
    />
    <div className="flex justify-end gap-6">
      {activeQuestionIndex > 0 &&
        <Button  onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
      {activeQuestionIndex != mockInterviewQuestions?.length - 1 && <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</Button>}
      {activeQuestionIndex == mockInterviewQuestions?.length - 1 && (
          <Link  href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
          
          <Button>End Interview</Button>
          </Link>)}
    </div>
  </div>
}

export default StartInterview;
