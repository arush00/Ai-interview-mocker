"use client";
import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import { db } from "@/utils/db";

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [jobExperience, setJobExperience] = useState("");
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const { user } = useUser();
    const router = useRouter();

    // Ensuring the component is mounted before using certain hooks
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Avoid hydration mismatch
    if (!isMounted) return null;

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log(jobPosition, jobDesc, jobExperience);

        const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}, depends on this information please give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions and answers in JSON format, with questions and answers as fields.`;

        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonResp = result.response
            .text()
            .replace("```json", "")
            .replace("```", "");

        try {
            const parsedJson = JSON.parse(MockJsonResp);
            setJsonResponse(parsedJson);
        } catch (error) {
            console.error("Invalid JSON response:", MockJsonResp);
        }

        setLoading(false);

        if (MockJsonResp) {
            const resp = await db.insert(MockInterview)
                .values({
                    mockId: uuidv4(),
                    jsonMockResp: MockJsonResp,
                    jobPosition: jobPosition,
                    jobDesc: jobDesc,
                    jobExperience: jobExperience,
                    createdBy: user?.primaryEmailAddress?.emailAddress || "Anonymous",
                    createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
                })
                .returning({ mockId: MockInterview.mockId });

            console.log("Inserted ID: ", resp);
            if (resp) {
                setOpenDialog(false);
                router.push(`/dashboard/interview/${resp[0]?.mockId}`);
            }
        } else {
            console.log("Error:");
        }
    };

    return (
        <div>
            <div
                className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
                onClick={() => setOpenDialog(true)}
            >
                <h2 className="text-lg text-center">+ Add New</h2>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-2xl w-full mx-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">
                            Tell Us More About Your Job Interview
                        </DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2>Add Details About Your Job Position/Role, Job Description</h2>
                                    <div className="mt-7 my-3">
                                        <label>Job Role / Job Position</label>
                                        <Input
                                            placeholder="Ex. Full Stack Developer"
                                            required
                                            onChange={(event) => setJobPosition(event.target.value)}
                                        />
                                    </div>
                                    <div className="my-3">
                                        <label>Job Description / Tech Stack (In Short)</label>
                                        <Textarea
                                            placeholder="Ex. Node.js, React, Python, MySQL, Angular..."
                                            required
                                            onChange={(event) => setJobDesc(event.target.value)}
                                        />
                                    </div>
                                    <div className="my-3">
                                        <label>Years of Experience</label>
                                        <Input
                                            placeholder="Ex. 5"
                                            type="number"
                                            required
                                            onChange={(event) => setJobExperience(event.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-5 justify-end">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => setOpenDialog(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <LoaderCircle className="animate-spin" /> Generating From AI...
                                            </>
                                        ) : (
                                            "Start Interview"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewInterview;
