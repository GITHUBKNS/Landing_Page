from pathlib import Path
import html
import re
from datetime import datetime

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "content"
OUT = ROOT / "preview"

CSS = """
:root{color-scheme:dark}*{box-sizing:border-box}body{margin:0;font-family:Inter,system-ui,sans-serif;background:#0a0a0f;color:#e6eaf2}
a{color:#6ee7ff;text-decoration:none}a:hover{text-decoration:underline}.container{max-width:1000px;margin:0 auto;padding:24px}
header,footer{border-color:rgba(255,255,255,.1);border-style:solid}header{border-width:0 0 1px}footer{border-width:1px 0 0;margin-top:40px}
nav a{margin-left:14px;color:#9aa4b5}.muted{color:#9aa4b5}.card{background:#11131a;border:1px solid rgba(255,255,255,.1);padding:16px;border-radius:12px;margin:10px 0}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px}.btn{display:inline-block;padding:10px 14px;border-radius:8px;border:1px solid rgba(255,255,255,.2)}.btn.primary{background:#6ee7ff;color:#0a0a0f;border-color:transparent;font-weight:600}
.tag{display:inline-block;font-size:12px;color:#9aa4b5;border:1px solid rgba(255,255,255,.2);padding:2px 8px;border-radius:999px;margin-right:6px}
pre{background:#11131a;padding:10px;border-radius:8px;overflow:auto}
"""

NAV = [
    ("/", "Home"), ("/about.html", "About"), ("/projects.html", "Projects"),
    ("/blog.html", "Blog"), ("/resume.html", "Resume"), ("/contact.html", "Contact")
]

def parse_frontmatter(text: str):
    if not text.startswith('---\n'):
        return {}, text
    _, rest = text.split('---\n', 1)
    fm_raw, body = rest.split('\n---\n', 1)
    data = {}
    for line in fm_raw.splitlines():
        if ':' not in line:
            continue
        k, v = line.split(':', 1)
        k = k.strip(); v = v.strip()
        if v.startswith('[') and v.endswith(']'):
            vals = [x.strip().strip("'\"") for x in v[1:-1].split(',') if x.strip()]
            data[k] = vals
        else:
            data[k] = v.strip("'\"")
    return data, body.strip() + "\n"

def md_to_html(md: str):
    out=[]
    for line in md.splitlines():
        line=line.rstrip()
        if line.startswith('### '): out.append(f"<h3>{html.escape(line[4:])}</h3>")
        elif line.startswith('## '): out.append(f"<h2>{html.escape(line[3:])}</h2>")
        elif line.startswith('# '): out.append(f"<h1>{html.escape(line[2:])}</h1>")
        elif line.startswith('- '): out.append(f"<li>{html.escape(line[2:])}</li>")
        elif line.strip()=="": out.append("")
        else:
            txt = html.escape(line)
            txt = re.sub(r'`([^`]+)`', r'<code>\1</code>', txt)
            out.append(f"<p>{txt}</p>")
    html_text='\n'.join(out)
    html_text=re.sub(r'(<li>.*?</li>\n?)+', lambda m: f"<ul>{m.group(0)}</ul>", html_text, flags=re.S)
    return html_text

def shell(title, body):
    nav=''.join([f'<a href="{href}">{label}</a>' for href,label in NAV])
    year=datetime.now().year
    return f"""<!doctype html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>{html.escape(title)}</title><style>{CSS}</style></head>
<body><header><div class='container' style='display:flex;justify-content:space-between;align-items:center'><a href='/' style='font-family:monospace'>yourname.dev</a><nav>{nav}</nav></div></header>
<main class='container'>{body}</main><footer><div class='container muted'>© {year} Your Name</div></footer></body></html>"""

def write(rel, title, body):
    p = OUT / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(shell(title, body), encoding='utf-8')

projects=[]
for fp in sorted((CONTENT/'projects').glob('*.md')):
    data, body = parse_frontmatter(fp.read_text())
    slug=fp.stem
    data['slug']=slug; data['content']=body
    projects.append(data)

