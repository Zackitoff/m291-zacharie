(function () {
  const Q = window.QUESTIONS;
  const total = Q.length;

  const views = {
    intro: document.getElementById("vue-intro"),
    quiz: document.getElementById("vue-quiz"),
    fin: document.getElementById("vue-fin"),
  };

  const els = {
    theme: document.getElementById("theme"),
    compteur: document.getElementById("compteur"),
    barre: document.getElementById("barre"),
    question: document.getElementById("question"),
    lab: document.getElementById("lab-slot"),
    choix: document.getElementById("choix"),
    valider: document.getElementById("valider"),
    suivante: document.getElementById("suivante"),
    explique: document.getElementById("explique"),
    score: document.getElementById("score"),
    phrase: document.getElementById("phrase-score"),
    revue: document.getElementById("revue"),
    confetti: document.getElementById("confetti"),
  };

  let i = 0;
  let picked = null;
  let locked = false;
  const answers = [];
  let labRoots = null;

  function show(name) {
    Object.keys(views).forEach(function (key) {
      views[key].classList.toggle("hidden", key !== name);
    });
  }

  function miniDoc(roots) {
    return {
      getElementById: function (id) {
        if (id === "lab-out" || id === "out" || id === "affiche") {
          return roots.out;
        }
        if (id === "lab-btn" || id === "plus" || id === "frites" || id === "promo") {
          return roots.btn;
        }
        if (id === "lab-in" || id === "code") {
          return roots.input;
        }
        if (id === "liste") {
          return roots.liste;
        }
        return null;
      },
      querySelector: function (sel) {
        if (sel === "h1") {
          return roots.out;
        }
        return this.getElementById(sel.replace("#", ""));
      }
    };
  }

  function miniConsole(roots) {
    const logs = [];
    return {
      log: function () {
        logs.push(Array.prototype.slice.call(arguments).map(String).join(" "));
        if (roots.log) {
          roots.log.textContent = logs.join("  ·  ");
        }
      },
      _logs: logs
    };
  }

  function runSource(source, roots) {
    const c = miniConsole(roots);
    try {
      const fn = new Function("document", "console", source);
      fn(miniDoc(roots), c);
    } catch (err) {
      if (roots.log) {
        roots.log.textContent = "Erreur : " + err.message;
      }
    }
  }

  function simpleMarkdown(src) {
    return src
      .split("\n")
      .map(function (line) {
        if (line.indexOf("# ") === 0) {
          return "<h1>" + line.slice(2) + "</h1>";
        }
        if (line.indexOf("## ") === 0) {
          return "<h2>" + line.slice(3) + "</h2>";
        }
        if (line.indexOf("- ") === 0) {
          return "<ul><li>" + line.slice(2).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") + "</li></ul>";
        }
        return "<p>" + line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") + "</p>";
      })
      .join("");
  }

  function labSlot() {
    return document.getElementById("lab-slot");
  }

  function mountLab(lab) {
    const slot = labSlot();
    if (!slot) {
      return;
    }
    slot.innerHTML = "";
    labRoots = null;
    if (!lab) {
      return;
    }
    try {
      mountLabInner(lab, slot);
    } catch (err) {
      slot.textContent = "Établi indisponible : " + err.message;
    }
  }

  function mountLabInner(lab, slot) {
    const wrap = document.createElement("div");
    wrap.className = "lab";
    wrap.innerHTML =
      "<div class=\"lab-head\"><span>Établi — bout de code</span><span>écran + console</span></div>" +
      "<pre></pre>" +
      "<div class=\"lab-widgets\"></div>" +
      "<button type=\"button\" class=\"lancer\">Lancer le bout de code</button>" +
      "<div class=\"lab-screen\">Écran : <span class=\"out-val\">…</span></div>" +
      "<div class=\"lab-console\">Console : <span class=\"log-val\">(vide)</span></div>";
    wrap.querySelector("pre").textContent = lab.source || "";
    const widgets = wrap.querySelector(".lab-widgets");
    const roots = {
      out: wrap.querySelector(".out-val"),
      log: wrap.querySelector(".log-val"),
      btn: null,
      input: null,
      liste: null
    };

    if (lab.kind === "md") {
      const screen = wrap.querySelector(".lab-screen");
      screen.classList.add("md-preview");
      screen.innerHTML = "<em class=\"muted\">Cliquez Lancer pour voir le rendu.</em>";
      wrap.querySelector(".lab-console").classList.add("hidden");
      wrap.querySelector(".lancer").addEventListener("click", function () {
        screen.innerHTML = simpleMarkdown(lab.source);
      });
      slot.appendChild(wrap);
      labRoots = { wrap: wrap, lab: lab };
      return;
    }

    if (lab.kind === "dnd") {
      wrap.querySelector("pre").textContent = lab.source;
      const ol = document.createElement("ol");
      ol.className = "lab-list";
      ol.id = "liste";
      ["21:40 Echo du Jura", "18:00 Fanfare de Nyon"].forEach(function (nom, idx) {
        const li = document.createElement("li");
        li.id = "item-" + idx;
        li.draggable = true;
        li.textContent = nom;
        ol.appendChild(li);
      });
      widgets.appendChild(ol);
      roots.liste = ol;
      wrap.querySelector(".lancer").textContent = "Réinitialiser la liste";
      wrap.querySelector(".lancer").addEventListener("click", function () {
        roots.log.textContent = "glissez une ligne sur l’autre — si drop ne part pas, la console reste muette";
      });
      ol.addEventListener("dragstart", function (e) {
        const li = e.target.closest("li");
        if (!li) {
          return;
        }
        e.dataTransfer.setData("text/id", li.id);
        roots.log.textContent = "prise : " + li.id;
      });
      ol.addEventListener("drop", function (e) {
        const id = e.dataTransfer.getData("text/plain");
        roots.log.textContent = "dépôt, id reçu : " + JSON.stringify(id);
      });
      roots.out.textContent = "l’ordre ne bouge pas (volontaire)";
      slot.appendChild(wrap);
      labRoots = { wrap: wrap, lab: lab, roots: roots };
      return;
    }

    if (lab.widgets && lab.widgets.indexOf("input") !== -1) {
      const input = document.createElement("input");
      input.id = "lab-in";
      input.setAttribute("aria-label", "Champ du bout de code");
      input.placeholder = lab.placeholder || "";
      widgets.appendChild(input);
      roots.input = input;
    }
    if (lab.widgets && lab.widgets.indexOf("btn") !== -1) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.id = "lab-btn";
      btn.textContent = lab.btnLabel || "Cliquer";
      widgets.appendChild(btn);
      roots.btn = btn;
    }
    if (!lab.widgets || lab.widgets.indexOf("btn") === -1) {
      wrap.querySelector(".lancer").addEventListener("click", function () {
        roots.out.textContent = "…";
        roots.log.textContent = "(vide)";
        runSource(lab.source, roots);
      });
    } else {
      wrap.querySelector(".lancer").textContent = "Réinitialiser";
      wrap.querySelector(".lancer").addEventListener("click", function () {
        mountLab(lab);
      });
      runSource(lab.source, roots);
    }

    slot.appendChild(wrap);
    labRoots = { wrap: wrap, lab: lab, roots: roots };
  }

  function officialResult(lab) {
    if (!lab || !lab.resultat) {
      return "";
    }
    const bits = [];
    if (lab.resultat.ecran) {
      bits.push("Écran → " + lab.resultat.ecran);
    }
    if (lab.resultat.console) {
      bits.push("Console → " + lab.resultat.console);
    }
    return bits.join("\n");
  }

  function burst(ok) {
    els.confetti.innerHTML = "";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const colors = ok ? ["#fb923c", "#fbbf24", "#4ade80", "#38bdf8"] : ["#fb7185", "#64748b"];
    for (let n = 0; n < 14; n += 1) {
      const bit = document.createElement("span");
      bit.className = "confetti-bit";
      bit.style.background = colors[n % colors.length];
      bit.style.setProperty("--dx", (Math.random() * 240 - 120) + "px");
      bit.style.setProperty("--dy", (Math.random() * 180 - 40) + "px");
      bit.style.left = 40 + Math.random() * 20 + "%";
      els.confetti.appendChild(bit);
    }
    window.setTimeout(function () {
      els.confetti.innerHTML = "";
    }, 1000);
  }

  function renderQuestion() {
    const q = Q[i];
    picked = null;
    locked = false;
    els.theme.textContent = q.theme;
    els.compteur.textContent = "Tour " + (i + 1) + " / " + total;
    els.barre.style.width = Math.round((i / total) * 100) + "%";
    els.question.textContent = q.question;
    els.explique.classList.add("hidden");
    els.explique.innerHTML = "";
    els.suivante.classList.add("hidden");
    els.valider.disabled = true;
    els.valider.classList.remove("hidden");
    mountLab(q.lab);

    els.choix.innerHTML = "";
    q.choices.forEach(function (c) {
      const lab = document.createElement("label");
      lab.className = "choice";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "q";
      input.value = c.id;
      const span = document.createElement("span");
      span.textContent = c.text;
      lab.appendChild(input);
      lab.appendChild(span);
      lab.addEventListener("click", function () {
        if (locked) {
          return;
        }
        picked = c.id;
        Array.prototype.forEach.call(els.choix.children, function (el) {
          el.classList.toggle("picked", el.querySelector("input").value === picked);
        });
        els.valider.disabled = false;
      });
      els.choix.appendChild(lab);
    });
  }

  function validate() {
    if (locked || !picked) {
      return;
    }
    locked = true;
    const q = Q[i];
    const ok = picked === q.correct;
    answers.push({ index: i, picked: picked, ok: ok });
    burst(ok);

    Array.prototype.forEach.call(els.choix.children, function (el) {
      const val = el.querySelector("input").value;
      el.classList.add("locked");
      el.querySelector("input").disabled = true;
      if (val === q.correct) {
        el.classList.add("good");
      } else if (val === picked) {
        el.classList.add("bad");
      }
    });

    const badge = document.createElement("div");
    badge.className = "badge " + (ok ? "ok" : "ko");
    badge.textContent = ok ? "La machine applaudit." : "La vitrine dit non. La bonne case est en vert.";
    els.explique.appendChild(badge);

    if (q.lab && q.lab.resultat) {
      const res = document.createElement("div");
      res.className = "resultat";
      res.textContent = officialResult(q.lab);
      els.explique.appendChild(res);
    }

    q.explanation.forEach(function (p) {
      const para = document.createElement("p");
      para.textContent = p;
      els.explique.appendChild(para);
    });
    els.explique.classList.remove("hidden");
    els.valider.classList.add("hidden");
    els.suivante.classList.remove("hidden");
    els.suivante.textContent = i === total - 1 ? "Voir le bilan" : "Tour suivant";
  }

  function next() {
    if (i < total - 1) {
      i += 1;
      renderQuestion();
    } else {
      renderFin();
    }
  }

  function renderFin() {
    const bonnes = answers.filter(function (a) {
      return a.ok;
    }).length;
    els.barre.style.width = "100%";
    els.score.textContent = bonnes + " / " + total;
    let phrase;
    if (bonnes === total) {
      phrase = "Atelier nickel. Gardez le réflexe : lire avant d’accepter, F12 avant le prompt.";
    } else if (bonnes >= 24) {
      phrase = "Solide. Relisez surtout les tours en rose : c’est là que l’oral coincera.";
    } else if (bonnes >= 18) {
      phrase = "Le fil est là. Rouvrez le support de la semaine où ça accroche, relancez les bouts de code, puis recommencez.";
    } else {
      phrase = "Ce n’est pas noté. Reprenez s01 (repo, commit, Pages), s02 (quota, prompt), s03 (boîte / écran / F12), puis relancez l’atelier.";
    }
    els.phrase.textContent = phrase;

    els.revue.innerHTML = "";
    answers.forEach(function (a) {
      const q = Q[a.index];
      const art = document.createElement("article");
      const choix = {};
      q.choices.forEach(function (c) {
        choix[c.id] = c.text;
      });
      art.innerHTML =
        "<p class=\"theme\">" +
        q.theme +
        " · tour " +
        (a.index + 1) +
        "/" +
        total +
        "</p>" +
        "<p class=\"q\">" +
        q.question +
        "</p>" +
        "<p class=\"muted\">Votre réponse : " +
        choix[a.picked] +
        "</p>" +
        "<p><strong>Bonne réponse :</strong> " +
        choix[q.correct] +
        "</p>";
      if (q.lab && q.lab.resultat) {
        const res = document.createElement("div");
        res.className = "resultat";
        res.textContent = officialResult(q.lab);
        art.appendChild(res);
      }
      q.explanation.forEach(function (p) {
        const para = document.createElement("p");
        para.textContent = p;
        art.appendChild(para);
      });
      if (!a.ok) {
        art.style.background = "rgba(251, 113, 133, 0.08)";
        art.style.padding = "0.85rem 0.7rem 0.5rem";
      }
      els.revue.appendChild(art);
    });
    show("fin");
  }

  function start() {
    i = 0;
    answers.length = 0;
    show("quiz");
    renderQuestion();
  }

  document.getElementById("commencer").addEventListener("click", start);
  document.getElementById("recommencer").addEventListener("click", start);
  els.valider.addEventListener("click", validate);
  els.suivante.addEventListener("click", next);

  document.addEventListener("keydown", function (e) {
    if (views.quiz.classList.contains("hidden")) {
      return;
    }
    if (e.key === "Enter") {
      if (!locked && picked) {
        validate();
      } else if (locked) {
        next();
      }
    }
  });
})();
