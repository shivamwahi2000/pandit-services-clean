# Dynamic AI Translation Implementation Plan

## Architecture Overview

```
User visits page → Detect language preference → Extract text → Check cache →
  ↓ (if cached)                                                   ↓ (if not cached)
  Serve from cache                                                Translate via AI → Cache → Serve
```

## Implementation Strategy

### Phase 1: Core Translation System (8-10 hours)

#### 1.1 Translation Context Provider
```typescript
// src/contexts/TranslationContext.tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (text: string) => Promise<string>;
}

export const TranslationContext = createContext<TranslationContextType | null>(null);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [cache, setCache] = useState<Map<string, string>>(new Map());

  const translate = async (text: string): Promise<string> => {
    if (language === 'en') return text;

    // Check cache first
    const cacheKey = `en_hi_${text}`;
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)!;
    }

    // Translate via API
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, from: 'en', to: 'hi' })
      });

      const { translation } = await response.json();

      // Cache it
      setCache(prev => new Map(prev).set(cacheKey, translation));

      return translation;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Fallback to original
    }
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </TranslationContext.Provider>
  );
}

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) throw new Error('useTranslation must be used within TranslationProvider');
  return context;
};
```

#### 1.2 Translation API Route
```typescript
// src/app/api/translate/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Option A: Using Google Translate API (cheaper)
async function translateWithGoogle(text: string, from: string, to: string) {
  const response = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: text, source: from, target: to })
    }
  );
  const data = await response.json();
  return data.data.translations[0].translatedText;
}

// Option B: Using Claude API (better quality for religious/cultural content)
async function translateWithClaude(text: string, from: string, to: string) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307', // Fast and cheap
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `Translate this text from ${from} to ${to}.

Context: This is for a Hindu religious and astrology services website.
Maintain formal, respectful tone. Keep religious terms accurate.
Preserve HTML tags if any.

Text to translate:
${text}`
      }]
    })
  });

  const data = await response.json();
  return data.content[0].text;
}

export async function POST(request: NextRequest) {
  try {
    const { text, from, to } = await request.json();

    // Use Claude for better quality (or switch to Google for cost)
    const translation = await translateWithClaude(text, from, to);

    return NextResponse.json({ translation });
  } catch (error) {
    console.error('Translation API error:', error);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
```

#### 1.3 Smart Translation Hooks
```typescript
// src/hooks/useAutoTranslate.ts
'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';

export function useAutoTranslate(text: string) {
  const { language, translate } = useTranslation();
  const [translatedText, setTranslatedText] = useState(text);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (language === 'en') {
      setTranslatedText(text);
      return;
    }

    setLoading(true);
    translate(text)
      .then(setTranslatedText)
      .finally(() => setLoading(false));
  }, [text, language, translate]);

  return { text: translatedText, loading };
}

// Batch translation for better performance
export function useBatchTranslate(texts: string[]) {
  const { language, translate } = useTranslation();
  const [translations, setTranslations] = useState<string[]>(texts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (language === 'en') {
      setTranslations(texts);
      return;
    }

    setLoading(true);
    Promise.all(texts.map(translate))
      .then(setTranslations)
      .finally(() => setLoading(false));
  }, [texts, language, translate]);

  return { translations, loading };
}
```

#### 1.4 Translation Components
```typescript
// src/components/T.tsx (Simple translator)
'use client';

import { useAutoTranslate } from '@/hooks/useAutoTranslate';

interface TProps {
  children: string;
  className?: string;
}

export function T({ children, className }: TProps) {
  const { text, loading } = useAutoTranslate(children);

  return (
    <span className={className}>
      {loading ? <span className="opacity-50">{children}</span> : text}
    </span>
  );
}

// Usage:
// <T>Welcome to Kesari Nakshatra</T>
// Automatically becomes: केसरी नक्षत्र में आपका स्वागत है
```

### Phase 2: Enhanced Caching (4-5 hours)

#### 2.1 IndexedDB Cache
```typescript
// src/lib/translationCache.ts
import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface TranslationDB extends DBSchema {
  translations: {
    key: string;
    value: {
      text: string;
      translation: string;
      timestamp: number;
    };
  };
}

class TranslationCache {
  private db: IDBPDatabase<TranslationDB> | null = null;

  async init() {
    this.db = await openDB<TranslationDB>('translations', 1, {
      upgrade(db) {
        db.createObjectStore('translations');
      },
    });
  }

  async get(key: string): Promise<string | null> {
    if (!this.db) await this.init();
    const entry = await this.db!.get('translations', key);

    // Cache valid for 30 days
    if (entry && Date.now() - entry.timestamp < 30 * 24 * 60 * 60 * 1000) {
      return entry.translation;
    }

    return null;
  }

  async set(key: string, text: string, translation: string) {
    if (!this.db) await this.init();
    await this.db!.put('translations', {
      text,
      translation,
      timestamp: Date.now()
    }, key);
  }
}

export const translationCache = new TranslationCache();
```

