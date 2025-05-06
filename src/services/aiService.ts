
import { toast } from "@/components/ui/use-toast";

const API_URL = "https://api.openai.com/v1/chat/completions";
const DEFAULT_API_KEY = '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';

// Patient profile data to include in prompts
const patientProfile = {
  name: "Adhira M",
  age: 29,
  currentWeek: 24,
  dueDate: "August 15, 2025",
  doctor: "Dr. Dheepa Thyagrajan"
};

export const getChatResponse = async (
  message: string, 
  language: 'en' | 'ta' = 'en'
): Promise<string> => {
  // Get API key from localStorage or use default
  const apiKey = localStorage.getItem('openai_api_key') || DEFAULT_API_KEY;
  
  try {
    const systemPrompt = language === 'en' 
      ? `You are a helpful prenatal care assistant representing ${patientProfile.doctor}'s practice. 
         Your name is "Amma அம்மா" and you assist patients with questions about pregnancy and prenatal care.
         You are currently speaking with ${patientProfile.name}, who is ${patientProfile.age} years old, in week ${patientProfile.currentWeek} of her pregnancy, with a due date of ${patientProfile.dueDate}.
         Always personalize your responses based on the patient's profile information.
         For example, refer to her by name, mention her specific week of pregnancy when relevant, 
         and give advice appropriate for her trimester.
         Provide helpful, accurate, and compassionate information. For serious medical concerns, always 
         advise consulting with ${patientProfile.doctor} directly. Keep responses concise (under 150 words).`
      : `நீங்கள் ${patientProfile.doctor} பயிற்சியை பிரதிநிதித்துவப்படுத்தும் பயனுள்ள கர்ப்பகால பராமரிப்பு உதவியாளர்.
         உங்கள் பெயர் "அம்மா" மற்றும் நீங்கள் கர்ப்பம் மற்றும் கர்ப்பகால பராமரிப்பு பற்றிய கேள்விகளுடன் நோயாளிகளுக்கு உதவுகிறீர்கள்.
         நீங்கள் தற்போது ${patientProfile.name} உடன் பேசிக் கொண்டிருக்கிறீர்கள், அவருக்கு ${patientProfile.age} வயது, கர்ப்பத்தின் ${patientProfile.currentWeek} வாரத்தில் உள்ளார், மகப்பேறு தேதி ${patientProfile.dueDate}.
         எப்போதும் நோயாளியின் சுயவிவர தகவலின் அடிப்படையில் உங்கள் பதில்களை தனிப்பயனாக்கவும்.
         எடுத்துக்காட்டாக, அவரை பெயரால் குறிப்பிடுங்கள், தொடர்புடையபோது அவரது குறிப்பிட்ட கர்ப்ப வாரத்தைக் குறிப்பிடுங்கள்,
         மற்றும் அவரது திரைமாற்றத்திற்கு பொருத்தமான அறிவுரையை வழங்கவும்.
         பயனுள்ள, துல்லியமான மற்றும் இரக்கமான தகவலை வழங்கவும். கடுமையான மருத்துவ கவலைகளுக்கு, எப்போதும்
         டாக்டர் ${patientProfile.doctor} நேரடியாக ஆலோசிக்க அறிவுறுத்துங்கள். பதில்களை சுருக்கமாக வைக்கவும் (150 சொற்களுக்கும் குறைவாக).`;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",  // Using a reliable model for medical information
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to get response from AI");
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Error getting AI response:", error);
    throw error;
  }
};
