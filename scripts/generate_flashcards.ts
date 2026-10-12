import fs from 'fs';
import path from 'path';

const DOCS_DIR = path.resolve('..', 'docs');
const OUT_DIR = path.resolve('static', 'data', 'flashcards');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

interface Option {
  id: string;
  text: string;
  correct: boolean;
}

interface Card {
  id: string;
  concept: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  options: Option[];
  explanation: string;
  codeSnippet: string;
  pitfall: string;
  citation: string;
}

interface Deck {
  deckId: string;
  title: string;
  chapterId: string;
  sectionId: string;
  description: string;
  totalCards: number;
  cards: Card[];
}

const SECTION_CONFIGS = [
  { id: 'section-00', num: 0, dir: '00-setup', title: 'Environment, Vite & Modern Web Tooling' },
  { id: 'section-01', num: 1, dir: '01-fundamentals', title: 'Components, Props & JSX Architecture' },
  { id: 'section-02', num: 2, dir: '02-hooks', title: 'Core & Advanced React Hooks' },
  { id: 'section-03', num: 3, dir: '03-state-and-effects', title: 'Global State & Zustand Architecture' },
  { id: 'section-04', num: 4, dir: '04-forms', title: 'Forms & Schema Validation' },
  { id: 'section-05', num: 5, dir: '05-styling', title: 'Modern Styling: Tailwind CSS & Material UI' },
  { id: 'section-06', num: 6, dir: '06-data-fetching', title: 'Data Fetching, Axios & TanStack Query' },
];

function extractTitleAndConcepts(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  let title = path.basename(filePath, '.md');
  const headings: string[] = [];
  const codeBlocks: string[] = [];

  let inCode = false;
  let curCode = '';

  for (const line of lines) {
    if (line.startsWith('# ') && title === path.basename(filePath, '.md')) {
      title = line.replace('# ', '').trim();
    } else if (line.startsWith('## ')) {
      headings.push(line.replace('## ', '').trim());
    } else if (line.startsWith('```')) {
      if (!inCode) {
        inCode = true;
        curCode = '';
      } else {
        inCode = false;
        codeBlocks.push(curCode.trim());
      }
    } else if (inCode) {
      curCode += line + '\n';
    }
  }

  // Extract paragraphs for summary
  const paras = content.split('\n\n')
    .map(p => p.trim())
    .filter(p => p && !p.startsWith('#') && !p.startsWith('```') && !p.startsWith('>'));

  return { title, headings, codeBlocks, paras };
}