### Phase 3: Pre-Translation Build Script (3-4 hours)

```typescript
// scripts/pre-translate.ts
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Extract all text from components
async function extractTexts() {
  const files = await glob('src/**/*.{tsx,ts}');
  const texts = new Set<string>();

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');

    // Extract text from JSX
    const textMatches = content.match(/>[^<>]+</g);
    if (textMatches) {
      textMatches.forEach(match => {
        const text = match.slice(1, -1).trim();
        if (text && text.length > 2 && !text.match(/^[0-9\s]+$/)) {
          texts.add(text);
        }
      });
    }
  }

  return Array.from(texts);
}

// Batch translate and save
async function preTranslate() {
  const texts = await extractTexts();
  const translations: Record<string, string> = {};

  console.log(`Found ${texts.length} unique texts to translate...`);

  // Translate in batches
  for (let i = 0; i < texts.length; i += 50) {
    const batch = texts.slice(i, i + 50);

    for (const text of batch) {
      const response = await fetch('http://localhost:3000/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, from: 'en', to: 'hi' })
      });

      const { translation } = await response.json();
      translations[text] = translation;

      console.log(`Translated ${i + batch.indexOf(text) + 1}/${texts.length}`);
    }
  }

  // Save to JSON
  fs.writeFileSync(
    'src/i18n/translations.json',
    JSON.stringify(translations, null, 2)
  );

  console.log('✅ Pre-translation complete!');
}

preTranslate();
```

### Phase 4: Usage in Components (2-3 hours)

```typescript
// Before (manual):
<h1 className="text-4xl">
  {language === 'en' ? 'About Us' : 'हमारे बारे में'}
</h1>

// After (automatic):
<h1 className="text-4xl">
  <T>About Us</T>
</h1>

// Or even simpler - entire sections:
<TranslateSection>
  <h1>About Kesari Nakshatra</h1>
  <p>We provide authentic Vedic services...</p>
  <button>Book Now</button>
</TranslateSection>
```

## Cost Analysis

### Google Translate API
- **Cost:** $20 per 1M characters
- **Your site:** ~200,000 characters across all pages
- **One-time cost:** ~$4
- **Monthly (with new visitors):** ~$10-15

### Claude API (Better Quality)
- **Cost:** $0.25 per 1M input tokens (Haiku)
- **Your site:** ~50,000 tokens
- **One-time cost:** ~$0.01
- **Monthly:** ~$5-10

### Recommendation: Hybrid
- Use Claude API for religious/technical terms (high quality)
- Cache aggressively (30-day expiry)
- Pre-translate during build for static content
- **Total monthly cost:** ~$5-10

## Performance Optimization

1. **Server-Side Rendering:** Translate on server for first load
2. **Aggressive Caching:** 30-day client-side cache
3. **Batch Requests:** Translate multiple texts in one API call
4. **Pre-translation:** Build-time translation for static content
5. **Progressive Enhancement:** Show English while loading Hindi

## Implementation Timeline

| Phase | Task | Hours |
|-------|------|-------|
| 1 | Translation context & API | 8-10h |
| 2 | Caching system | 4-5h |
| 3 | Pre-translation script | 3-4h |
| 4 | Update components | 2-3h |
| 5 | Testing & refinement | 4-5h |
| **Total** | **Full Dynamic System** | **22-27h** |

## Quality Assurance

### Manual Override System
```typescript
// For critical religious terms
const overrides = {
  'Puja': 'पूजा', // Don't translate
  'Kundli': 'कुंडली',
  'Vastu': 'वास्तु',
  // etc.
};
```

### Review Dashboard
- Admin panel to review/edit translations
- Flag poor translations
- Approve before showing to users

## Benefits Over Manual Translation

1. ✅ **95% less effort** (22h vs 100h)
2. ✅ **Instant updates** for new content
3. ✅ **Consistent quality** (AI maintains tone)
4. ✅ **Scalable** to more languages
5. ✅ **Cost-effective** (~$5-10/month)
6. ✅ **SEO-friendly** (can generate separate URLs)

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Poor translation quality | Use Claude API + manual overrides |
| API downtime | Aggressive caching + fallback to English |
| Cost overrun | Pre-translate + 30-day cache |
| Religious term errors | Manual override dictionary |

## Next Steps

1. Set up translation API (Google or Claude)
2. Build core translation system
3. Pre-translate existing content
4. Roll out page by page
5. Monitor quality and costs

**Estimated Total: 22-27 hours for complete dynamic system**
