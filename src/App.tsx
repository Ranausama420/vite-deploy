import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
interface FAQItem {
  question: string;
  answer: string[];
  source: { page_content: string; pdf_numpages: number; source: string;}[];
}

function App() {
  // const [count, setCount] = useState(0)
  // const [faqData, setFaqData] = useState<FAQItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    console.log('fetchData')
    try {
      setIsLoading(true);
      const response = await axios.post('https://aichatbot.herokuapp.com/readdb/', {}, {
        headers: {
          Accept: 'application/json',
        },
      });

      // Handle the response data
      const parsedData: FAQItem[] = [];
      console.log(response.data);
      const data=response.data
      // setPdfData(response.data.msg);
      data.forEach((item: any) => {
        // console.log(item)
        // console.log(typeof item)
        const question=item.question
        const answers=[item.answer]
        const source=item.source

      const questionExists = parsedData.some((data) => data.question === question);
      if (questionExists) {
        // Find the existing data with the matching question
        const existingData = parsedData.find((data) => data.question === question);

        if (existingData) {
          // Append the new answer to the existing data's answer list
          existingData.answer.push(...answers as string[]);
          existingData.source = item.source;
        }
      } else {
        // Add a new entry to the parsedData list
        parsedData.push({
          question,
          answer: answers as string[],
          source: source as {
            page_content: string;
            pdf_numpages: number;
            source: string;
          }[],
        });
      }

        // setFaqData(parsedData);
      
  
      });

      
    } catch (error) {
      // Handle errors
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false); // Set isLoading to false after the request is completed (whether success or error)
    }
  };


  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + usama8</h1>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}> */}
        <button onClick={fetchData}>
        
          count is {isLoading}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
