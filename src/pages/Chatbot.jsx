import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { Send, Bot, User, PlusCircle } from 'lucide-react';

const TypingEffect = ({ text, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let i = 0;
        setDisplayedText('');
        const interval = setInterval(() => {
            setDisplayedText(prev => prev + text.charAt(i));
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                if (onComplete) onComplete();
            }
        }, 15); // Speed of typing
        return () => clearInterval(interval);
    }, [text, onComplete]);

    return <span>{displayedText}</span>;
};

// Trained Agricultural AI Knowledge Base
const agriculturalKnowledgeBase = {
    crop_recommendation: {
        keywords: ['crop', 'recommend', 'plant', 'grow', 'பயிர்', 'விவசாயம்', 'what to plant', 'season', 'temperature', 'rain'],
        en: "To recommend the best crop, I need to know your soil type and local weather. However, generally:\n1. For loamy soil with good rain, try Rice or Sugarcane.\n2. For sandy soil with less water, Millets or Groundnut are excellent.\n3. Always consider crop rotation with legumes (like beans) to keep the soil healthy.\nIf you're unsure, consulting your local agricultural extension office is a great idea!",
        ta: "சிறந்த பயிரைப் பரிந்துரைக்க, உங்கள் மண்ணின் வகை மற்றும் உள்ளூர் வானிலை எனக்குத் தெரிய வேண்டும். இருப்பினும், பொதுவாக:\n1. நல்ல மழை பெய்யும் களிமண்ணுக்கு, நெல் அல்லது கரும்பு முயற்சிக்கவும்.\n2. குறைந்த நீர்கொண்ட மணற்பாங்கான மண்ணுக்கு, சிறுதானியங்கள் அல்லது நிலக்கடலை சிறந்தது.\n3. மண்ணை ஆரோக்கியமாக வைத்திருக்க எப்போதும் பருப்பு வகைகளுடன் பயிர் சுழற்சியைக் கருத்தில் கொள்ளுங்கள்."
    },
    disease: {
        keywords: ['disease', 'sick', 'நோய்', 'பாதிப்பு', 'fungus', 'fungi', 'blight', 'wilt', 'கருகல்', 'வாடல்', 'spot', 'rot'],
        en: "Plant diseases can spread quickly. Here is what you should do:\n1. Upload a picture of the affected leaf in our 'Disease Detection' section for a specific diagnosis.\n2. Remove and safely destroy any diseased leaves immediately.\n3. Try organic solutions first, like neem oil spray, before resorting to strong chemicals.\n4. Avoid watering the leaves directly to prevent fungus.",
        ta: "தாவர நோய்கள் விரைவாக பரவக்கூடும். நீங்கள் செய்ய வேண்டியது இங்கே:\n1. குறிப்பிட்ட நோயறிதலுக்கு நமது 'நோய் கண்டறிதல்' பிரிவில் பாதிக்கப்பட்ட இலையின் படத்தைப் பதிவேற்றவும்.\n2. பாதிக்கப்பட்ட இலைகளை உடனடியாக அகற்றிப் பாதுகாப்பாக அழிக்கவும்.\n3. ரசாயனங்களுக்குச் செல்வதற்கு முன் வேப்ப எண்ணெய் ஸ்ப்ரே போன்ற இயற்கை தீர்வுகளை முயற்சிக்கவும்."
    },
    fertilizer_pesticide: {
        keywords: ['fertilizer', 'pesticide', 'compost', 'உரம்', 'பூச்சி', 'pest', 'bug', 'npk', 'nitrogen', 'spray', 'புழு'],
        en: "Healthy soil means healthy crops. I recommend an eco-friendly approach:\n1. Get your soil tested to know exactly what nutrients are missing.\n2. Prioritize organic compost or well-rotted cow dung to improve soil health permanently.\n3. For pests, try Integrated Pest Management (IPM). Use neem oil or introduce beneficial insects like ladybugs.\n4. If using chemical fertilizers, use them strictly according to a local expert's dosage.",
        ta: "ஆரோக்கியமான மண் ஆரோக்கியமான பயிர்களைக் குறிக்கிறது. நான் சூழல் நட்பு அணுகுமுறையைப் பரிந்துரைக்கிறேன்:\n1. எந்தெந்த ஊட்டச்சத்துக்கள் காணவில்லை என்பதைச் சரியாக அறிய உங்கள் மண்ணைப் பரிசோதிக்கவும்.\n2. மண்ணின் ஆரோக்கியத்தை நிரந்தரமாக மேம்படுத்த இயற்கை உரம் அல்லது நன்கு அழுகிய சாணத்திற்கு முன்னுரிமை கொடுங்கள்.\n3. பூச்சிகளுக்கு, வேப்ப எண்ணெயைப் பயன்படுத்தவும்."
    },
    irrigation_moisture: {
        keywords: ['water', 'rain', 'irrigation', 'தண்ணீர்', 'மழை', 'பாசனம்', 'moisture', 'dry', 'wet', 'drought', 'காய்ந்த'],
        en: "Low soil moisture indicates the soil is dry. You should:\n1. Start irrigation immediately, preferably during the early morning or late evening.\n2. Use drip irrigation to save water and deliver it directly to the roots.\n3. Add organic mulch (like straw or dry leaves) around the plants to retain soil moisture.\n4. Monitor your soil moisture regularly by checking 2-3 inches below the surface.",
        ta: "குறைந்த மண் ஈரப்பதம் மண் வறண்டு இருப்பதைக் குறிக்கிறது. நீங்கள் செய்ய வேண்டியவை:\n1. உடனடியாக நீர்ப்பாசனத்தைத் தொடங்குங்கள், அதிகாலை அல்லது மாலை தாமதமாகச் செய்வது நல்லது.\n2. தண்ணீரைச் சேமிக்கச் சொட்டுநீர் பாசனத்தைப் பயன்படுத்தவும்.\n3. மண்ணின் ஈரப்பதத்தைத் தக்கவைக்கத் தாவரங்களைச் சுற்றி இயற்கை தழைகளைப் (வைக்கோல் உலர் இலைகள்) போடவும்.\n4. தொடர்ந்து மண்ணின் ஈரப்பதத்தைக் கண்காணிக்கவும்."
    },
    weather: {
        keywords: ['weather', 'climate', 'sun', 'forecast', 'வானிலை', 'வெயில்', 'wind', 'storm', 'heat'],
        en: "Weather plays a huge role in farming:\n1. If heavy rain is forecast, delay applying fertilizers so they don't wash away.\n2. During extreme heat, increase mulching to protect roots and water more deeply.\n3. If a storm is coming, ensure tall crops are staked or supported.\nAlways check your local daily weather forecast before making spraying or watering decisions.",
        ta: "விவசாயத்தில் வானிலை பெரும் பங்கு வகிக்கிறது:\n1. பலத்த மழை பெய்யும் என்று கணிக்கப்பட்டால், உரங்கள் அடித்துச் செல்லப்படாமல் இருக்க உரமிடுவதைத் தாமதப்படுத்துங்கள்.\n2. அதிக வெப்பத்தின் போது, வேர்களைப் பாதுகாக்க தழைக்கூளத்தை அதிகரிக்கவும், ஆழமாக நீர் பாய்ச்சவும்.\n3. தெளித்தல் அல்லது நீர்ப்பாசன முடிவுகளை எடுப்பதற்கு முன் எப்போதும் உங்கள் உள்ளூர் தினசரி வானிலை முன்னறிவிப்பைச் சரிபார்க்கவும்."
    },
    market: {
        keywords: ['price', 'market', 'sell', 'விலை', 'சந்தை', 'விற்பனை', 'profit', 'cost', 'money', 'mandi'],
        en: "Getting the right price is important for your hard work:\n1. Check the e-NAM (National Agriculture Market) portal daily for real-time commodity prices.\n2. Consider sorting and grading your produce; higher quality always fetches a premium.\n3. Group together with neighboring farmers to form an FPO (Farmer Producer Organization) for better bargaining power.\n4. Try to avoid selling immediately during peak harvest when prices drop.",
        ta: "உங்கள் கடின உழைப்புக்கு சரியான விலை பெறுவது முக்கியம்:\n1. நிகழ்நேரப் பொருட்களின் விலைகளுக்குத் தினமும் e-NAM (தேசிய வேளாண் சந்தை) போர்ட்டலைச் சரிபார்க்கவும்.\n2. உங்கள் விளைபொருட்களைத் தரம் பிரித்து வரிசைப்படுத்துவதைக் கருத்தில் கொள்ளுங்கள்; உயர் தரம் எப்போதும் நல்ல விலையைப் பெறும்.\n3. சிறந்த பேரம் பேசும் திறனுக்காக FPO-வை (உழவர் உற்பத்தியாளர் அமைப்பு) உருவாக்கப் பக்கத்து விவசாயிகளுடன் ஒன்று சேருங்கள்."
    },
    sustainability: {
        keywords: ['sustainable', 'organic', 'eco', 'nature', 'இயற்கை', 'சுற்றுச்சூழல்', 'நிலையான', 'zero budget'],
        en: "Sustainable farming ensures your land stays fertile for generations:\n1. Practice crop rotation to naturally break pest cycles and replenish soil nitrogen.\n2. Make your own Jeevamrutham or vermicompost to reduce reliance on chemical fertilizers.\n3. Harvest rainwater by digging small farm ponds or contour trenches.\n4. Maintain farm biodiversity by planting border crops like marigolds to deter pests.",
        ta: "நிலையான விவசாயம் உங்கள் நிலம் தலைமுறைகளுக்கு வளமாக இருப்பதை உறுதி செய்கிறது:\n1. பூச்சி சுழற்சிகளை இயற்கையாக உடைக்கவும், மண்ணின் நைட்ரஜனை நிரப்பவும் பயிர் சுழற்சியைப் பயிற்சி செய்யுங்கள்.\n2. ரசாயன உரங்களைச் சார்ந்திருப்பதைக் குறைக்க உங்கள் சொந்த ஜீவாமிர்தம் அல்லது மண்புழு உரத்தைத் தயாரிக்கவும்.\n3. சிறிய பண்ணைக் குட்டைகள் அல்லது சம உயர வரப்புகளை அமைத்து மழைநீரைச் சேமிக்கவும்."
    },
    schemes: {
        keywords: ['scheme', 'loan', 'திட்டம்', 'கடன்', 'gov', 'அரசு', 'kissan', 'kcc', 'subsidy', 'மானியம்'],
        en: "The government offers numerous supportive programs:\n1. **PM-KISAN Samman Nidhi**: Provides Rs. 6000/year to support farmers.\n2. **Kisan Credit Card (KCC)**: Helps you get low-interest agricultural loans.\n3. **PMFBY**: Crop insurance against natural calamities and pests.\n4. Check our 'Schemes' section to find direct application links or consult your local panchayat office.",
        ta: "அரசாங்கம் பல ஆதரவுத் திட்டங்களை வழங்குகிறது:\n1. **பிஎம்-கிசான் சம்மன் நிதி**: விவசாயிகளை ஆதரிக்க வருடத்திற்கு ரூ. 6000 வழங்குகிறது.\n2. **கிசான் கிரெடிட் கார்டு (KCC)**: குறைந்த வட்டியில் விவசாயக் கடன்களைப் பெற உதவுகிறது.\n3. **PMFBY**: இயற்கை சீற்றங்கள் மற்றும் பூச்சிகளுக்கு எதிரான பயிர் காப்பீடு.\n4. நேரடி விண்ணப்ப இணைப்புகளைக் கண்டறிய எங்கள் 'திட்டங்கள்' (Schemes) பகுதியைப் பார்க்கவும்."
    },
    greeting: {
        keywords: ['hi', 'hello', 'ஹலோ', 'வணக்கம்', 'hey', 'start'],
        en: "Hello! I am your intelligent Agriculture Assistant. I'm here to provide clear, practical advice. You can ask me about crop recommendations, disease detection, organic fertilizers, irrigation, weather tips, market prices, or government schemes. How can I help you today?",
        ta: "வணக்கம்! நான் உங்கள் அறிவார்ந்த விவசாய உதவியாளர். தெளிவான, நடைமுறை ஆலோசனைகளை வழங்க நான் இங்கே இருக்கிறேன். பயிர் பரிந்துரைகள், நோய் கண்டறிதல், இயற்கை உரங்கள், நீர்ப்பாசனம், வானிலை குறிப்புகள், சந்தை விலைகள் அல்லது அரசுத் திட்டங்கள் பற்றி நீங்கள் என்னிடம் கேட்கலாம். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?"
    }
};

