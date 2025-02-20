

import { useState } from "react";
import { FiSend } from "react-icons/fi";

function Main() {
   const [text, setText] = useState('');
   const [outputText, setOutputText] = useState("");
   const [language, setLanguage] = useState(""); // Track the selected language
   const [isLoading, setIsLoading] = useState(false); // To track loading state
   const [error, setError] = useState(""); // Error state for summarize button

   // Language mapping
   const languageMap = {
      es: "Spanish",
      fr: "French",
      tr: "Turkish",
      pt: "Portuguese",
      ru: "Russian",
      en: "English",
   };

   // Automatically set language to English if no language is selected and there's text
   const detectLanguage = (inputText) => {
      if (!language && inputText) {
         setLanguage("en"); // Set to English if no language is selected
      }
   };

   const handleSend = async () => {
      // Clear error message before processing new input
      setError("");

      // Before translating, detect the language if not selected
      detectLanguage(text);

      if (!text || !language) {
         setOutputText("Please enter text and select a language.");
         return;
      }

      if (language === "en") {
         // If the selected language is English, just display the entered text
         setOutputText(text);
         return;
      }

      try {
         setIsLoading(true); // Start loading

         // Simulate the translation logic (replace with actual translation API call)
         const translator = await self.ai.translator.create({
            sourceLanguage: 'en', // Assuming English as the source language
            targetLanguage: language, // The selected target language
            monitor(m) {
               m.addEventListener('downloadprogress', (e) => {
                  console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
               });
            },
         });

         const translatedText = await translator.translate(text);
         setOutputText(translatedText); // Set the translated text to outputText
      } catch (error) {
         console.error("Translation failed:", error);
         setOutputText("Error translating text: " + error.message);
      } finally {
         setIsLoading(false); // Stop loading
      }

      setText(""); // Clear the input field
   };

   const handleLanguageChange = (e) => {
      setLanguage(e.target.value); // Update the selected language
   };

   const handleSummarizeClick = () => {
      // Simulate an error when clicking the "Summarize" button
      setError("Summary not available at the moment. Please try again later.");
   };

   return (
      <div className="container">
         <div className="main_container">
            <div className="main_contain1">
               {isLoading ? <div>Loading...</div> : outputText}
               <div className="lang-detect">
                  <label>Language Detector</label>
                  <input
                     className="lang-input"
                     type="text"
                     value={language ? languageMap[language] : "No language detected"}
                     readOnly
                  />
               </div>
               {error && <div className="error-message">{error}</div>} {/* Show error message if present */}
            </div>
            <input
               type="text"
               className="main_contain2"
               value={text}
               onChange={(e) => setText(e.target.value)}
               placeholder="Enter text here"
            />
            <div className="container-grid">
               <div>
                  <button className="Summarize2" onClick={handleSummarizeClick}>Summarize</button>
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
                     <option value="pt">Portuguese</option>
                     <option value="fr">French</option>
                     <option value="tr">Turkish</option>
                     <option value="ru">Russian</option>
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
   const [isLoading, setIsLoading] = useState(false); // To track loading state

   // Language mapping
   const languageMap = {
      es: "Spanish",
      fr: "French",
      tr: "Turkish",
      pt: "Portuguese",
      ru: "Russian",
      en: "English",
   };

   // Automatically set language to English if no language is selected and there's text
   const detectLanguage = (inputText) => {
      if (!language && inputText) {
         setLanguage("en"); // Set to English if no language is selected
      }
   };

   const handleSend = async () => {
      // Before translating, detect the language if not selected
      detectLanguage(text);

      if (!text || !language) {
         setOutputText("Please enter text and select a language.");
         return;
      }

      if (language === "en") {
         // If the selected language is English, just display the entered text
         setOutputText(text);
         return;
      }

      try {
         setIsLoading(true); // Start loading

         // Simulate the translation logic (replace with actual translation API call)
         const translator = await self.ai.translator.create({
            sourceLanguage: 'en', // Assuming English as the source language
            targetLanguage: language, // The selected target language
            monitor(m) {
               m.addEventListener('downloadprogress', (e) => {
                  console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
               });
            },
         });

         const translatedText = await translator.translate(text);
         setOutputText(translatedText); // Set the translated text to outputText
      } catch (error) {
         console.error("Translation failed:", error);
         setOutputText("Error translating text: " + error.message);
      } finally {
         setIsLoading(false); // Stop loading
      }

      setText(""); // Clear the input field
   };

   const handleLanguageChange = (e) => {
      setLanguage(e.target.value); // Update the selected language
   };

   return (
      <div className="container">
         <div className="main_container">
            <div className="main_contain1">
               {isLoading ? <div>Loading...</div> : outputText}
               <div className="lang-detect">
                  <label>Language Detector</label>
                  <input
                     className="lang-input"
                     type="text"
                     value={language ? languageMap[language] : "No language detected"}
                     readOnly
                  />
               </div>
            </div>
            <input
               type="text"
               className="main_contain2"
               value={text}
               onChange={(e) => setText(e.target.value)}
               placeholder="Enter text here"
            />
            <div className="container-grid">
               <div>
                  <button className="Summarize2">Summarize</button>
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
                     <option value="pt">Portuguese</option>
                     <option value="fr">French</option>
                     <option value="tr">Turkish</option>
                     <option value="ru">Russian</option>
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

"pls i want the summarize button to throw an error when being click like summmary not available at the moment pls try again"





import { useState } from "react";
import { FiSend } from "react-icons/fi";

function Main() {
   const [text, setText] = useState('');
   const [outputText, setOutputText] = useState("");
   const [language, setLanguage] = useState(""); // Track the selected language
   const [isLoading, setIsLoading] = useState(false); // To track loading state

   // Language mapping
   const languageMap = {
      es: "Spanish",
      fr: "French",
      tr: "Turkish",
      pt: "Portuguese",
      ru: "Russian",
      en: "English",
   };

   // Automatically set language to English if no language is selected and there's text
   const detectLanguage = (inputText) => {
      // If the input text is not empty and no language is selected, assume it's English
      if (!language && inputText) {
         setLanguage("en");
      }
   };

   const handleSend = async () => {
      // Before translating, detect the language if not selected
      detectLanguage(text);

      if (!text || !language) {
         setOutputText("Please enter text and select a language.");
         return;
      }

      try {
         setIsLoading(true); // Start loading
         const translator = await self.ai.translator.create({
            sourceLanguage: 'en', // Assuming English as the source language
            targetLanguage: language, // The selected target language
            monitor(m) {
               m.addEventListener('downloadprogress', (e) => {
                  console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
               });
            },
         });

         const translatedText = await translator.translate(text);
         setOutputText(translatedText); // Set the translated text to outputText
      } catch (error) {
         console.error("Translation failed:", error);
         setOutputText("Error translating text: " + error.message);
      } finally {
         setIsLoading(false); // Stop loading
      }

      setText(""); // Clear the input field
   };

   const handleLanguageChange = (e) => {
      setLanguage(e.target.value); // Update the selected language
   };

   return (
      <div className="container">
         <div className="main_container">
            <div className="main_contain1">
               {isLoading ? <div>Loading...</div> : outputText}
               <div className="lang-detect">
                  <label>Language Detector</label>
                  <input
                     className="lang-input"
                     type="text"
                     value={language ? languageMap[language] : "No language selected"}
                     readOnly
                  />
               </div>
            </div>
            <input
               type="text"
               className="main_contain2"
               value={text}
               onChange={(e) => setText(e.target.value)}
               placeholder="Enter text here"
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
                     <option value="pt">Portuguese</option>
                     <option value="fr">French</option>
                     <option value="tr">Turkish</option>
                     <option value="ru">Russian</option>
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





import { useState } from "react";
import { FiSend } from "react-icons/fi";

function Main() {
   const [text, setText] = useState('');
   const [outputText, setOutputText] = useState("");
   const [language, setLanguage] = useState(""); // Track the selected language
   const [isLoading, setIsLoading] = useState(false); // To track loading state

   // Language mapping
   const languageMap = {
      es: "Spanish",
      fr: "French",
      tr: "Turkish",
      pt: "Portuguese",
      ru: "Russian",
      en: "English",
   };

   const handleSend = async () => {
      if (!text || !language) {
         setOutputText("Please enter text and select a language.");
         return;
      }

      try {
         setIsLoading(true); // Start loading
         const translator = await self.ai.translator.create({
            sourceLanguage: 'en', // Assuming English as the source language
            targetLanguage: language, // The selected target language
            monitor(m) {
               m.addEventListener('downloadprogress', (e) => {
                  console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
               });
            },
         });

         const translatedText = await translator.translate(text);
         setOutputText(translatedText); // Set the translated text to outputText
      } catch (error) {
         console.error("Translation failed:", error);
         setOutputText("Error translating text: " + error.message);
      } finally {
         setIsLoading(false); // Stop loading
      }

      setText(""); // Clear the input field
   };

   const handleLanguageChange = (e) => {
      setLanguage(e.target.value); // Update the selected language
   };

   return (
      <div className="container">
         <div className="main_container">
            <div className="main_contain1">
               {isLoading ? <div>Loading...</div> : outputText}
               <div className="lang-detect">
                  <label>Language Detector</label>
                  <input
                     className="lang-input"
                     type="text"
                     value={language ? languageMap[language] : "No language selected"}
                     readOnly
                  />
               </div>
            </div>
            <input
               type="text"
               className="main_contain2"
               value={text}
               onChange={(e) => setText(e.target.value)}
               placeholder="Enter text here"
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
                     <option value="es">Spanish</option>
                     <option value="pt">Portuguese</option>
                     <option value="fr">French</option>
                     <option value="tr">Turkish</option>
                     <option value="ru">Russian</option>
                     <option value="en">English</option>
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




*/