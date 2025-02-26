import { Lightbulb, Volume, Volume2 } from 'lucide-react';
import React from 'react';

function QuestionsSection({ mockInterviewQuestions, activeQuestionIndex }) {

    const textToSpeech = (text) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        } else {
            console.error("Speech synthesis not supported in this browser.");
        }
    
    }
    return mockInterviewQuestions && (
        <div className="p-6 border rounded-xl my-10 shadow-lg bg-white">
            {/* Question Numbers Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mockInterviewQuestions.map((_, index) => (
                    <h2 
                        key={index}
                        className={`p-3 rounded-lg text-sm md:text-base text-center cursor-pointer transition-all
                        ${activeQuestionIndex === index 
                            ? 'bg-primary text-white font-semibold shadow-md' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                        `}
                    >
                        Question #{index + 1}
                    </h2>
                ))}
            </div>

            {/* Active Question */}
            <h2 className="mt-6 text-lg md:text-xl font-semibold text-gray-800">
                {mockInterviewQuestions[activeQuestionIndex]?.question}
            </h2>
            <Volume2 onClick={()=>textToSpeech(mockInterviewQuestions[activeQuestionIndex]?.question)}/>

            {/* Note Section */}
            <div className="border rounded-xl p-5 bg-blue-50 mt-8 shadow-sm">
                <h2 className="flex items-center gap-2 text-blue-700 font-medium">
                    <Lightbulb size={20} />
                    <strong>Note:</strong>
                </h2>
                <h2 className="text-sm text-blue-600 mt-2">
                    {process.env.NEXT_PUBLIC_QUESTION_NOTE}
                </h2>
            </div>
        </div>
    );
}

export default QuestionsSection;