export const Chatbot = () => {
    const { t, language } = useLanguage();

    const initialMessage = {
        id: 1,
        sender: 'bot',
        text: language === 'en'
            ? "Hello! I am AgriBot. How can I help you with your farming needs today?"
            : "வணக்கம்! நான் உங்கள் அக்ரிபோட். இன்று உங்கள் விவசாயத் தேவைகளுக்கு நான் எவ்வாறு உதவ முடியும்?",
        isTyping: false
    };

    const [messages, setMessages] = useState([initialMessage]);
    const [input, setInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim() || isGenerating) return;

        const userMsg = { id: Date.now(), sender: 'user', text: input, isTyping: false };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsGenerating(true);

        // Simulated AI processing time
        setTimeout(() => {
            const isEnglish = language === 'en';
            let responseText = "";
            const lowerInput = input.toLowerCase();

            // AI Intent Matching Algorithm
            let maxMatches = 0;
            let bestIntent = null;

            for (const [intent, data] of Object.entries(agriculturalKnowledgeBase)) {
                let currentMatches = 0;
                for (const keyword of data.keywords) {
                    if (lowerInput.includes(keyword)) {
                        currentMatches++;
                    }
                }
                if (currentMatches > maxMatches) {
                    maxMatches = currentMatches;
                    bestIntent = intent;
                }
            }

            if (bestIntent) {
                responseText = isEnglish ? agriculturalKnowledgeBase[bestIntent].en : agriculturalKnowledgeBase[bestIntent].ta;
            } else {
                responseText = isEnglish
                    ? "As an intelligent Agriculture Assistant, I am constantly learning! Could you please specify if you need step-by-step advice on managing crops, understanding soil health, controlling pests organically, optimizing irrigation, getting weather updates, tracking market prices, or applying for farming schemes?"
                    : "ஒரு அறிவார்ந்த விவசாய உதவியாளராக, நான் தொடர்ந்து கற்றுக்கொள்கிறேன்! பயிர்களை நிர்வகித்தல், மண்ணின் ஆரோக்கியத்தைப் புரிந்துகொள்வது, பூச்சிகளை இயற்கையாகக் கட்டுப்படுத்துதல், நீர்ப்பாசனத்தை மேம்படுத்துதல், வானிலை அறிவிப்புகள், சந்தை விலைகளை அறிவது அல்லது விவசாயத் திட்டங்களுக்கு விண்ணப்பிப்பது போன்ற எதில் உங்களுக்கு உதவி தேவை என்பதைக் குறிப்பிட முடியுமா?";
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: responseText, isTyping: true }]);
        }, 800 + Math.random() * 500); // Small random delay for "thinking" effect
    };

    const handleNewChat = () => {
        setMessages([{ ...initialMessage, id: Date.now() }]);
        setInput('');
        setIsGenerating(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.headerArea}>
                <h2 style={styles.header}>{t.nav.chatbot}</h2>
                <button style={styles.newChatBtn} onClick={handleNewChat}>
                    <PlusCircle size={18} style={{ marginRight: 6 }} />
                    {language === 'en' ? "New Chat" : "புதிய உரையாடல்"}
                </button>
            </div>

            <div style={styles.chatBoxOuter}>
                <div style={styles.chatBoxInner}>
                    {messages.map((msg) => (
                        <div key={msg.id} style={{
                            ...styles.messageRow,
                            backgroundColor: msg.sender === 'bot' ? 'var(--surface)' : 'transparent',
                            borderBottom: msg.sender === 'bot' ? '1px solid var(--border)' : 'none',
                        }}>
                            <div style={styles.messageContent}>
                                <div style={{
                                    ...styles.avatar,
                                    backgroundColor: msg.sender === 'user' ? 'var(--primary)' : '#10a37f'
                                }}>
                                    {msg.sender === 'bot' && <Bot size={20} color="white" />}
                                    {msg.sender === 'user' && <User size={20} color="white" />}
                                </div>
                                <div style={styles.textWrapper}>
                                    {msg.sender === 'bot' && msg.isTyping ? (
                                        <TypingEffect text={msg.text} onComplete={() => {
                                            setIsGenerating(false);
                                            setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, isTyping: false } : m));
                                        }} />
                                    ) : (
                                        <span>{msg.text}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={endOfMessagesRef} />
                </div>
                <div style={styles.inputArea}>
                    <form onSubmit={handleSend} style={styles.inputFormInner}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={language === 'en' ? "Message AgriBot..." : "அக்ரிபோட் இடம் கேளுங்கள்..."}
                            style={styles.input}
                            disabled={isGenerating}
                        />
                        <button type="submit" style={{
                            ...styles.sendBtn,
                            opacity: (!input.trim() || isGenerating) ? 0.5 : 1,
                            cursor: (!input.trim() || isGenerating) ? 'default' : 'pointer'
                        }} disabled={!input.trim() || isGenerating}>
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxWidth: '900px',
        margin: '0 auto',
    },
    headerArea: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
    },
    header: {
        color: 'var(--primary-dark)',
        margin: 0,
    },
    newChatBtn: {
        display: 'flex',
        alignItems: 'center',
        padding: '8px 16px',
        backgroundColor: 'transparent',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        color: 'var(--text-main)',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'background 0.2s',
    },
    chatBoxOuter: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        border: '1px solid var(--border)',
    },
    chatBoxInner: {
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
    },
    messageRow: {
        width: '100%',
        padding: '24px',
        display: 'flex',
        justifyContent: 'center',
    },
    messageContent: {
        width: '100%',
        maxWidth: '700px',
        display: 'flex',
        gap: '24px',
    },
    avatar: {
        width: '36px',
        height: '36px',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
    },
    textWrapper: {
        flex: 1,
        color: 'var(--text-main)',
        lineHeight: '1.6',
        fontSize: '1rem',
        paddingTop: '6px',
    },
    inputArea: {
        display: 'flex',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: '#ffffff',
        borderTop: '1px solid transparent',
    },
    inputFormInner: {
        display: 'flex',
        width: '100%',
        maxWidth: '700px',
        position: 'relative',
        boxShadow: '0 0 15px rgba(0,0,0,0.1)',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        border: '1px solid var(--border)',
    },
    input: {
        flex: 1,
        padding: '16px 56px 16px 20px',
        borderRadius: '12px',
        border: 'none',
        outline: 'none',
        fontSize: '1rem',
        backgroundColor: 'transparent',
    },
    sendBtn: {
        position: 'absolute',
        right: '8px',
        bottom: '8px',
        backgroundColor: 'var(--primary)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        width: '36px',
        height: '36px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'background 0.2s',
    }
};

export default Chatbot;
