// A single interview question with its reasoning
export type Question = {
  question: string; // The interview question
  insight: string; // Why this question reveals something meaningful
};

// Shape of the API response returned to the client
export type APIResponse = {
  questions: Question[];
  jobTitle: string;
};
