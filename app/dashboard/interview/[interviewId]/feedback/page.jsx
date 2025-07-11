"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronsUpDownIcon } from "lucide-react";

function Feedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [avgRating, setAvgRating] = useState();
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    GetFeedBack();
  }, []);

  const GetFeedBack = async () => {
    try {
      console.log("Interview ID:", params.interviewId);

      const result = await db.execute(
        sql`SELECT * FROM user_answers WHERE mock_id = ${params.interviewId}`
      );

      setFeedbackList(result.rows); // Update based on actual structure
      let getTotalOfRating = result.rows.reduce((sum, item) => sum + Number(item.rating), 0);
      setAvgRating(Math.round(getTotalOfRating / (result.rows.length || 1)));
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  return (
    <div className="p-10">
      {feedbackList.length === 0 ? (
        <h2 className="font-bold text-xl text-gray-500">No Interview Feedback Record Found</h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
          <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
          <h2 className="text-primary text-lg my-3">
            Your overall interview rating{" "}
            <strong className={avgRating < 6 ? "text-red-600" : "text-green-500"}>
              {avgRating}/10
            </strong>
          </h2>

          {feedbackList.map((item, index) => (
            <Collapsible key={index} className="mt-7">
              <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex items-center justify-between gap-7 w-full">
                {item.question} <ChevronsUpDownIcon className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col g-2">
                  <h2 className="text-red-600 p-2 rounded-lg"><strong>Rating:</strong> {item.rating}</h2>
                  <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900"><strong>Your Answer:</strong> {item.userAns}</h2>
                  <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900 mt-2"><strong>Correct Answer:</strong> {item.correctAns}</h2>
                  <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary mt-2"><strong>Feedback:</strong> {item.feedback}</h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}
      <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
    </div>
  );
}

export default Feedback;