posts=[]
for fp in sorted((CONTENT/'posts').glob('*.md')):
    data, body = parse_frontmatter(fp.read_text())
    slug=fp.stem
    data['slug']=slug; data['content']=body
    posts.append(data)

feat=''.join([f"<div class='card'><h3>{html.escape(p.get('title',''))}</h3><p class='muted'>{html.escape(p.get('summary',''))}</p><a href='/projects/{p['slug']}.html'>Read case study →</a></div>" for p in projects[:3]])
write('index.html','Portfolio',f"<p class='muted'>Full-stack engineer</p><h1 style='font-size:48px;margin:10px 0'>I build polished products for web teams.</h1><p class='muted'>Portfolio, case studies, and writing.</p><p><a class='btn primary' href='/projects.html'>View Projects</a> <a class='btn' href='/contact.html'>Contact Me</a></p><h2>Featured Projects</h2><div class='grid'>{feat}</div>")

plist=''.join([f"<div class='card'><h3>{html.escape(p.get('title',''))}</h3><p class='muted'>{html.escape(p.get('summary',''))}</p><p>{''.join([f'<span class=tag>#{html.escape(t)}</span>' for t in p.get('tags',[])])}</p><a href='/projects/{p['slug']}.html'>View details →</a></div>" for p in projects])
write('projects.html','Projects',f"<h1>Projects</h1>{plist}")
for p in projects:
    write(f"projects/{p['slug']}.html", p.get('title','Project'), f"<h1>{html.escape(p.get('title',''))}</h1><p class='muted'>{html.escape(p.get('summary',''))}</p><p><a href='{html.escape(p.get('demoUrl',''))}'>Live Demo</a> · <a href='{html.escape(p.get('repoUrl',''))}'>Source Code</a></p>{md_to_html(p.get('content',''))}")

blist=''.join([f"<div class='card'><p class='muted'>{html.escape(post.get('date',''))}</p><h3><a href='/blog/{post['slug']}.html'>{html.escape(post.get('title',''))}</a></h3><p class='muted'>{html.escape(post.get('excerpt',''))}</p></div>" for post in posts])
write('blog.html','Blog',f"<h1>Blog</h1>{blist}")
for post in posts:
    write(f"blog/{post['slug']}.html", post.get('title','Post'), f"<p class='muted'>{html.escape(post.get('date',''))}</p><h1>{html.escape(post.get('title',''))}</h1>{md_to_html(post.get('content',''))}")

write('about.html','About',"<h1>About</h1><p class='muted'>I design and build modern web applications focused on accessibility, performance, and business impact.</p><div class='card'><h2>Skills</h2><p class='muted'>Next.js, TypeScript, Node.js, design systems, testing, cloud deployment.</p></div>")
write('resume.html','Resume',"<h1>Resume</h1><div class='card'><h2>Senior Full-stack Engineer</h2><p class='muted'>Acme Corp — 2021 to Present</p><ul><li>Led migration from monolith to Next.js App Router.</li><li>Reduced LCP by 42%.</li><li>Built secure APIs with schema validation.</li></ul></div><a class='btn primary' href='/resume.pdf'>Download PDF</a>")
write('contact.html','Contact',"<h1>Contact</h1><div class='card'><p class='muted'>Form endpoint: <code>/api/contact</code> in Next.js app. This static preview does not submit.</p><form><p><input placeholder='Name' style='width:100%;padding:10px;background:#0a0a0f;border:1px solid rgba(255,255,255,.2);color:#e6eaf2'></p><p><input placeholder='Email' style='width:100%;padding:10px;background:#0a0a0f;border:1px solid rgba(255,255,255,.2);color:#e6eaf2'></p><p><textarea placeholder='Message' style='width:100%;min-height:120px;padding:10px;background:#0a0a0f;border:1px solid rgba(255,255,255,.2);color:#e6eaf2'></textarea></p><button class='btn primary' type='button'>Send Message</button></form></div>")
write('privacy.html','Privacy',"<h1>Privacy Notice</h1><p class='muted'>No tracking cookies by default. If analytics are enabled later, add consent.</p>")

print(f"Generated preview site in {OUT}")
