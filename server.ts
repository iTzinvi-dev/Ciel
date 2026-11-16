import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const isProduction = process.env.NODE_ENV === 'production';

interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
}

interface ConsultationRequest {
  referenceId: string;
  fullName: string;
  email: string;
  company: string;
  serviceFocus: string;
  timeline: string;
  brief: string;
  submittedAt: string;
}

const subscribers = new Map<string, NewsletterSubscriber>();
const consultations: ConsultationRequest[] = [];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'vespera-core' });
  });

  app.post('/api/newsletter', (req: Request, res: Response) => {
    const rawEmail = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';

    if (!rawEmail || !EMAIL_REGEX.test(rawEmail)) {
      res.status(400).json({
        ok: false,
        error: 'Please enter a valid corporate or personal email address.',
      });
      return;
    }

    if (subscribers.has(rawEmail)) {
      res.status(200).json({
        ok: true,
        alreadySubscribed: true,
        message: 'This address is already subscribed to Tech Insights.',
      });
      return;
    }

    subscribers.set(rawEmail, {
      email: rawEmail,
      subscribedAt: new Date().toISOString(),
    });

    res.status(201).json({
      ok: true,
      alreadySubscribed: false,
      message: 'Subscribed to Tech Insights. Expect our next architectural brief from London.',
    });
  });

  app.post('/api/consultations', (req: Request, res: Response) => {
    const fullName = typeof req.body?.fullName === 'string' ? req.body.fullName.trim() : '';
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const company = typeof req.body?.company === 'string' ? req.body.company.trim() : '';
    const serviceFocus =
      typeof req.body?.serviceFocus === 'string' ? req.body.serviceFocus.trim() : '';
    const timeline = typeof req.body?.timeline === 'string' ? req.body.timeline.trim() : '';
    const brief = typeof req.body?.brief === 'string' ? req.body.brief.trim() : '';

    if (fullName.length < 2) {
      res.status(400).json({ ok: false, error: 'Please provide your full name.' });
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      res.status(400).json({ ok: false, error: 'Please enter a valid work email address.' });
      return;
    }
    if (company.length < 2) {
      res.status(400).json({ ok: false, error: 'Please provide your company or organization.' });
      return;
    }
    if (!serviceFocus) {
      res.status(400).json({ ok: false, error: 'Please select an architectural focus.' });
      return;
    }
    if (brief.length < 15) {
      res.status(400).json({
        ok: false,
        error: 'Please include at least 15 characters describing your system objectives.',
      });
      return;
    }

    const code = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `VC-2026-${code}`;

    consultations.push({
      referenceId,
      fullName,
      email,
      company,
      serviceFocus,
      timeline: timeline || 'Q2 2026',
      brief,
      submittedAt: new Date().toISOString(),
    });

    res.status(201).json({
      ok: true,
      referenceId,
      message: `Consultation brief ${referenceId} logged. A London principal architect will respond within one business day.`,
    });
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      const indexFile = path.join(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build artifacts not found.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Vespera Core server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start Vespera Core server:', err);
  process.exit(1);
});
