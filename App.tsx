import React, { useState, useEffect, createContext, useContext } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
  Divider,
  Paper,
  Grid,
  Chip,
  InputAdornment,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  MenuBook,
  Chat,
  School,
  Bookmark,
  Settings,
  Logout,
  Search,
  DarkMode,
  LightMode,
  Send,
  AutoAwesome,
} from '@mui/icons-material';

// ============================================
// SUPABASE SETUP
// ============================================
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================
// OPENROUTER SETUP
// ============================================
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

// ============================================
// BIBLE DATA
// ============================================
const BIBLE_BOOKS = [
  { id: 1, name_en: 'Genesis', name_sw: 'Mwanzo', testament: 'OT', chapters: 50 },
  { id: 2, name_en: 'Exodus', name_sw: 'Kutoka', testament: 'OT', chapters: 40 },
  { id: 3, name_en: 'Leviticus', name_sw: 'Walawi', testament: 'OT', chapters: 27 },
  { id: 4, name_en: 'Numbers', name_sw: 'Hesabu', testament: 'OT', chapters: 36 },
  { id: 5, name_en: 'Deuteronomy', name_sw: 'Kumbukumbu', testament: 'OT', chapters: 34 },
  { id: 6, name_en: 'Joshua', name_sw: 'Yoshua', testament: 'OT', chapters: 24 },
  { id: 7, name_en: 'Judges', name_sw: 'Waamuzi', testament: 'OT', chapters: 21 },
  { id: 8, name_en: 'Ruth', name_sw: 'Ruthi', testament: 'OT', chapters: 4 },
  { id: 9, name_en: '1 Samuel', name_sw: '1 Samweli', testament: 'OT', chapters: 31 },
  { id: 10, name_en: '2 Samuel', name_sw: '2 Samweli', testament: 'OT', chapters: 24 },
  { id: 11, name_en: '1 Kings', name_sw: '1 Wafalme', testament: 'OT', chapters: 22 },
  { id: 12, name_en: '2 Kings', name_sw: '2 Wafalme', testament: 'OT', chapters: 25 },
  { id: 13, name_en: '1 Chronicles', name_sw: '1 Mambo ya Nyakati', testament: 'OT', chapters: 29 },
  { id: 14, name_en: '2 Chronicles', name_sw: '2 Mambo ya Nyakati', testament: 'OT', chapters: 36 },
  { id: 15, name_en: 'Ezra', name_sw: 'Ezra', testament: 'OT', chapters: 10 },
  { id: 16, name_en: 'Nehemiah', name_sw: 'Nehemia', testament: 'OT', chapters: 13 },
  { id: 17, name_en: 'Esther', name_sw: 'Esta', testament: 'OT', chapters: 10 },
  { id: 18, name_en: 'Job', name_sw: 'Ayubu', testament: 'OT', chapters: 42 },
  { id: 19, name_en: 'Psalms', name_sw: 'Zaburi', testament: 'OT', chapters: 150 },
  { id: 20, name_en: 'Proverbs', name_sw: 'Mithali', testament: 'OT', chapters: 31 },
  { id: 21, name_en: 'Ecclesiastes', name_sw: 'Mhubiri', testament: 'OT', chapters: 12 },
  { id: 22, name_en: 'Song of Solomon', name_sw: 'Wimbo Ulio Bora', testament: 'OT', chapters: 8 },
  { id: 23, name_en: 'Isaiah', name_sw: 'Isaya', testament: 'OT', chapters: 66 },
  { id: 24, name_en: 'Jeremiah', name_sw: 'Yeremia', testament: 'OT', chapters: 52 },
  { id: 25, name_en: 'Lamentations', name_sw: 'Maombolezo', testament: 'OT', chapters: 5 },
  { id: 26, name_en: 'Ezekiel', name_sw: 'Ezekieli', testament: 'OT', chapters: 48 },
  { id: 27, name_en: 'Daniel', name_sw: 'Danieli', testament: 'OT', chapters: 12 },
  { id: 28, name_en: 'Hosea', name_sw: 'Hosea', testament: 'OT', chapters: 14 },
  { id: 29, name_en: 'Joel', name_sw: 'Yoeli', testament: 'OT', chapters: 3 },
  { id: 30, name_en: 'Amos', name_sw: 'Amosi', testament: 'OT', chapters: 9 },
  { id: 31, name_en: 'Obadiah', name_sw: 'Obadia', testament: 'OT', chapters: 1 },
  { id: 32, name_en: 'Jonah', name_sw: 'Yona', testament: 'OT', chapters: 4 },
  { id: 33, name_en: 'Micah', name_sw: 'Mika', testament: 'OT', chapters: 7 },
  { id: 34, name_en: 'Nahum', name_sw: 'Nahumu', testament: 'OT', chapters: 3 },
  { id: 35, name_en: 'Habakkuk', name_sw: 'Habakuki', testament: 'OT', chapters: 3 },
  { id: 36, name_en: 'Zephaniah', name_sw: 'Sefania', testament: 'OT', chapters: 3 },
  { id: 37, name_en: 'Haggai', name_sw: 'Hagai', testament: 'OT', chapters: 2 },
  { id: 38, name_en: 'Zechariah', name_sw: 'Zekaria', testament: 'OT', chapters: 14 },
  { id: 39, name_en: 'Malachi', name_sw: 'Malaki', testament: 'OT', chapters: 4 },
  { id: 40, name_en: 'Matthew', name_sw: 'Mathayo', testament: 'NT', chapters: 28 },
  { id: 41, name_en: 'Mark', name_sw: 'Marko', testament: 'NT', chapters: 16 },
  { id: 42, name_en: 'Luke', name_sw: 'Luka', testament: 'NT', chapters: 24 },
  { id: 43, name_en: 'John', name_sw: 'Yohana', testament: 'NT', chapters: 21 },
  { id: 44, name_en: 'Acts', name_sw: 'Matendo', testament: 'NT', chapters: 28 },
  { id: 45, name_en: 'Romans', name_sw: 'Warumi', testament: 'NT', chapters: 16 },
  { id: 46, name_en: '1 Corinthians', name_sw: '1 Wakorintho', testament: 'NT', chapters: 16 },
  { id: 47, name_en: '2 Corinthians', name_sw: '2 Wakorintho', testament: 'NT', chapters: 13 },
  { id: 48, name_en: 'Galatians', name_sw: 'Wagalatia', testament: 'NT', chapters: 6 },
  { id: 49, name_en: 'Ephesians', name_sw: 'Waefeso', testament: 'NT', chapters: 6 },
  { id: 50, name_en: 'Philippians', name_sw: 'Wafilipi', testament: 'NT', chapters: 4 },
  { id: 51, name_en: 'Colossians', name_sw: 'Wakolosai', testament: 'NT', chapters: 4 },
  { id: 52, name_en: '1 Thessalonians', name_sw: '1 Wathesalonike', testament: 'NT', chapters: 5 },
  { id: 53, name_en: '2 Thessalonians', name_sw: '2 Wathesalonike', testament: 'NT', chapters: 3 },
  { id: 54, name_en: '1 Timothy', name_sw: '1 Timotheo', testament: 'NT', chapters: 6 },
  { id: 55, name_en: '2 Timothy', name_sw: '2 Timotheo', testament: 'NT', chapters: 4 },
  { id: 56, name_en: 'Titus', name_sw: 'Tito', testament: 'NT', chapters: 3 },
  { id: 57, name_en: 'Philemon', name_sw: 'Filemoni', testament: 'NT', chapters: 1 },
  { id: 58, name_en: 'Hebrews', name_sw: 'Waebrania', testament: 'NT', chapters: 13 },
  { id: 59, name_en: 'James', name_sw: 'Yakobo', testament: 'NT', chapters: 5 },
  { id: 60, name_en: '1 Peter', name_sw: '1 Petro', testament: 'NT', chapters: 5 },
  { id: 61, name_en: '2 Peter', name_sw: '2 Petro', testament: 'NT', chapters: 3 },
  { id: 62, name_en: '1 John', name_sw: '1 Yohana', testament: 'NT', chapters: 5 },
  { id: 63, name_en: '2 John', name_sw: '2 Yohana', testament: 'NT', chapters: 1 },
  { id: 64, name_en: '3 John', name_sw: '3 Yohana', testament: 'NT', chapters: 1 },
  { id: 65, name_en: 'Jude', name_sw: 'Yuda', testament: 'NT', chapters: 1 },
  { id: 66, name_en: 'Revelation', name_sw: 'Ufunuo', testament: 'NT', chapters: 22 },
];

