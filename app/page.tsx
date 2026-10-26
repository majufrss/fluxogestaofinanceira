"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownLeft, ArrowUpRight, Bell, CalendarDays, ChevronDown, CircleHelp,
  CreditCard, Download, LayoutDashboard, LogOut, Menu, Plus, Search,
  Settings2, SlidersHorizontal, Wallet, X, ChartNoAxesCombined, ReceiptText,
  CircleDollarSign, Check, Clock3, MoreHorizontal
} from "lucide-react";

type Entry = { id: number; title: string; category: string; date: string; amount: number; type: "income" | "expense"; status: "Concluído" | "Pendente" };

const initialEntries: Entry[] = [
  { id: 1, title: "Projeto identidade visual", category: "Serviços", date: "2026-10-24", amount: 2450, type: "income", status: "Concluído" },
  { id: 2, title: "Assinatura de software", category: "Ferramentas", date: "2026-10-23", amount: 129.9, type: "expense", status: "Concluído" },
  { id: 3, title: "Consultoria mensal", category: "Serviços", date: "2026-10-22", amount: 1800, type: "income", status: "Pendente" },
  { id: 4, title: "Internet e telefone", category: "Contas fixas", date: "2026-10-21", amount: 159.9, type: "expense", status: "Concluído" },
  { id: 5, title: "Material de escritório", category: "Operacional", date: "2026-10-20", amount: 248.5, type: "expense", status: "Concluído" },
  { id: 6, title: "Manutenção de site", category: "Serviços", date: "2026-10-18", amount: 680, type: "income", status: "Concluído" },
];

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const dateBR = (s: string) => new Date(s + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }).replace(".", "");

