

import { useState } from "react";
import { FiSend } from "react-icons/fi";

function Main() {
   const [text, setText] = useState('');
   const [outputText, setOutputText] = useState("");
   const [language, setLanguage] = useState(""); // Track the selected language

   const handleSend = async () => {
      if (!text || !language) {
         setOutputText("Please enter text and select a language.");
         return;
      }

      try {
         // Create a translator instance to translate from English ('en') to the selected language
         const translator = await self.ai.translator.create({
            sourceLanguage: 'en', // Assuming English as the source language
            targetLanguage: language, // The selected target language
            monitor(m) {
               m.addEventListener('downloadprogress', (e) => {
                  console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
               });
            },
         });

         // Translate the text
         const translatedText = await translator.translate(text);
         setOutputText(translatedText); // Set the translated text to outputText
      } catch (error) {
         console.error("Translation failed:", error);
         setOutputText("Error translating text: " + error.message);
      }

      setText(""); // Clear the input field
   };

   const handleLanguageChange = (e) => {
      setLanguage(e.target.value); // Update the selected language
   };

   return (
      <div className="container">
         <div className="main_container">
            <div className="main_contain1 ">
               {outputText}
               <div className="lang-detect">
                  <label>Language Detector</label>
                  <input className="lang-input" type="text" value={language || "No language selected"} readOnly />
               </div>
            </div>
            <input
               type="text"
               className="main_contain2"
               value={text}
               onChange={(e) => setText(e.target.value)}
            />
            <div className="container-grid">
               <div>
                  <button className="Summarize">Summarize</button>
               </div>
               <div className="dropdown">
                  <select
                     className="Summarize"
                     id="languages"
                     name="languages"
                     value={language} // Controlled component
                     onChange={handleLanguageChange} // Handle language change
                  >
                     <option value="" disabled>Select a language</option>
                     <option value="English">English</option>
                     <option value="spanish">Spanish</option>
                     <option value="French">French</option>
                     <option value="Turkish">Turkish</option>
                     <option value="Portuguese ">Portuguese</option>
                     <option value="Russian">Russian</option>
                     
                  </select>
               </div>
               <div onClick={handleSend}>
                  <FiSend className="Summarize1" />
               </div>
            </div>
         </div>
      </div>
   );
}

export default Main;



/*
import { useState } from "react";
import { FiSend } from "react-icons/fi";

function Main() {
   const [text, setText] = useState('');
   const [outputText, setOutputText] = useState("");
   const [language, setLanguage] = useState(""); // Track the selected language

   const handleSend = () => {
    setOutputText(text); // Set the output text to be the input text
    setText(""); // Clear the input field
  };

   const handleLanguageChange = (e) => {
      setLanguage(e.target.value); // Update the selected language
   }

    return (
        <div className="container">
            hello
           <div className="main_container">
            <div className="main_contain1"> 
              {outputText}
              <div className="lang-detect">
                <label>language-detector</label>
                <input className="lang-input" type="text" readOnly />
              </div>
            </div>
            <input 
              type="text" 
              className="main_contain2" 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
            />
            <div className="container-grid">
              <div>
                <button className="Summarize">Summarize</button>
              </div>
              <div className="dropdown">
                <select 
                  className="Summarize" 
                  id="languages" 
                  name="languages" 
                  value={language} // Controlled component
                  onChange={handleLanguageChange} // Handle language change
                >
                  <option value="" disabled>Select a language</option>
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                  <option value="pt">Portuguese</option>
                  <option value="ru">Russian</option>
                  <option value="zh">Chinese</option>
                  <option value="ja">Japanese</option>
                </select>
              </div>
              <div onClick={handleSend}>
                <FiSend className="Summarize1" />
              </div>
            </div>
           </div>
        </div>
    )
}

export default Main


/*

"
 const translator = await self.ai.translator.create({
  sourceLanguage: 'es',
  targetLanguage: 'fr',
  monitor(m) {
    m.addEventListener('downloadprogress', (e) => {
      console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
    });
  },
});

"
"i want to add this to to translate langauge when i click the send button"


*/