// ============================================
// SAMPLE VERSES
// ============================================
const SAMPLE_VERSES = [
  { verse: 1, text_en: 'In the beginning God created the heavens and the earth.', text_sw: 'Hapo mwanzo Mungu aliumba mbingu na nchi.' },
  { verse: 2, text_en: 'Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.', text_sw: 'Nchi ilikuwa ukiwa na utupu, giza lilikuwa juu ya uso wa kilindi, na Roho wa Mungu alitawala juu ya maji.' },
  { verse: 3, text_en: 'And God said, "Let there be light," and there was light.', text_sw: 'Mungu akasema, "Na kuwe na nuru," ikawa nuru.' },
  { verse: 4, text_en: 'God saw that the light was good, and he separated the light from the darkness.', text_sw: 'Mungu akaona nuru ni njema, akaitenga nuru na giza.' },
  { verse: 5, text_en: 'God called the light "day," and the darkness he called "night." And there was evening, and there was morning—the first day.', text_sw: 'Mungu akaiita nuru "mchana," na giza akaliita "usiku." Ikawa jioni, ikawa asubuhi, siku ya kwanza.' },
];

// ============================================
// THEOLOGY TOPICS
// ============================================
const THEOLOGY_TOPICS = [
  { id: 1, category: 'Bibliology', title_en: 'Bibliology - Doctrine of Scripture', title_sw: 'Bibliology - Mafundisho ya Maandiko' },
  { id: 2, category: 'Theology Proper', title_en: 'Theology Proper - Doctrine of God', title_sw: 'Theology Proper - Mafundisho ya Mungu' },
  { id: 3, category: 'Christology', title_en: 'Christology - Doctrine of Christ', title_sw: 'Christology - Mafundisho ya Kristo' },
  { id: 4, category: 'Pneumatology', title_en: 'Pneumatology - Doctrine of Holy Spirit', title_sw: 'Pneumatology - Mafundisho ya Roho Mtakatifu' },
  { id: 5, category: 'Soteriology', title_en: 'Soteriology - Doctrine of Salvation', title_sw: 'Soteriology - Mafundisho ya Wokovu' },
  { id: 6, category: 'Ecclesiology', title_en: 'Ecclesiology - Doctrine of the Church', title_sw: 'Ecclesiology - Mafundisho ya Kanisa' },
  { id: 7, category: 'Eschatology', title_en: 'Eschatology - Doctrine of Last Things', title_sw: 'Eschatology - Mafundisho ya Mwisho' },
];

