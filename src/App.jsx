import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';

// --- 1. คลังชุดสีระดับ High-End ---
const colorSchemes = [
  { bg: "bg-white", border: "border-slate-100", text: "text-blue-600", accent: "bg-blue-600", light: "bg-blue-50", shadow: "hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)]", icon: "💎" },
  { bg: "bg-white", border: "border-slate-100", text: "text-indigo-600", accent: "bg-indigo-600", light: "bg-indigo-50", shadow: "hover:shadow-[0_20px_50px_rgba(79,_70,_229,_0.1)]", icon: "🚀" },
  { bg: "bg-white", border: "border-slate-100", text: "text-rose-600", accent: "bg-rose-600", light: "bg-rose-50", shadow: "hover:shadow-[0_20px_50px_rgba(225,_29,_72,_0.1)]", icon: "🔥" },
  { bg: "bg-white", border: "border-slate-100", text: "text-amber-600", accent: "bg-amber-600", light: "bg-amber-50", shadow: "hover:shadow-[0_20px_50px_rgba(217,_119,_6,_0.1)]", icon: "⚡" },
];

const getCardStyle = (id) => colorSchemes[id % colorSchemes.length];

// --- 2. Main App Component ---
function App() {
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setData(res.data.slice(0, 9)); 
    } catch (err) { console.error("Error fetching data"); }
  };

  return (
    <BrowserRouter>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-[120px] animate-pulse"></div>
        <div className="absolute top-[40%] -right-[5%] w-[30%] h-[30%] rounded-full bg-purple-100/40 blur-[100px]"></div>
      </div>

      <div className="min-h-screen font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
        <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        
        <Routes>
          <Route path="/" element={<Home data={data} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route 
            path="/admin" 
            element={isLoggedIn ? <Admin data={data} setData={setData} /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// --- [COMPONENT] Navigation (Ultra Glass) ---
function Navigation({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  return (
    <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur-xl border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl rotate-3 group-hover:rotate-12 transition-all duration-500 shadow-xl"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white font-black italic">S</div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-[900] tracking-tighter leading-none">S.TECH <span className="text-blue-600">NEWS</span></span>
            <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">✨ Intelligence Hub</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-10">
          <Link to="/" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">🏠 Home</Link>
          <div className="w-[1px] h-4 bg-slate-200"></div>
          {isLoggedIn ? (
            <div className="flex items-center gap-6">
              <Link to="/admin" className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-lg">⚙️ Admin Panel</Link>
              <button onClick={() => { setIsLoggedIn(false); localStorage.clear(); navigate("/"); }} className="text-xs font-black text-rose-500 hover:text-rose-600 uppercase tracking-widest">👋 Logout</button>
            </div>
          ) : (
            <Link to="/login" className="relative group overflow-hidden bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-[10px] font-black tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-slate-200">
              <span className="relative z-10">🔑 STAFF LOGIN</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

// --- [PAGE 1] Home ---
function Home({ data }) {
  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black tracking-widest uppercase">
            <span className="animate-pulse">🔴</span> Live Updates
          </div>
          <h2 className="text-7xl font-[900] tracking-tighter italic leading-[0.9] uppercase">
            Inside<br/><span className="text-slate-300">The Campus 🎓</span>
          </h2>
        </div>
        <p className="max-w-xs text-slate-400 font-medium text-sm leading-relaxed">สำรวจข่าวสาร กิจกรรม และประกาศสำคัญจากวิทยาลัยเทคโนโลยีภาคใต้ S.TECH  📡</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
        {data.map((item, idx) => {
          const style = getCardStyle(item.id);
          const isLarge = idx === 0 || idx === 7;
          return (
            <article 
              key={item.id} 
              className={`group relative overflow-hidden p-8 rounded-[3rem] border bg-white transition-all duration-700 ${style.border} ${style.shadow} ${isLarge ? 'md:col-span-6 lg:col-span-8' : 'md:col-span-3 lg:col-span-4'}`}
            >
              <div className={`w-14 h-14 ${style.light} rounded-2xl mb-8 flex items-center justify-center text-2xl transition-transform group-hover:rotate-12 group-hover:scale-110 duration-500`}>
                 {style.icon}
              </div>
              <h3 className={`font-black uppercase italic mb-6 leading-tight transition-all group-hover:translate-x-1 ${isLarge ? 'text-4xl' : 'text-xl'} ${style.text}`}>
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 group-hover:text-slate-600 transition-colors">
                {item.body}
              </p>
              <div className="mt-12 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                <span className="text-[10px] font-black text-slate-300 tracking-widest uppercase">📌 Article #{item.id}</span>
                <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white text-xl shadow-lg transition-transform hover:scale-110 active:scale-90 ${style.accent}`}>🎯</div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}

// --- [PAGE 2] Login ---
function Login({ setIsLoggedIn }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-lg bg-white p-12 rounded-[4rem] shadow-2xl shadow-slate-200 border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[5rem] -mr-10 -mt-10 transition-transform hover:scale-110"></div>
        
        <header className="relative mb-12 text-center md:text-left">
          <div className="text-5xl mb-4">🔐</div>
          <h2 className="text-4xl font-[900] italic uppercase tracking-tighter">Access<br/><span className="text-blue-600">Portal</span></h2>
          <p className="text-slate-400 text-[10px] font-black mt-2 uppercase tracking-widest">🛑 Authorized Personnel Only</p>
        </header>

        <form className="space-y-6" onSubmit={(e) => {
          e.preventDefault();
          if (user === "admin" && pass === "1234") {
            setIsLoggedIn(true); localStorage.setItem("isLoggedIn", "true"); navigate("/admin");
          } else { alert("❌ Access Denied: Incorrect credentials"); }
        }}>
          <div className="space-y-2">
            <input className="w-full bg-slate-50 p-6 rounded-3xl outline-none focus:ring-2 focus:ring-blue-600/10 focus:bg-white transition-all text-sm font-bold border border-transparent focus:border-blue-100" placeholder="👤 Username" onChange={e => setUser(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <input className="w-full bg-slate-50 p-6 rounded-3xl outline-none focus:ring-2 focus:ring-blue-600/10 focus:bg-white transition-all text-sm font-bold border border-transparent focus:border-blue-100" type="password" placeholder="🔒 Password" onChange={e => setPass(e.target.value)} required />
          </div>
          <button className="w-full bg-slate-900 text-white py-6 rounded-3xl font-[900] tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl shadow-blue-100 active:scale-95">GO TO DASHBOARD 🚀</button>
        </form>
      </div>
    </div>
  );
}

// --- [PAGE 3] Admin ---
function Admin({ data, setData }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleEdit = (item) => {
    setIsEditing(true); setEditId(item.id); setTitle(item.title); setBody(item.body);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-4">
        <div className={`sticky top-32 p-10 rounded-[3.5rem] shadow-2xl transition-all duration-500 border ${isEditing ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
          <div className="flex items-center gap-3 mb-8">
             <div className="text-3xl">{isEditing ? '✍️' : '📢'}</div>
             <h2 className={`text-xl font-black uppercase italic tracking-tighter ${isEditing ? 'text-white' : 'text-slate-900'}`}>{isEditing ? 'Editor Mode' : 'New Broadcast'}</h2>
          </div>
          
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            if (isEditing) setData(data.map(i => i.id === editId ? { ...i, title, body } : i));
            else setData([{ title, body, id: Date.now() }, ...data]);
            setIsEditing(false); setEditId(null); setTitle(""); setBody("");
          }}>
            <input className={`w-full p-5 rounded-2xl outline-none transition-all font-bold text-sm ${isEditing ? 'bg-white/5 border border-white/10 text-white focus:bg-white focus:text-slate-900' : 'bg-slate-50 border-slate-50 text-slate-900 focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50'}`} placeholder="📝 Announcement Title" value={title} onChange={e => setTitle(e.target.value)} required />
            <textarea className={`w-full p-5 rounded-2xl outline-none resize-none transition-all font-bold text-sm ${isEditing ? 'bg-white/5 border border-white/10 text-white focus:bg-white focus:text-slate-900' : 'bg-slate-50 border-slate-50 text-slate-900 focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50'}`} rows="6" placeholder="✍️ Write content here..." value={body} onChange={e => setBody(e.target.value)} required />
            <button className={`w-full py-5 rounded-2xl font-black tracking-widest text-xs transition-all ${isEditing ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-amber-200' : 'bg-blue-600 text-white hover:bg-slate-900 shadow-blue-100 shadow-lg'}`}>
              {isEditing ? 'UPDATE NOW ✅' : 'PUBLISH NEWS 📡'}
            </button>
            {isEditing && <button onClick={() => { setIsEditing(false); setTitle(""); setBody(""); }} type="button" className="w-full text-[10px] font-black text-white/40 uppercase tracking-widest hover:text-white transition-colors">❌ Discard</button>}
          </form>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-6">
        <div className="flex items-center gap-4 mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">🗄️ Database Records</span>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
        </div>

        {data.map(item => (
          <div key={item.id} className="group p-8 bg-white/50 backdrop-blur-sm border border-slate-100 rounded-[2.5rem] flex items-center justify-between hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-500">
            <div className="min-w-0 pr-8">
              <span className="text-[10px] font-bold text-blue-600 mb-1 block uppercase tracking-tighter">🆔 ID: {item.id}</span>
              <h4 className="text-xl font-black text-slate-800 uppercase italic truncate">{item.title}</h4>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => handleEdit(item)} className="w-14 h-14 flex items-center justify-center bg-blue-50 text-xl rounded-2xl hover:bg-blue-600 hover:scale-110 transition-all">✏️</button>
              <button onClick={() => { if(window.confirm('Delete this entry?')) setData(data.filter(d => d.id !== item.id)) }} className="w-14 h-14 flex items-center justify-center bg-rose-50 text-xl rounded-2xl hover:bg-rose-600 hover:scale-110 transition-all">🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;