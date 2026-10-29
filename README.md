# PGATS — Automation Exercise com Playwright + TypeScript

Execução de testes com Playwright de **10 cenários executáveis** do site Automation Exercise: TC01, TC02, TC03, TC04, TC05, TC08, TC09, TC10, TC15 e TC16.

## Pré-requisitos
Node.js 24 e npm.

## Instalação
```bash
npm install
npx playwright install chromium
```

## Execução
```bash
npm test
npm run test:ui
npm run test:headed
npm run test:report
npx playwright test tests/auth/login.spec.ts --project=chromium
```

## Estrutura
- `tests/`: testes por funcionalidade, com casos de teste identificados.
- `pages/`: Page Object Model.
- `components/`: componentes reutilizáveis (header, modal e newsletter).
- `factories/`: criação de usuários com e-mails únicos.
- `data/`: fixtures JSON preservadas do projeto original.
- `fixtures/`: fixtures Playwright que injetam os Page Objects.
- `helpers/`: limpeza de contas criadas durante os testes.
- `.github/workflows/playwright.yml`: pipeline no GitHub Actions.

## Relatórios
HTML, JUnit, screenshots, vídeos e traces em caso de falha. Relatórios disponíveis como artefato da pipeline.