// ============================================
// APP CONTEXT
// ============================================
interface AppContextType {
  user: any;
  setUser: (user: any) => void;
  language: 'en' | 'sw';
  setLanguage: (lang: 'en' | 'sw') => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  chatHistory: any[];
  setChatHistory: (history: any[]) => void;
  savedItems: any[];
  setSavedItems: (items: any[]) => void;
  loading: boolean;
  showSnackbar: (message: string, severity: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | null>(null);

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

// ============================================
// THEME
// ============================================
const getTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    primary: { main: '#0D47A1' },
    secondary: { main: '#D4AF37' },
    background: {
      default: mode === 'light' ? '#FFFFFF' : '#121212',
      paper: mode === 'light' ? '#F5F5F5' : '#1E1E1E',
    },
    text: {
      primary: mode === 'light' ? '#212121' : '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: mode === 'light' 
            ? '0 2px 8px rgba(0,0,0,0.08)' 
            : '0 2px 8px rgba(0,0,0,0.3)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

// ============================================
// MAIN APP
// ============================================
function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'sw'>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [savedItems, setSavedItems] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'info' }>({
    open: false,
    message: '',
    severity: 'info',
  });

  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authFullName, setAuthFullName] = useState('');
  const [authDialogOpen, setAuthDialogOpen] = useState(!user);