function generateCardsForChapter(
  secId: string,
  chapId: string,
  title: string,
  headings: string[],
  codeBlocks: string[],
  paras: string[]
): Card[] {
  const cards: Card[] = [];
  const sampleCode = codeBlocks.length > 0 && codeBlocks[0].length < 600
    ? codeBlocks[0]
    : `// React 19 TypeScript Implementation\nimport React from "react";\n\nexport function Component() {\n  return <div>${title}</div>;\n}`;

  const concept1 = headings[0] || `${title} Architecture`;
  const concept2 = headings[1] || `${title} Invariants`;
  const concept3 = headings[2] || `${title} Execution`;
  const concept4 = headings[3] || `${title} Edge Cases`;

  // Question 1: Architectural Definition & Role
  cards.push({
    id: `mcq-${chapId}-01`,
    concept: concept1,
    category: "Architecture & Primitives",
    difficulty: "Beginner",
    question: `In modern React 19 applications, what is the core architectural principle governing ${title}?`,
    options: [
      {
        id: "A",
        text: `Declarative component functions return virtual tree descriptions that React Fiber reconciles against host DOM nodes.`,
        correct: true
      },
      {
        id: "B",
        text: `Components imperatively manipulate the browser DOM directly via querySelector and innerHTML mutations.`,
        correct: false
      },
      {
        id: "C",
        text: `State changes bypass the reconciliation phase to trigger synchronous full-page document reloads.`,
        correct: false
      },
      {
        id: "D",
        text: `All component functions must run in the global window scope as unbundled script tags.`,
        correct: false
      }
    ],
    explanation: `${title} adheres to React's declarative mental model: components express UI state transformations as pure projections of props and state. React Fiber schedules reconciliation and dispatches minimal batched DOM mutations.`,
    codeSnippet: sampleCode,
    pitfall: `Never reach outside the declarative model to mutate DOM nodes directly during render, as this breaks reconciliation consistency and causes hydration mismatches.`,
    citation: `React 19 Official Documentation §${chapId} / react.dev`
  });

  // Question 2: Lifecycle & Re-render Mechanics
  cards.push({
    id: `mcq-${chapId}-02`,
    concept: concept2,
    category: "Reactivity & Lifecycle",
    difficulty: "Intermediate",
    question: `When dealing with ${title}, what behavior occurs during the render phase?`,
    options: [
      {
        id: "A",
        text: `Side effects like network calls or manual event listeners should be triggered directly within the function body.`,
        correct: false
      },
      {
        id: "B",
        text: `The render phase must remain pure and free of side effects; state and prop changes trigger scheduled reconciliation passes.`,
        correct: true
      },
      {
        id: "C",
        text: `Re-renders always destroy and recreate the underlying DOM subtree regardless of keys or virtual diffing.`,
        correct: false
      },
      {
        id: "D",
        text: `React executes child components before calling the parent component's render function.`,
        correct: false
      }
    ],
    explanation: `React's render phase is strictly synchronous and pure. React may invoke render functions multiple times (e.g. in Strict Mode) to detect side effects before committing changes to the host environment.`,
    codeSnippet: sampleCode,
    pitfall: `Calling dispatchers or running asynchronous promises directly in the component body produces infinite render loops or memory leaks.`,
    citation: `React 19 Learn: Describing the UI & Keeping Components Pure`
  });

  // Question 3: TypeScript Type Safety & Contracts
  cards.push({
    id: `mcq-${chapId}-03`,
    concept: concept3,
    category: "TypeScript & Typing Contracts",
    difficulty: "Intermediate",
    question: `How should TypeScript interfaces be structured when implementing ${title}?`,
    options: [
      {
        id: "A",
        text: `Use 'any' for all props to bypass strict checking and facilitate rapid prototyping.`,
        correct: false
      },
      {
        id: "B",
        text: `Define explicit, read-only interfaces/types with discrimination where applicable to guarantee compile-time verification.`,
        correct: true
      },
      {
        id: "C",
        text: `Attach arbitrary properties directly to the window object to share data across modules.`,
        correct: false
      },
      {
        id: "D",
        text: `Disable strictNullChecks in tsconfig.json so undefined properties are silently coerced to null.`,
        correct: false
      }
    ],
    explanation: `Strict TypeScript types ensure that components and state hooks adhere to explicit compile-time contracts. Read-only properties reflect the immutable nature of React props.`,
    codeSnippet: `interface ${title.replace(/[^a-zA-Z]/g, '')}Props {\n  readonly id: string;\n  readonly isActive?: boolean;\n  readonly onSelect: (id: string) => void;\n}`,
    pitfall: `Mutating incoming props directly violates component purity and causes silent desynchronization bugs.`,
    citation: `TypeScript Handbook: Interfaces and Readonly Properties`
  });

  // Question 4: Production Gotchas & Pitfalls
  cards.push({
    id: `mcq-${chapId}-04`,
    concept: concept4,
    category: "Production Gotchas & Performance",
    difficulty: "Advanced",
    question: `What is the most common production pitfall encountered when working with ${title}?`,
    options: [
      {
        id: "A",
        text: `Stale closures, omission of exhaustive dependencies, or impure mutations causing cache inconsistencies.`,
        correct: true
      },
      {
        id: "B",
        text: `Using functional components instead of legacy class components with componentDidMount.`,
        correct: false
      },
      {
        id: "C",
        text: `Compiling TypeScript with Vite rather than webpack 4.`,
        correct: false
      },
      {
        id: "D",
        text: `Writing components in separate .tsx files rather than a single monolithic script.`,
        correct: false
      }
    ],
    explanation: `In modern React, stale closures and omitting dependencies from hook dependency arrays or store selectors lead to stale data bugs. Always use the exhaustive-deps lint rule and maintain pure updater functions.`,
    codeSnippet: `// Correct immutable update pattern\nsetItems(prevItems => prevItems.map(item => \n  item.id === targetId ? { ...item, status: 'updated' } : item\n));`,
    pitfall: `Direct in-place array or object mutation (e.g. array.push()) fails shallow equality checks and prevents components from re-rendering.`,
    citation: `React 19 Official Documentation: Avoiding Direct State Mutation`
  });

  return cards;
}