export default function Home() {
  const [entries, setEntries] = useState(initialEntries);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Todas");
  const [modal, setModal] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");
  const [category, setCategory] = useState("Serviços");

  const income = useMemo(() => entries.filter(e => e.type === "income" && e.status === "Concluído").reduce((s, e) => s + e.amount, 0), [entries]);
  const expense = useMemo(() => entries.filter(e => e.type === "expense" && e.status === "Concluído").reduce((s, e) => s + e.amount, 0), [entries]);
  const filtered = entries.filter(e => (filter === "Todas" || (filter === "Receitas" ? e.type === "income" : e.type === "expense")) && e.title.toLowerCase().includes(query.toLowerCase()));
  const maxBar = Math.max(...[32, 48, 38, 65, 52, 74, 58, 86, 63, 78, 68, 94]);

  function addEntry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = Number(amount.replace(",", "."));
    if (!title.trim() || !parsed || parsed <= 0) return;
    setEntries([{ id: Date.now(), title: title.trim(), category, date: new Date().toISOString().slice(0, 10), amount: parsed, type, status: "Concluído" }, ...entries]);
    setTitle(""); setAmount(""); setModal(false);
  }

  return (
    <main className="app-shell">
      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="brand"><span className="brand-mark"><Wallet size={20} strokeWidth={2.4}/></span><span>fluxo<span className="brand-dot">.</span></span><button className="close-nav" onClick={() => setMobileNav(false)} aria-label="Fechar menu"><X size={18}/></button></div>
        <div className="workspace-label">ESPAÇO DE TRABALHO</div>
        <button className="workspace"><span className="workspace-avatar">S</span><span className="workspace-text"><b>Sairaf Studio</b><small>Plano demonstração</small></span><ChevronDown size={16}/></button>
        <nav className="nav">
          <p className="nav-caption">MENU PRINCIPAL</p>
          <a className="nav-link active" href="#inicio"><LayoutDashboard size={18}/>Visão geral</a>
          <a className="nav-link" href="#transacoes"><ArrowDownLeft size={18}/>Transações</a>
          <a className="nav-link" href="#relatorios"><ChartNoAxesCombined size={18}/>Relatórios</a>
          <a className="nav-link" href="#contas"><ReceiptText size={18}/>Contas a pagar</a>
          <p className="nav-caption nav-caption-spaced">PREFERÊNCIAS</p>
          <a className="nav-link" href="#categorias"><SlidersHorizontal size={18}/>Categorias</a>
          <a className="nav-link" href="#configuracoes"><Settings2 size={18}/>Configurações</a>
        </nav>
        <div className="sidebar-bottom"><div className="help-card"><span className="help-icon"><CircleHelp size={18}/></span><b>Precisa de ajuda?</b><p>Estamos aqui para facilitar sua rotina financeira.</p><a href="mailto:suporte@fluxo.demo">Fale com o suporte <span>↗</span></a></div><button className="profile"><span className="profile-avatar">MJ</span><span className="profile-text"><b>Maria Júlia</b><small>Administradora</small></span><MoreHorizontal size={18}/></button></div>
      </aside>
      {mobileNav && <button className="scrim" onClick={() => setMobileNav(false)} aria-label="Fechar menu"/>}
      <section className="main-area" id="inicio">
        <header className="topbar"><button className="mobile-menu" onClick={() => setMobileNav(true)} aria-label="Abrir menu"><Menu size={21}/></button><div className="breadcrumbs">Workspace <span>/</span> <b>Visão geral</b></div><div className="top-actions"><span className="today"><CalendarDays size={15}/> Outubro, 2026</span><button className="icon-button" aria-label="Buscar" onClick={() => document.getElementById("search-transactions")?.focus()}><Search size={18}/></button><button className="icon-button notification" aria-label="Notificações"><Bell size={18}/><i/></button><span className="top-avatar">MJ</span></div></header>
        <div className="content">
          <div className="page-heading"><div><div className="eyebrow"><span className="live-dot"/> SEU RESUMO FINANCEIRO</div><h1>Bom dia, Maria Júlia <span className="wave">✳</span></h1><p>Acompanhe o movimento do seu dinheiro e planeje os próximos passos.</p></div><button className="primary-button" onClick={() => setModal(true)}><Plus size={18}/> Nova transação</button></div>
          <div className="summary-grid">
            <article className="summary-card balance-card"><div className="card-top"><span>Saldo disponível</span><span className="card-icon balance-icon"><Wallet size={18}/></span></div><div className="amount-row"><strong>{brl(12840.60 + income - expense)}</strong><span className="trend"><ArrowUpRight size={14}/> 12,8%</span></div><p>Em relação ao mês anterior</p><div className="balance-line"><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/></div></article>
            <article className="summary-card"><div className="card-top"><span>Receitas do mês</span><span className="card-icon income-icon"><ArrowDownLeft size={18}/></span></div><div className="amount-row"><strong>{brl(income)}</strong></div><p><span className="positive">+ 8,2%</span> em relação ao mês anterior</p><div className="mini-bars">{[35,55,42,66,48,75,60,83,52,69,88,72].map((v,i)=><i key={i} style={{height:v+"%"}}/>)}</div></article>
            <article className="summary-card"><div className="card-top"><span>Despesas do mês</span><span className="card-icon expense-icon"><ArrowUpRight size={18}/></span></div><div className="amount-row"><strong>{brl(expense)}</strong></div><p><span className="negative">− 3,4%</span> em relação ao mês anterior</p><div className="mini-bars expense-bars">{[62,44,72,48,64,38,54,70,46,59,40,31].map((v,i)=><i key={i} style={{height:v+"%"}}/>)}</div></article>
            <article className="summary-card"><div className="card-top"><span>Resultado do mês</span><span className="card-icon result-icon"><CircleDollarSign size={18}/></span></div><div className="amount-row"><strong>{brl(income-expense)}</strong></div><p><span className="positive">Positivo</span> até o momento</p><div className="result-progress"><span style={{width:Math.max(4,Math.min(100,(income/(income+expense||1))*100))+"%"}}/></div><small className="progress-label">Receitas sobre despesas</small></article>
          </div>
          <div className="middle-grid">
            <article className="panel chart-panel" id="relatorios"><div className="panel-heading"><div><h2>Fluxo de caixa</h2><p>Entradas e saídas ao longo do tempo</p></div><button className="select-button">Últimos 12 meses <ChevronDown size={15}/></button></div><div className="chart-legend"><span><i className="legend-income"/> Receitas</span><span><i className="legend-expense"/> Despesas</span></div><div className="chart"><div className="y-labels"><span>R$ 8k</span><span>R$ 6k</span><span>R$ 4k</span><span>R$ 2k</span><span>R$ 0</span></div><div className="chart-plot"><div className="grid-lines"><i/><i/><i/><i/><i/></div><div className="bar-groups">{["Nov","Dez","Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out"].map((m,i)=><div className="bar-group" key={m}><div className="bars"><i className="bar-income" style={{height:([32,48,38,65,52,74,58,86,63,78,68,94][i]/maxBar*100)+"%"}}/><i className="bar-expense" style={{height:([22,30,28,39,35,42,33,49,44,50,42,57][i]/maxBar*100)+"%"}}/></div><span>{m}</span></div>)}</div></div></div></article>
            <article className="panel goals-panel"><div className="panel-heading"><div><h2>Visão do orçamento</h2><p>Distribuição das despesas</p></div><button className="dots-button" aria-label="Mais opções"><MoreHorizontal size={19}/></button></div><div className="donut-wrap"><div className="donut"><div className="donut-center"><small>Total de despesas</small><b>{brl(expense)}</b></div></div></div><div className="category-list"><div><span className="category-name"><i className="cat-dot cat-one"/>Operacional</span><b>{brl(expense*.42)}</b><span className="cat-percent">42%</span></div><div><span className="category-name"><i className="cat-dot cat-two"/>Ferramentas</span><b>{brl(expense*.31)}</b><span className="cat-percent">31%</span></div><div><span className="category-name"><i className="cat-dot cat-three"/>Contas fixas</span><b>{brl(expense*.18)}</b><span className="cat-percent">18%</span></div><div><span className="category-name"><i className="cat-dot cat-four"/>Outros</span><b>{brl(expense*.09)}</b><span className="cat-percent">9%</span></div></div></article>
          </div>
          <article className="panel transactions-panel" id="transacoes"><div className="panel-heading transactions-heading"><div><h2>Transações recentes</h2><p>Confira as últimas movimentações da sua conta.</p></div><button className="outline-button" onClick={() => {setFilter("Todas");document.getElementById("search-transactions")?.focus()}}>Ver todas <span>↗</span></button></div><div className="table-toolbar"><div className="search-field"><Search size={16}/><input id="search-transactions" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar transação..."/></div><div className="filter-group">{["Todas","Receitas","Despesas"].map(f=><button key={f} onClick={()=>setFilter(f)} className={filter===f?"filter-active":""}>{f}</button>)}<button className="filter-icon" aria-label="Filtros"><SlidersHorizontal size={15}/></button></div></div><div className="table-scroll"><table><thead><tr><th>DESCRIÇÃO</th><th>CATEGORIA</th><th>DATA</th><th>STATUS</th><th className="right">VALOR</th></tr></thead><tbody>{filtered.map(entry=><tr key={entry.id}><td><div className="transaction-name"><span className={`transaction-icon ${entry.type}`}>{entry.type==="income"?<ArrowDownLeft size={17}/>:<ArrowUpRight size={17}/>}</span><b>{entry.title}</b></div></td><td><span className="category-pill">{entry.category}</span></td><td className="date-cell">{dateBR(entry.date)}</td><td><span className={`status-pill ${entry.status==="Concluído"?"done":"pending"}`}><i/>{entry.status}</span></td><td className={`right amount-cell ${entry.type}`}>{entry.type==="income"?"+":"−"} {brl(entry.amount)}</td></tr>)}{filtered.length===0&&<tr><td colSpan={5} className="empty-state">Nenhuma transação encontrada.</td></tr>}</tbody></table></div><div className="table-footer"><span>Exibindo <b>{filtered.length}</b> movimentações</span><button onClick={()=>setEntries(initialEntries)} className="reset-button">Restaurar demonstração</button></div></article>
          <footer className="footer"><span>© 2026 Fluxo Financeiro</span><span>Feito para simplificar sua rotina <span className="footer-heart">♥</span></span><span className="demo-label"><i/> Ambiente de demonstração</span></footer>
        </div>
      </section>
      {modal&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setModal(false)}}><form className="modal" onSubmit={addEntry}><div className="modal-head"><div><span className="eyebrow">MOVIMENTAÇÃO FINANCEIRA</span><h2>Nova transação</h2></div><button type="button" className="icon-button" onClick={()=>setModal(false)} aria-label="Fechar"><X size={18}/></button></div><label className="form-label">Tipo de movimentação</label><div className="type-toggle"><button type="button" className={type==="income"?"type-selected":""} onClick={()=>setType("income")}><ArrowDownLeft size={16}/> Receita</button><button type="button" className={type==="expense"?"type-selected expense-selected":""} onClick={()=>setType("expense")}><ArrowUpRight size={16}/> Despesa</button></div><label className="form-label" htmlFor="entry-title">Descrição</label><input className="form-input" id="entry-title" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Ex.: Projeto de design" required/><label className="form-label" htmlFor="entry-amount">Valor (R$)</label><input className="form-input" id="entry-amount" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0,00" inputMode="decimal" required/><label className="form-label" htmlFor="entry-category">Categoria</label><select className="form-input" id="entry-category" value={category} onChange={e=>setCategory(e.target.value)}><option>Serviços</option><option>Ferramentas</option><option>Contas fixas</option><option>Operacional</option><option>Outros</option></select><div className="modal-actions"><button type="button" className="cancel-button" onClick={()=>setModal(false)}>Cancelar</button><button className="primary-button" type="submit"><Check size={17}/> Salvar transação</button></div><p className="modal-note">Demonstração: os dados ficam nesta sessão e não são enviados a um servidor.</p></form></div>}
    </main>
  );
}