  const [selectedBook, setSelectedBook] = useState(BIBLE_BOOKS[0]);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [bibleSearchQuery, setBibleSearchQuery] = useState('');
  const [bibleSearchResults, setBibleSearchResults] = useState<any[]>([]);

  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: authEmail,
        password: authPassword,
      });
      if (error) throw error;
      setUser(data.user);
      setAuthDialogOpen(false);
      showSnackbar('Welcome back!', 'success');
    } catch (error: any) {
      showSnackbar(error.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: authEmail,
        password: authPassword,
        options: { data: { full_name: authFullName } },
      });
      if (error) throw error;
      setUser(data.user);
      setAuthDialogOpen(false);
      showSnackbar('Account created! Please verify your email.', 'success');
    } catch (error: any) {
      showSnackbar(error.message || 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setChatHistory([]);
    setSavedItems([]);
    setChatMessages([]);
    setAuthDialogOpen(true);
    showSnackbar('Logged out', 'info');
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim() || !user) return;

    const userMessage = { role: 'user', content: chatInput, timestamp: new Date().toISOString() };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setChatLoading(true);

    try {
      const systemPrompt = language === 'en'
        ? `You are ZIMRAH CHAT, a Bible and Theology expert. Answer questions about the Bible, Theology, Church History, and Christian teachings. Always include scripture references. Be scholarly but accessible.`
        : `Wewe ni ZIMRAH CHAT, mtaalamu wa Biblia na Theolojia. Jibu maswali kuhusu Biblia, Theolojia, Historia ya Kanisa, na mafundisho ya Kikristo. Daima taja marejeo ya Biblia. Kuwa wa kitaaluma lakini rahisi kueleweka.`;

      const response = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'ZIMRAH BIBLE HUB',
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3-70b-instruct',
          messages: [
            { role: 'system', content: systemPrompt },
            ...chatMessages.map((m: any) => ({ role: m.role, content: m.content })),
            { role: 'user', content: chatInput },
          ],
          temperature: 0.7,
          max_tokens: 2048,
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);

      const assistantMessage = {
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: new Date().toISOString(),
      };

      setChatMessages(prev => [...prev, assistantMessage]);

      if (currentChatId) {
        await supabase
          .from('chat_history')
          .update({
            messages: [...chatMessages, userMessage, assistantMessage],
            updated_at: new Date().toISOString(),
          })
          .eq('id', currentChatId);
      } else {
        const { data: newChat } = await supabase
          .from('chat_history')
          .insert({
            user_id: user.id,
            title: chatInput.slice(0, 50) + '...',
            messages: [userMessage, assistantMessage],
            language: language,
          })
          .select()
          .single();
        if (newChat) {
          setCurrentChatId(newChat.id);
          setChatHistory(prev => [newChat, ...prev]);
        }
      }
    } catch (error: any) {
      showSnackbar(error.message || 'Chat error', 'error');
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: language === 'en' ? 'Sorry, I encountered an error. Please try again.' : 'Samahani, nimekumbana na hitilafu. Tafadhali jaribu tena.',
        timestamp: new Date().toISOString(),
        isError: true,
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  const searchBible = () => {
    if (!bibleSearchQuery.trim()) {
      setBibleSearchResults([]);
      return;
    }
    const results = SAMPLE_VERSES.filter(v =>
      v.text_en.toLowerCase().includes(bibleSearchQuery.toLowerCase()) ||
      v.text_sw.includes(bibleSearchQuery)
    );
    setBibleSearchResults(results);
  };

  const renderHome = () => (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {language === 'en' ? 'Dashboard' : 'Dashibodi'}
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        {language === 'en' ? 'Welcome to ZIMRAH BIBLE HUB.' : 'Karibu ZIMRAH BIBLE HUB.'}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AutoAwesome color="secondary" />
                {language === 'en' ? 'Daily Verse' : 'Aya ya Siku'}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic' }}>
                {language === 'en' 
                  ? '"In the beginning God created the heavens and the earth."' 
                  : '"Hapo mwanzo Mungu aliumba mbingu na nchi."'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Genesis 1:1 / Mwanzo 1:1
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {language === 'en' ? 'Quick Actions' : 'Vitendo vya Haraka'}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Button variant="outlined" startIcon={<MenuBook />} onClick={() => setCurrentPage('bible')}>
                  {language === 'en' ? 'Read Bible' : 'Soma Biblia'}
                </Button>
                <Button variant="outlined" startIcon={<Chat />} onClick={() => setCurrentPage('chat')}>
                  ZIMRAH CHAT
                </Button>
                <Button variant="outlined" startIcon={<School />} onClick={() => setCurrentPage('theology')}>
                  {language === 'en' ? 'Theology' : 'Theolojia'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderBible = () => (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {language === 'en' ? 'Bible' : 'Biblia'}
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        {language === 'en' ? 'Read and study God\'s Word.' : 'Soma na ujifunze Neno la Mungu.'}
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder={language === 'en' ? 'Search Bible...' : 'Tafuta Biblia...'}
          value={bibleSearchQuery}
          onChange={(e) => setBibleSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && searchBible()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={searchBible}>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        <TextField
          select
          label={language === 'en' ? 'Book' : 'Kitabu'}
          value={selectedBook.id}
          onChange={(e) => {
            const book = BIBLE_BOOKS.find(b => b.id === Number(e.target.value));
            if (book) setSelectedBook(book);
          }}
          sx={{ minWidth: 200 }}
        >
          {BIBLE_BOOKS.map((book) => (
            <MenuItem key={book.id} value={book.id}>
              {language === 'en' ? book.name_en : book.name_sw}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label={language === 'en' ? 'Chapter' : 'Sura'}
          value={selectedChapter}
          onChange={(e) => setSelectedChapter(Number(e.target.value))}
          sx={{ minWidth: 120 }}
        >
          {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map((ch) => (
            <MenuItem key={ch} value={ch}>Sura {ch}</MenuItem>
          ))}
        </TextField>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {language === 'en' ? selectedBook.name_en : selectedBook.name_sw} {selectedChapter}
          </Typography>
          {SAMPLE_VERSES.map((v) => (
            <Box key={v.verse} sx={{ py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography variant="caption" color="secondary" sx={{ fontWeight: 'bold' }}>
                {v.verse}
              </Typography>
              <Typography variant="body2">
                {language === 'en' ? v.text_en : v.text_sw}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>

      {bibleSearchResults.length > 0 && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {language === 'en' ? 'Search Results' : 'Matokeo ya Utafutaji'}
            </Typography>
            {bibleSearchResults.map((v, i) => (
              <Box key={i} sx={{ py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2">
                  {language === 'en' ? v.text_en : v.text_sw}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      )}
    </Box>
  );

  const renderChat = () => (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        ZIMRAH CHAT
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        {language === 'en' ? 'Ask Bible and Theology questions.' : 'Uliza maswali ya Biblia na Theolojia.'}
      </Typography>

      <Box sx={{ height: 400, overflow: 'auto', mb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {chatMessages.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Typography color="text.secondary">
              {language === 'en' 
                ? 'Start a conversation with ZIMRAH CHAT...' 
                : 'Anza mazungumzo na ZIMRAH CHAT...'}
            </Typography>
          </Box>
        ) : (
          chatMessages.map((msg, i) => (
            <Box
              key={i}
              sx={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
              }}
            >
              <Paper
                sx={{
                  p: 2,
                  bgcolor: msg.role === 'user' 
                    ? 'primary.main' 
                    : msg.isError 
                      ? 'error.main' 
                      : 'secondary.light',
                  color: msg.role === 'user' ? 'white' : 'text.primary',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                  {msg.content}
                </Typography>
              </Paper>
            </Box>
          ))
        )}
        {chatLoading && (
          <Box sx={{ alignSelf: 'flex-start' }}>
            <Paper sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
              <CircularProgress size={20} />
            </Paper>
          </Box>
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          placeholder={language === 'en' ? 'Ask a question...' : 'Uliza swali...'}
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
          disabled={!user || chatLoading}
        />
        <Button
          variant="contained"
          onClick={sendChatMessage}
          disabled={!user || chatLoading || !chatInput.trim()}
          sx={{ minWidth: 80 }}
        >
          <Send />
        </Button>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          {language === 'en' ? 'Chat History' : 'Historia ya Mazungumzo'}
        </Typography>
        {chatHistory.length === 0 ? (
          <Typography color="text.secondary">
            {language === 'en' ? 'No chat history' : 'Hakuna historia ya mazungumzo'}
          </Typography>
        ) : (
          chatHistory.slice(0, 10).map((chat) => (
            <Paper
              key={chat.id}
              sx={{
                p: 1.5,
                mb: 1,
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover' },
              }}
              onClick={() => {
                setCurrentChatId(chat.id);
                setChatMessages(chat.messages || []);
              }}
            >
              <Typography variant="body2" noWrap>
                {chat.title || 'Chat'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(chat.updated_at).toLocaleDateString()}
              </Typography>
            </Paper>
          ))
        )}
      </Box>
    </Box>
  );

  const renderTheology = () => (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {language === 'en' ? 'Theology' : 'Theolojia'}
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        {language === 'en' ? 'Learn Biblical Theology.' : 'Jifunze Theolojia ya Biblia.'}
      </Typography>

      <Grid container spacing={3}>
        {THEOLOGY_TOPICS.map((topic) => (
          <Grid item xs={12} md={6} key={topic.id}>
            <Card>
              <CardContent>
                <Chip label={topic.category} color="secondary" size="small" sx={{ mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  {language === 'en' ? topic.title_en : topic.title_sw}
                </Typography>
                <Button
                  size="small"
                  sx={{ mt: 2 }}
                  onClick={() => {
                    setCurrentPage('chat');
                    setChatInput(language === 'en' 
                      ? `Tell me about ${topic.title_en}` 
                      : `Niambie kuhusu ${topic.title_sw}`
                    );
                  }}
                >
                  {language === 'en' ? 'Learn More' : 'Jifunze Zaidi'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderSaved = () => (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {language === 'en' ? 'Saved Items' : 'Vitu Vilivyohifadhiwa'}
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        {language === 'en' ? 'Your saved verses, notes and chats.' : 'Mistari, maelezo na mazungumzo uliyohifadhi.'}
      </Typography>
      {savedItems.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">
            {language === 'en' ? 'No saved items yet' : 'Hakuna vitu vilivyohifadhiwa bado'}
          </Typography>
        </Paper>
      ) : (
        savedItems.map((item) => (
          <Card key={item.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="body2">{JSON.stringify(item.content)}</Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(item.created_at).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );

  const renderSettings = () => (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {language === 'en' ? 'Settings' : 'Mipangilio'}
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        {language === 'en' ? 'Manage your preferences.' : 'Simamia mapendeleo yako.'}
      </Typography>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle1">
                  {language === 'en' ? 'Language' : 'Lugha'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {language === 'en' ? 'Switch between English and Kiswahili' : 'Badilisha kati ya Kiingereza na Kiswahili'}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
              >
                {language === 'en' ? 'Kiswahili' : 'English'}
              </Button>
            </Box>

            <Divider />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle1">
                  {language === 'en' ? 'Theme' : 'Mada'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {language === 'en' ? 'Switch between light and dark mode' : 'Badilisha kati ya mwanga na giza'}
                </Typography>
              </Box>
              <IconButton onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                {theme === 'light' ? <DarkMode /> : <LightMode />}
              </IconButton>
            </Box>

            <Divider />

            {user && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle1">
                    {language === 'en' ? 'Account' : 'Akaunti'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
                <Button variant="contained" color="error" onClick={handleLogout} startIcon={<Logout />}>
                  {language === 'en' ? 'Logout' : 'Toka'}
                </Button>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return renderHome();
      case 'bible': return renderBible();
      case 'chat': return renderChat();
      case 'theology': return renderTheology();
      case 'saved': return renderSaved();
      case 'settings': return renderSettings();
      default: return renderHome();
    }
  };

  const themeObject = getTheme(theme);

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      language,
      setLanguage,
      theme,
      setTheme,
      chatHistory,
      setChatHistory,
      savedItems,
      setSavedItems,
      loading,
      showSnackbar,
    }}>
      <ThemeProvider theme={themeObject}>
        <CssBaseline />

        <Dialog open={authDialogOpen} maxWidth="xs" fullWidth>
          <DialogTitle>
            {authMode === 'login' ? (language === 'en' ? 'Login' : 'Ingia') :
             authMode === 'register' ? (language === 'en' ? 'Register' : 'Jisajili') :
             (language === 'en' ? 'Forgot Password' : 'Nimesahau Nenosiri')}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
              />
              {authMode !== 'forgot' && (
                <TextField
                  label={language === 'en' ? 'Password' : 'Nenosiri'}
                  type="password"
                  fullWidth
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                />
              )}
              {authMode === 'register' && (
                <TextField
                  label={language === 'en' ? 'Full Name' : 'Jina Kamili'}
                  fullWidth
                  value={authFullName}
                  onChange={(e) => setAuthFullName(e.target.value)}
                />
              )}
              <Button
                variant="contained"
                fullWidth
                onClick={authMode === 'login' ? handleLogin : authMode === 'register' ? handleRegister : () => {}}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> :
                  authMode === 'login' ? (language === 'en' ? 'Login' : 'Ingia') :
                  authMode === 'register' ? (language === 'en' ? 'Register' : 'Jisajili') :
                  (language === 'en' ? 'Send Reset' : 'Tuma Kuweka Upya')}
              </Button>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button size="small" onClick={() => setAuthMode('login')}>
                  {language === 'en' ? 'Login' : 'Ingia'}
                </Button>
                <Button size="small" onClick={() => setAuthMode('register')}>
                  {language === 'en' ? 'Register' : 'Jisajili'}
                </Button>
                <Button size="small" onClick={() => setAuthMode('forgot')}>
                  {language === 'en' ? 'Forgot Password?' : 'Nimesahau Nenosiri?'}
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>

        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar position="sticky">
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
                ZIMRAH BIBLE HUB
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton color="inherit" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                  {theme === 'light' ? <DarkMode /> : <LightMode />}
                </IconButton>
                {user && (
                  <IconButton color="inherit" onClick={handleLogout}>
                    <Logout />
                  </IconButton>
                )}
              </Box>
            </Toolbar>
          </AppBar>

          <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <Box sx={{ width: 280, p: 2 }}>
              <Typography variant="h6" sx={{ mb: 3, color: 'primary.main' }}>
                ZIMRAH BIBLE HUB
              </Typography>
              <List>
                <ListItem button onClick={() => { setCurrentPage('home'); setDrawerOpen(false); }}>
                  <ListItemIcon><Home /></ListItemIcon>
                  <ListItemText primary={language === 'en' ? 'Home' : 'Nyumbani'} />
                </ListItem>
                <ListItem button onClick={() => { setCurrentPage('bible'); setDrawerOpen(false); }}>
                  <ListItemIcon><MenuBook /></ListItemIcon>
                  <ListItemText primary={language === 'en' ? 'Bible' : 'Biblia'} />
                </ListItem>
                <ListItem button onClick={() => { setCurrentPage('chat'); setDrawerOpen(false); }}>
                  <ListItemIcon><Chat /></ListItemIcon>
                  <ListItemText primary="ZIMRAH CHAT" />
                </ListItem>
                <ListItem button onClick={() => { setCurrentPage('theology'); setDrawerOpen(false); }}>
                  <ListItemIcon><School /></ListItemIcon>
                  <ListItemText primary={language === 'en' ? 'Theology' : 'Theolojia'} />
                </ListItem>
                <ListItem button onClick={() => { setCurrentPage('saved'); setDrawerOpen(false); }}>
                  <ListItemIcon><Bookmark /></ListItemIcon>
                  <ListItemText primary={language === 'en' ? 'Saved' : 'Vilivyohifadhiwa'} />
                </ListItem>
                <ListItem button onClick={() => { setCurrentPage('settings'); setDrawerOpen(false); }}>
                  <ListItemIcon><Settings /></ListItemIcon>
                  <ListItemText primary={language === 'en' ? 'Settings' : 'Mipangilio'} />
                </ListItem>
              </List>
            </Box>
          </Drawer>

          <Container maxWidth="lg" sx={{ flex: 1 }}>
            {renderPage()}
          </Container>

          <Box
            component="footer"
            sx={{
              py: 4,
              mt: 4,
              textAlign: 'center',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Powered by <strong>ZIMRAH NETWORK LIMITED</strong>
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Tanzania, Morogoro | Imeundwa na Rev Frank R. Kawonga
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              zimrahnetwork@gmail.com | +255 752 685 000
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              © {new Date().getFullYear()} ZIMRAH NETWORK LIMITED. Haki zote zimehifadhiwa.
            </Typography>
          </Box>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
