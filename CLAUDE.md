# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

tiny-code-agentは、コーディングエージェントの実験的なCLIツールプロジェクトです。Node.js 20+とTypeScriptで構築されており、`tiny-code`コマンドとして実行可能です。

## 開発コマンド

### 基本的な開発フロー
```bash
# 開発時の実行（TypeScript直接実行）
pnpm dev

# プロダクションビルド
pnpm build

# ビルド済みアプリの実行
pnpm start

# テスト実行
pnpm test

# コードフォーマット
pnpm format

# リンターチェック
pnpm lint

# リンター自動修正
pnpm lint:fix
```

### グローバルインストール後の実行
```bash
# パッケージのグローバルインストール
pnpm link --global

# CLIツールとして実行
tiny-code greet "名前"
tiny-code greet "名前" --loud
```

## アーキテクチャとビルド設定

### ビルドシステム
- **ビルドツール**: tsup（TypeScriptバンドラー）
- **出力形式**: ESMとCJS両方に対応（CLIツールとしての互換性確保）
- **エントリーポイント**: `src/index.ts` → `dist/index.cjs`（CLIバイナリ）
- **シバン自動追加**: ビルド時に`#!/usr/bin/env node`が追加される

### TypeScript設定
- **ターゲット**: ES2022
- **モジュールシステム**: NodeNext（Node.js向けの最新モジュール解決）
- **厳格モード**: すべての厳格オプションが有効
- **パス解決**: `@/*` → `src/*`のエイリアス設定

### 依存関係管理
- **パッケージマネージャー**: pnpm（v10.11.1）
- **主要な依存関係**: 
  - Commander.js: CLIインターフェース構築
  - Biome: コードフォーマッターとリンター
  - Vitest: テストフレームワーク

## 開発時の注意事項

1. **コマンド追加時**: `src/index.ts`のCommanderインスタンスに新しいコマンドを追加
2. **型定義**: TypeScriptの厳格モードが有効なので、すべての型を明示的に定義
3. **モジュール**: ESMモジュールとして記述（`import`/`export`を使用）
4. **ビルド前の確認**: `pnpm lint`と`pnpm test`を実行してコード品質を確保