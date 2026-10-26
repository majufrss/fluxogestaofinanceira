"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Wallet, ArrowRight, Eye, EyeOff, ShieldCheck, ChartNoAxesCombined } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setMessage("Preencha o e-mail e a senha para continuar.");
      return;
    }
    router.push("/");
  }

  return (
    <main className="login-page">
      <section className="login-visual">
        <div className="login-visual-overlay" />
        <a className="login-brand" href="/"><span className="brand-mark"><Wallet size={20} strokeWidth={2.4} /></span><span>fluxo<span className="brand-dot">.</span></span></a>
        <div className="login-visual-copy">
          <span className="login-kicker"><ChartNoAxesCombined size={15} /> GESTÃO FINANCEIRA INTELIGENTE</span>
          <h1>Clareza para decidir.<br />Controle para crescer.</h1>
          <p>Tenha uma visão mais organizada das entradas, saídas e dos próximos passos do seu negócio.</p>
          <div className="login-visual-note"><span><ShieldCheck size={17} /></span><div><b>Suas finanças, em perspectiva</b><small>Uma experiência simples para acompanhar o que importa.</small></div></div>
        </div>
        <span className="login-image-credit">FLUXO · GESTÃO FINANCEIRA</span>
      </section>

      <section className="login-form-side">
        <div className="login-form-wrap">
          <a className="login-mobile-brand" href="/"><span className="brand-mark"><Wallet size={20} strokeWidth={2.4} /></span><span>fluxo<span className="brand-dot">.</span></span></a>
          <span className="login-form-eyebrow">BEM-VINDA DE VOLTA</span>
          <h2>Acesse sua conta</h2>
          <p className="login-subtitle">Entre para continuar acompanhando sua gestão financeira.</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="login-email">E-mail</label>
            <input id="login-email" type="email" autoComplete="email" placeholder="voce@empresa.com.br" value={email} onChange={event => setEmail(event.target.value)} required />
            <div className="login-password-label"><label htmlFor="login-password">Senha</label><button type="button" className="forgot-password" onClick={() => setMessage("A recuperação de senha será ativada quando o sistema tiver autenticação real.")}>Esqueceu a senha?</button></div>
            <div className="login-password-input"><input id="login-password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Digite sua senha" value={password} onChange={event => setPassword(event.target.value)} required /><button type="button" aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div>
            {message && <p className="login-message" role="status">{message}</p>}
            <button className="login-submit" type="submit">Entrar no Fluxo <ArrowRight size={17}/></button>
          </form>
          <div className="login-demo-notice"><span className="login-demo-dot" /><p><b>Modo demonstração</b><br />Use qualquer e-mail e senha para acessar o painel de exemplo. Nenhuma conta é criada.</p></div>
          <p className="login-legal">Ao continuar, você acessará uma demonstração visual do Fluxo.</p>
          <a className="login-back-link" href="/">← Voltar ao painel</a>
        </div>
      </section>
    </main>
  );
}