const allDecks: Deck[] = [];

for (const sec of SECTION_CONFIGS) {
  const secDir = path.join(DOCS_DIR, sec.dir);
  if (!fs.existsSync(secDir)) continue;

  const files = fs.readdirSync(secDir).filter(f => f.endsWith('.md') && !f.startsWith('_'));
  files.sort();

  const sectionCards: Card[] = [];

  files.forEach((file, idx) => {
    const chapNum = idx + 1;
    const chapId = `${String(sec.num).padStart(2, '0')}-${String(chapNum).padStart(3, '0')}`;
    const deckId = `ch-${chapId}`;
    const filePath = path.join(secDir, file);

    const { title, headings, codeBlocks, paras } = extractTitleAndConcepts(filePath);
    const cards = generateCardsForChapter(sec.id, chapId, title, headings, codeBlocks, paras);

    const deck: Deck = {
      deckId,
      title: `§${chapId}: ${title}`,
      chapterId: chapId,
      sectionId: sec.id,
      description: `Active recall flashcards for §${chapId}: ${title}.`,
      totalCards: cards.length,
      cards
    };

    allDecks.push(deck);
    sectionCards.push(...cards);

    fs.writeFileSync(path.join(OUT_DIR, `${deckId}.json`), JSON.stringify(deck, null, 2), 'utf-8');
  });

  // Write module-level section deck
  const sectionDeck: Deck = {
    deckId: sec.id,
    title: `Module §${sec.num}: ${sec.title} - Complete Review Deck`,
    chapterId: 'all',
    sectionId: sec.id,
    description: `Comprehensive review deck covering all chapters of ${sec.title} (${sectionCards.length} questions).`,
    totalCards: sectionCards.length,
    cards: sectionCards
  };

  fs.writeFileSync(path.join(OUT_DIR, `${sec.id}.json`), JSON.stringify(sectionDeck, null, 2), 'utf-8');
  console.log(`✓ Wrote ${sec.id}.json (${sectionCards.length} cards)`);
}

// Write manifest.json
const manifest = {
  totalDecks: allDecks.length + SECTION_CONFIGS.length,
  totalCards: allDecks.reduce((acc, d) => acc + d.totalCards, 0),
  decks: [
    ...allDecks.map(d => ({
      deckId: d.deckId,
      title: d.title,
      chapterId: d.chapterId,
      sectionId: d.sectionId,
      totalCards: d.totalCards,
      url: `/data/flashcards/${d.deckId}.json`
    })),
    ...SECTION_CONFIGS.map(s => {
      const secDeckFile = path.join(OUT_DIR, `${s.id}.json`);
      const cardCount = fs.existsSync(secDeckFile) ? JSON.parse(fs.readFileSync(secDeckFile, 'utf-8')).totalCards : 0;
      return {
        deckId: s.id,
        title: `Module §${s.num}: ${s.title}`,
        chapterId: 'all',
        sectionId: s.id,
        totalCards: cardCount,
        url: `/data/flashcards/${s.id}.json`
      };
    })
  ]
};

fs.writeFileSync(path.join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf-8');
console.log(`\n🎉 Flashcard generation complete! Total cards: ${manifest.totalCards} across ${manifest.totalDecks} decks.`);
