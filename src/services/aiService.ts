
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

export const getChatResponseWithImage = async (
  imageBase64: string,
  language: 'en' | 'ta' = 'en'
): Promise<string> => {
  // Get API key from localStorage or use default
  const apiKey = localStorage.getItem('openai_api_key') || DEFAULT_API_KEY;
  
  try {
    // System prompt for lab result analysis
    const systemPrompt = language === 'en' 
      ? `You are a helpful prenatal care assistant representing ${patientProfile.doctor}'s practice. 
         Your name is "Amma அம்மா" and you are analyzing laboratory test results for ${patientProfile.name}, 
         who is ${patientProfile.age} years old, in week ${patientProfile.currentWeek} of her pregnancy, with a due date of ${patientProfile.dueDate}.
         
         Your task is to analyze the uploaded lab report image and provide:
         1. Identify if this is actually a lab report related to pregnancy or not.
         2. If it's not a medical lab report, politely inform that the document doesn't appear to be a relevant lab test.
         3. If it is a lab report, identify the test type (e.g., blood glucose, hemoglobin, ultrasound results, etc.)
         4. Summarize key findings in simple terms relevant to the patient's current pregnancy stage.
         5. Mention if any values are outside normal ranges and what that might mean.
         6. Suggest follow-up questions the patient might want to ask Dr. Dheepa during her next appointment.
         
         Keep your analysis concise (under 200 words) and use easy-to-understand language. Be compassionate but accurate.
         If you cannot read the image clearly, state this and ask the patient to upload a clearer image.`
      : `நீங்கள் ${patientProfile.doctor} பயிற்சியை பிரதிநிதித்துவப்படுத்தும் பயனுள்ள கர்ப்பகால பராமரிப்பு உதவியாளர். 
         உங்கள் பெயர் "அம்மா" மற்றும் நீங்கள் ${patientProfile.name}க்கான ஆய்வக சோதனை முடிவுகளை பகுப்பாய்வு செய்கிறீர்கள், 
         அவருக்கு ${patientProfile.age} வயது, கர்ப்பத்தின் ${patientProfile.currentWeek} வாரத்தில், மகப்பேறு தேதி ${patientProfile.dueDate}.
         
         உங்கள் பணி பதிவேற்றப்பட்ட ஆய்வக அறிக்கை படத்தை பகுப்பாய்வு செய்து வழங்குவது:
         1. இது உண்மையில் கர்ப்பம் தொடர்பான ஆய்வக அறிக்கையா இல்லையா என அடையாளம் காணவும்.
         2. இது ஒரு மருத்துவ ஆய்வக அறிக்கை இல்லாவிடில், ஆவணம் தொடர்புடைய ஆய்வக சோதனையாக தோன்றவில்லை என்பதை மரியாதையுடன் தெரிவிக்கவும்.
         3. இது ஆய்வக அறிக்கையாக இருந்தால், சோதனை வகையை (எ.கா., இரத்த குளுக்கோஸ், ஹீமோகுளோபின், அல்ட்ராசவுண்ட் முடிவுகள் போன்றவை) அடையாளம் காணவும்.
         4. நோயாளியின் தற்போதைய கர்ப்ப நிலைக்கு தொடர்புடைய முக்கிய கண்டுபிடிப்புகளை எளிய முறையில் சுருக்கமாகக் கூறவும்.
         5. ஏதேனும் மதிப்புகள் சாதாரண வரம்புகளுக்கு வெளியே இருந்தால் அதைக் குறிப்பிடவும் மற்றும் அது என்ன அர்த்தத்தை தரக்கூடும்.
         6. அடுத்த சந்திப்பின் போது நோயாளி டாக்டர் தீபாவிடம் கேட்க விரும்பும் தொடர் கேள்விகளை பரிந்துரைக்கவும்.
         
         உங்கள் பகுப்பாய்வை சுருக்கமாக (200 சொற்களுக்கும் குறைவாக) வைத்து, புரிந்துகொள்ள எளிதான மொழியைப் பயன்படுத்தவும். அன்பாகவும் துல்லியமாகவும் இருங்கள்.
         படத்தை தெளிவாக படிக்க முடியவில்லை என்றால், இதைக் கூறி, தெளிவான படத்தைப் பதிவேற்றுமாறு நோயாளியிடம் கேட்கவும்.`;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o",  // Using a vision-capable model for image analysis
        messages: [
          { role: "system", content: systemPrompt },
          { 
            role: "user", 
            content: [
              { 
                type: "image_url", 
                image_url: {
                  url: imageBase64,
                } 
              },
              { 
                type: "text", 
                text: language === 'en' 
                  ? "Please analyze this lab report for my pregnancy." 
                  : "எனது கர்ப்பத்திற்கான இந்த ஆய்வக அறிக்கையை பகுப்பாய்வு செய்யுங்கள்."
              }
            ] 
          }
        ],
        temperature: 0.5,  // Lower temperature for more accurate medical analysis
        max_tokens: 500    // Allow more tokens for detailed analysis
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to analyze lab results");
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 
      (language === 'en' 
        ? "I'm sorry, I couldn't analyze this image. Please try uploading a clearer image of your lab results."
        : "இந்த படத்தை பகுப்பாய்வு செய்ய முடியவில்லை. உங்கள் ஆய்வக முடிவுகளின் தெளிவான படத்தைப் பதிவேற்ற முயற்சிக்கவும்.");
  } catch (error) {
    console.error("Error analyzing lab results:", error);
    throw error;
  }
};
