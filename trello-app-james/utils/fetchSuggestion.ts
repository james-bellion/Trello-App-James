
// // will do an API call 

// // passing GBT our data and getting a response 

// import { Board } from "@/typings"
// import formatTodosForAI from "./formatTodosForAI"


// // when we get that back we pass the response 
// const fetchSuggestion = async (board: Board) => {
//     const todos = formatTodosForAI(board)

    
//     console.log('FORMATTED TODOS TO send >>', todos) // for debugging
    
//     const res = await fetch("/api/generateSummary", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ todos }),
//     })

//     const GPTdata = await res.json()
//     const { content } = GPTdata

//     return content
// }

// export default fetchSuggestion

import { Board } from "@/typings";
import formatTodosForAI from "./formatTodosForAI";

const fetchSuggestion = async (board: Board) => {
  try {
    const todos = formatTodosForAI(board);
    const res = await fetch("/api/generateSummary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todos }),
    });

    const GPTdata = await res.json();
    const { suggestion } = GPTdata; // Update this line to access the correct field in the GPT data

    return suggestion || "AI bot is summarizing your tasks for the day...";
  } catch (error) {
    console.error("Error fetching suggestion:", error);
    return "AI bot is summarizing your tasks for the day..."; // Return a default message in case of error
  }
};

export default fetchSuggestion;
